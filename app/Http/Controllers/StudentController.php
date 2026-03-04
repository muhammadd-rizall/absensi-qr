<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Http\Resources\StudentResource;
use App\Services\StudentService;
use Inertia\Inertia;

class StudentController extends Controller
{
    protected $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function index()
    {
        return Inertia::render('Students/Index', [
            'students' => StudentResource::collection($this->studentService->getAll()),
        ]);
    }

    public function store(StudentRequest $request)
    {
        $this->studentService->create($request->validated());
        return redirect()->back()->with('message', 'Siswa berhasil ditambahkan.');
    }

    public function update(StudentRequest $request, string $id)
    {
        $this->studentService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Siswa berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->studentService->delete($id);
        return redirect()->back()->with('message', 'Siswa berhasil dihapus.');
    }
}
