<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\TeacherResource;
use App\Services\ClassService;
use App\Services\AcademicYearService;
use App\Services\TeacherService;
use Inertia\Inertia;

class ClassController extends Controller
{
    protected $classService;
    protected $academicYearService;
    protected $teacherService;

    public function __construct(
        ClassService $classService,
        AcademicYearService $academicYearService,
        TeacherService $teacherService
    ) {
        $this->classService = $classService;
        $this->academicYearService = $academicYearService;
        $this->teacherService = $teacherService;
    }

    public function index()
    {
        return Inertia::render('Classes/Index', [
            'classes' => ClassResource::collection($this->classService->getAll()),
            'academicYears' => $this->academicYearService->getAll(),
            'teachers' => TeacherResource::collection($this->teacherService->getAll()),
            'stats' => [
                'total' => \App\Models\Classes::count(),
                'grade_x' => \App\Models\Classes::where('level', 'X')->count(),
                'grade_xi' => \App\Models\Classes::where('level', 'XI')->count(),
                'grade_xii' => \App\Models\Classes::where('level', 'XII')->count(),
            ]
        ]);
    }

    /**
     * Display the specified class and its students.
     */
    public function show(string $id)
    {
        $class = $this->classService->find($id);
        
        // Eager load students for the class using the correct relationship name
        $class->load('students'); // Use 'students' instead of 'students.student' if 'students' is the direct relationship
        
        // Get all students who are NOT in this class to show in "Add Students" list
        // This part might need adjustment if 'students' relationship itself returns the student model directly
        $allStudents = \App\Models\Students::whereDoesntHave('classes', function($query) use ($id) {
            $query->where('class_id', $id);
        })->get();

        return Inertia::render('Classes/Show', [
            'class' => new ClassResource($class),
            // Pass the students directly from the 'students' relationship
            'studentsInClass' => $class->students, 
            'availableStudents' => $allStudents,
        ]);
    }

    /**
     * Add students to the class.
     */
    public function addStudents(\Illuminate\Http\Request $request, string $id)
    {
        $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        foreach ($request->student_ids as $studentId) {
            \App\Models\ClassStudents::updateOrCreate([
                'class_id' => $id,
                'student_id' => $studentId,
            ]);
        }

        return redirect()->back()->with('message', 'Siswa berhasil ditambahkan ke kelas.');
    }

    /**
     * Remove a student from the class.
     */
    public function removeStudent(string $classId, string $studentId)
    {
        \App\Models\ClassStudents::where('class_id', $classId)
            ->where('student_id', $studentId)
            ->delete();

        return redirect()->back()->with('message', 'Siswa berhasil dihapus dari kelas.');
    }

    public function store(ClassRequest $request)
    {
        $this->classService->create($request->validated());
        return redirect()->back()->with('message', 'Kelas berhasil ditambahkan.');
    }

    public function update(ClassRequest $request, string $id)
    {
        $this->classService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Kelas berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->classService->delete($id);
        return redirect()->back()->with('message', 'Kelas berhasil dihapus.');
    }
}
