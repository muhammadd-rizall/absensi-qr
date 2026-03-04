<?php

namespace App\Repositories;

use App\Models\Students;

class StudentRepository extends BaseRepository
{
    public function __construct(Students $student)
    {
        $this->model = $student;
    }

    /**
     * Find student by NIS.
     *
     * @param string $nis
     * @return Students|null
     */
    public function findByNis(string $nis)
    {
        return $this->model->where('nis', $nis)->first();
    }

    /**
     * Find student by barcode.
     *
     * @param string $barcode
     * @return Students|null
     */
    public function findByBarcode(string $barcode)
    {
        return $this->model->where('barcode_code', $barcode)->first();
    }
}
