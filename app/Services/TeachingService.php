<?php

namespace App\Services;

use App\Repositories\TeachingRepository;

class TeachingService
{
    protected $teachingRepository;

    public function __construct(TeachingRepository $teachingRepository)
    {
        $this->teachingRepository = $teachingRepository;
    }

    public function getAll()
    {
        return $this->teachingRepository->all(['teacher.user', 'subject', 'schoolClass']);
    }

    public function find($id)
    {
        return $this->teachingRepository->find($id, ['teacher.user', 'subject', 'schoolClass']);
    }

    public function create(array $data)
    {
        return $this->teachingRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->teachingRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->teachingRepository->delete($id);
    }

    public function getByTeacher($teacherId)
    {
        return $this->teachingRepository->getByTeacher($teacherId);
    }

    public function getByClass($classId)
    {
        return $this->teachingRepository->getByClass($classId);
    }
}
