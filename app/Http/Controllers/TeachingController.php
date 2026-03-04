<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeachingRequest;
use App\Http\Resources\TeachingResource;
use App\Services\TeachingService;
use App\Services\TeacherService;
use App\Services\SubjectService;
use App\Services\ClassService;
use Inertia\Inertia;

class TeachingController extends Controller
{
    protected $teachingService;
    protected $teacherService;
    protected $subjectService;
    protected $classService;

    public function __construct(
        TeachingService $teachingService,
        TeacherService $teacherService,
        SubjectService $subjectService,
        ClassService $classService
    ) {
        $this->teachingService = $teachingService;
        $this->teacherService = $teacherService;
        $this->subjectService = $subjectService;
        $this->classService = $classService;
    }

    public function index()
    {
        return Inertia::render('Teachings/Index', [
            'teachings' => TeachingResource::collection($this->teachingService->getAll()),
            'teachers' => $this->teacherService->getAll(),
            'subjects' => $this->subjectService->getAll(),
            'classes' => $this->classService->getAll(),
        ]);
    }

    public function store(TeachingRequest $request)
    {
        $this->teachingService->create($request->validated());
        return redirect()->back()->with('message', 'Jadwal mengajar berhasil ditambahkan.');
    }

    public function update(TeachingRequest $request, string $id)
    {
        $this->teachingService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Jadwal mengajar berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->teachingService->delete($id);
        return redirect()->back()->with('message', 'Jadwal mengajar berhasil dihapus.');
    }
}
