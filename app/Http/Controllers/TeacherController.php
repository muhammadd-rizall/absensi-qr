<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Services\TeacherService;
use Inertia\Inertia;

class TeacherController extends Controller
{
    protected $teacherService;

    public function __construct(TeacherService $teacherService)
    {
        $this->teacherService = $teacherService;
    }

    public function index()
    {
        return Inertia::render('Teachers/Index', [
            'teachers' => TeacherResource::collection($this->teacherService->getAll()),
        ]);
    }

    public function store(TeacherRequest $request)
    {
        $this->teacherService->create($request->validated());
        return redirect()->back()->with('message', 'Guru berhasil ditambahkan.');
    }

    public function update(TeacherRequest $request, string $id)
    {
        $this->teacherService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Guru berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->teacherService->delete($id);
        return redirect()->back()->with('message', 'Guru berhasil dihapus.');
    }
}
