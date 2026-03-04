<?php

namespace App\Services;

use App\Repositories\ClassRepository;

class ClassService
{
    protected $classRepository;

    public function __construct(ClassRepository $classRepository)
    {
        $this->classRepository = $classRepository;
    }

    public function getAll()
    {
        return $this->classRepository->all(['academicYear', 'homeroomTeacher']);
    }

    public function find($id)
    {
        return $this->classRepository->find($id, ['academicYear', 'homeroomTeacher']);
    }

    public function create(array $data)
    {
        return $this->classRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->classRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->classRepository->delete($id);
    }

    public function getByAcademicYear($academicYearId)
    {
        return $this->classRepository->getByAcademicYear($academicYearId);
    }
}
