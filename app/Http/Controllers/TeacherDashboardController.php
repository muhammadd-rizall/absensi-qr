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

        // Check if already attended today for this teaching
        $attendance = Attendance::where('student_id', $student->id)
            ->where('teaching_id', $teaching->id)
            ->whereDate('attendance_date', now())
            ->first();

        if ($attendance) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa ' . $student->name . ' sudah melakukan presensi hari ini.'
            ], 422);
        }

        Attendance::create([
            'student_id' => $student->id,
            'teaching_id' => $teaching->id,
            'scanned_by' => auth()->id(),
            'attendance_date' => now(),
            'check_in' => now(),
            'status' => 'hadir',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Presensi berhasil dicatat untuk ' . $student->name,
            'student' => $student
        ]);
    }
}
