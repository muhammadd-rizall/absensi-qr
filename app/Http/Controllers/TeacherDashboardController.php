<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Classes;
use App\Models\ClassStudents;
use App\Models\Students;
use App\Models\Teachings;
use App\Http\Resources\TeachingResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $teacher = $user->teacher;

        // If Super Admin, show everything or specific stats
        if ($user->hasRole('super-admin')) {
            $teachings = Teachings::with(['schoolClass', 'subject', 'teacher.user'])->get();
            return Inertia::render('Teacher/Dashboard', [
                'teachings' => TeachingResource::collection($teachings),
            ]);
        }

        if (!$teacher) {
            return Inertia::render('Dashboard', [
                'stats' => ['error' => 'Anda tidak terdaftar sebagai Guru.']
            ]);
        }

        // Get teachings/classes for this teacher
        $teachings = Teachings::where('teacher_id', $teacher->id)
            ->with(['schoolClass', 'subject'])
            ->get();

        return Inertia::render('Teacher/Dashboard', [
            'teachings' => TeachingResource::collection($teachings),
        ]);
    }

    public function showClass(string $classId)
    {
        $class = Classes::with(['academicYear', 'homeroomTeacher.user'])->findOrFail($classId);
        
        $students = ClassStudents::where('class_id', $classId)
            ->with('student')
            ->get()
            ->pluck('student');

        return Inertia::render('Teacher/ClassDetail', [
            'class' => $class,
            'students' => $students,
        ]);
    }

    public function teachingDetail(string $teachingId)
    {
        $teaching = Teachings::with(['schoolClass', 'subject'])->findOrFail($teachingId);
        $classId = $teaching->class_id;
        $today = now()->toDateString();
        
        // Get all students in this class
        $studentsInClass = ClassStudents::where('class_id', $classId)
            ->with('student')
            ->get()
            ->pluck('student');
            
        // Get current attendances for today
        $attendances = Attendance::where('teaching_id', $teachingId)
            ->whereDate('attendance_date', $today)
            ->get()
            ->keyBy('student_id');
            
        // Logic for auto-marking Alpha if lesson has ended
        $now = now();
        $endTime = \Carbon\Carbon::createFromTimeString($teaching->end_time);
        
        if ($now->greaterThan($endTime)) {
            foreach ($studentsInClass as $student) {
                if (!$attendances->has($student->id)) {
                    $newAttendance = Attendance::create([
                        'student_id' => $student->id,
                        'teaching_id' => $teachingId,
                        'scanned_by' => null, // Auto-marked
                        'attendance_date' => $today,
                        'status' => 'alfa',
                    ]);
                    $attendances->put($student->id, $newAttendance);
                }
            }
        }
        
        // Map attendance status back to students
        $studentsWithAttendance = $studentsInClass->map(function($student) use ($attendances) {
            $att = $attendances->get($student->id);
            $student->attendance = $att;
            return $student;
        });

        return Inertia::render('Teacher/TeachingDetail', [
            'teaching' => $teaching,
            'students' => $studentsWithAttendance,
        ]);
    }

    public function quickUpdate(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'teaching_id' => 'required|exists:teachings,id',
            'status' => 'required|in:hadir,izin,sakit,alfa,telat',
        ]);

        $today = now()->toDateString();
        
        $attendance = Attendance::updateOrCreate(
            [
                'student_id' => $request->student_id,
                'teaching_id' => $request->teaching_id,
                'attendance_date' => $today,
            ],
            [
                'status' => $request->status,
                'scanned_by' => auth()->id(),
                'check_in' => $request->status === 'hadir' || $request->status === 'telat' ? now() : null,
                'late_minutes' => $request->status === 'telat' ? 15 : 0,
            ]
        );

        return redirect()->back()->with('message', 'Status presensi diperbarui.');
    }

    public function scan()
    {
        $user = auth()->user();
        $teacher = $user->teacher;

        // Super Admin can see all teachings to scan for any class
        if ($user->hasRole('super-admin')) {
            $teachings = Teachings::with(['schoolClass', 'subject', 'teacher.user'])->get();
            return Inertia::render('Teacher/Scan', [
                'teachings' => TeachingResource::collection($teachings),
            ]);
        }

        if (!$teacher) {
            return redirect()->route('dashboard')->with('error', 'Anda tidak terdaftar sebagai guru.');
        }

        $teachings = Teachings::where('teacher_id', $teacher->id)
            ->with(['schoolClass', 'subject'])
            ->get();

        return Inertia::render('Teacher/Scan', [
            'teachings' => TeachingResource::collection($teachings),
        ]);
    }

    public function processScan(Request $request)
    {
        $request->validate([
            'barcode_code' => 'required|exists:students,barcode_code',
            'teaching_id' => 'required|exists:teachings,id',
        ]);

        $student = Students::where('barcode_code', $request->barcode_code)->firstOrFail();
        $teaching = Teachings::findOrFail($request->teaching_id);
        
        // Ensure student is in the class
        $isInClass = ClassStudents::where('class_id', $teaching->class_id)
            ->where('student_id', $student->id)
            ->exists();
            
        if (!$isInClass) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa ' . $student->name . ' tidak terdaftar di kelas ' . $teaching->schoolClass->name
            ], 422);
        }

        // Check if already attended today for this teaching
        $attendance = Attendance::where('student_id', $student->id)
            ->where('teaching_id', $teaching->id)
            ->whereDate('attendance_date', now())
            ->first();

        if ($attendance && $attendance->status !== 'alfa') {
            $statusLabel = match($attendance->status) {
                'hadir' => 'sudah hadir',
                'telat' => 'sudah hadir (telat)',
                'izin' => 'sudah izin',
                'sakit' => 'sedang sakit',
                default => 'sudah melakukan presensi'
            };
            return response()->json([
                'success' => false,
                'message' => 'Siswa ' . $student->name . ' ' . $statusLabel . ' hari ini.'
            ], 422);
        }

        // Time logic
        $now = now();
        $startTime = \Carbon\Carbon::createFromTimeString($teaching->start_time);
        $endTime = \Carbon\Carbon::createFromTimeString($teaching->end_time);
        
        $status = 'hadir';
        $lateMinutes = 0;
        
        // If scanned after end time, it's Alfa but we record it (or block it?)
        // User requested: "lewat dari jam pelajaran otomatis alpha"
        if ($now->greaterThan($endTime)) {
            $status = 'alfa';
            $message = 'Siswa ' . $student->name . ' terlambat masuk (melebihi jam pelajaran). Status: Alfa';
        } elseif ($now->diffInMinutes($startTime, false) < -15) {
            // If more than 15 mins late
            $status = 'telat';
            $lateMinutes = abs($now->diffInMinutes($startTime, false));
            $message = 'Siswa ' . $student->name . ' telat ' . $lateMinutes . ' menit.';
        } else {
            $message = 'Presensi berhasil dicatat untuk ' . $student->name;
        }

        if ($attendance) {
            // Update if it was previously Alfa (auto-marked)
            $attendance->update([
                'scanned_by' => auth()->id(),
                'check_in' => $now,
                'status' => $status,
                'late_minutes' => $lateMinutes,
            ]);
        } else {
            Attendance::create([
                'student_id' => $student->id,
                'teaching_id' => $teaching->id,
                'scanned_by' => auth()->id(),
                'attendance_date' => now()->toDateString(),
                'check_in' => $now,
                'status' => $status,
                'late_minutes' => $lateMinutes,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'student' => $student,
            'status' => $status
        ]);
    }
}
