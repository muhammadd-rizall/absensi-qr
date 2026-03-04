<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcademicYearRequest;
use App\Http\Resources\AcademicYearResource;
use App\Services\AcademicYearService;
use Inertia\Inertia;

class AcademicYearController extends Controller
{
    protected $academicYearService;

    public function __construct(AcademicYearService $academicYearService)
    {
        $this->academicYearService = $academicYearService;
    }

    public function index()
    {
        $academicYears = $this->academicYearService->getAll();
        return Inertia::render('AcademicYears/Index', [
            'academicYears' => AcademicYearResource::collection($academicYears),
        ]);
    }

    public function store(AcademicYearRequest $request)
    {
        $this->academicYearService->create($request->validated());
        return redirect()->back()->with('message', 'Tahun ajaran berhasil ditambahkan.');
    }

    public function update(AcademicYearRequest $request, string $id)
    {
        $this->academicYearService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Tahun ajaran berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->academicYearService->delete($id);
        return redirect()->back()->with('message', 'Tahun ajaran berhasil dihapus.');
    }
}
