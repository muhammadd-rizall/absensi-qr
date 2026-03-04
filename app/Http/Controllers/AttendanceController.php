<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttendanceRequest;
use App\Http\Resources\AttendanceResource;
use App\Services\AttendanceService;
use App\Services\StudentService;
use App\Services\TeachingService;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    protected $attendanceService;
    protected $studentService;
    protected $teachingService;

    public function __construct(
        AttendanceService $attendanceService,
        StudentService $studentService,
        TeachingService $teachingService
    ) {
        $this->attendanceService = $attendanceService;
        $this->studentService = $studentService;
        $this->teachingService = $teachingService;
    }

    public function index()
    {
        return Inertia::render('Attendance/Index', [
            'attendances' => AttendanceResource::collection($this->attendanceService->getAll()),
            'students' => $this->studentService->getAll(),
            'teachings' => $this->teachingService->getAll(),
        ]);
    }

    public function store(AttendanceRequest $request)
    {
        $this->attendanceService->create($request->validated());
        return redirect()->back()->with('message', 'Presensi berhasil dicatat.');
    }

    public function update(AttendanceRequest $request, string $id)
    {
        $this->attendanceService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Presensi berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->attendanceService->delete($id);
        return redirect()->back()->with('message', 'Presensi berhasil dihapus.');
    }
}
