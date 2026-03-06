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
        ]);
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
