<?php

namespace App\Services;

use App\Repositories\AttendanceRepository;

class AttendanceService
{
    protected $attendanceRepository;

    public function __construct(AttendanceRepository $attendanceRepository)
    {
        $this->attendanceRepository = $attendanceRepository;
    }

    public function getAll()
    {
        return $this->attendanceRepository->all(['student', 'teaching.subject', 'teaching.class']);
    }

    public function find($id)
    {
        return $this->attendanceRepository->find($id, ['student', 'teaching.subject', 'teaching.class']);
    }

    public function create(array $data)
    {
        return $this->attendanceRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->attendanceRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->attendanceRepository->delete($id);
    }

    public function getByDate($date)
    {
        return $this->attendanceRepository->getByDate($date);
    }

    public function getByStudent($studentId)
    {
        return $this->attendanceRepository->getByStudent($studentId);
    }
}
