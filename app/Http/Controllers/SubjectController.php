<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Services\SubjectService;
use Inertia\Inertia;

class SubjectController extends Controller
{
    protected $subjectService;

    public function __construct(SubjectService $subjectService)
    {
        $this->subjectService = $subjectService;
    }

    public function index()
    {
        return Inertia::render('Subjects/Index', [
            'subjects' => SubjectResource::collection($this->subjectService->getAll()),
        ]);
    }

    public function store(SubjectRequest $request)
    {
        $this->subjectService->create($request->validated());
        return redirect()->back()->with('message', 'Mata pelajaran berhasil ditambahkan.');
    }

    public function update(SubjectRequest $request, string $id)
    {
        $this->subjectService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Mata pelajaran berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->subjectService->delete($id);
        return redirect()->back()->with('message', 'Mata pelajaran berhasil dihapus.');
    }
}
