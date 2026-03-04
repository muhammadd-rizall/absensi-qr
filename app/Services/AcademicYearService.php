<?php

namespace App\Services;

use App\Repositories\AcademicYearRepository;

class AcademicYearService
{
    protected $academicYearRepository;

    public function __construct(AcademicYearRepository $academicYearRepository)
    {
        $this->academicYearRepository = $academicYearRepository;
    }

    public function getAll()
    {
        return $this->academicYearRepository->all();
    }

    public function find($id)
    {
        return $this->academicYearRepository->find($id);
    }

    public function create(array $data)
    {
        if (isset($data['is_active']) && $data['is_active']) {
            $this->academicYearRepository->getActive() ? 
                \App\Models\AcademicYears::where('is_active', true)->update(['is_active' => false]) : null;
        }
        return $this->academicYearRepository->create($data);
    }

    public function update($id, array $data)
    {
        if (isset($data['is_active']) && $data['is_active']) {
            \App\Models\AcademicYears::where('is_active', true)
                ->where('id', '!=', $id)
                ->update(['is_active' => false]);
        }
        return $this->academicYearRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->academicYearRepository->delete($id);
    }

    public function setActive($id)
    {
        return $this->academicYearRepository->setActive($id);
    }
}
