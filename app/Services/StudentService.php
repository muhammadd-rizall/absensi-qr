<?php

namespace App\Services;

use App\Repositories\StudentRepository;

class StudentService
{
    protected $studentRepository;

    public function __construct(StudentRepository $studentRepository)
    {
        $this->studentRepository = $studentRepository;
    }

    public function getAll()
    {
        return $this->studentRepository->all();
    }

    public function find($id)
    {
        return $this->studentRepository->find($id);
    }

    public function create(array $data)
    {
        if (!isset($data['barcode_code']) || empty($data['barcode_code'])) {
            $data['barcode_code'] = 'STU-' . ($data['nis'] ?? strtoupper(bin2hex(random_bytes(4)))) . '-' . time();
        }
        return $this->studentRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->studentRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->studentRepository->delete($id);
    }

    public function findByNis($nis)
    {
        return $this->studentRepository->findByNis($nis);
    }

    public function findByBarcode($barcode)
    {
        return $this->studentRepository->findByBarcode($barcode);
    }
}
