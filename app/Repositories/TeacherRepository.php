<?php

namespace App\Repositories;

use App\Models\Teachers;

class TeacherRepository extends BaseRepository
{
    public function __construct(Teachers $teacher)
    {
        $this->model = $teacher;
    }

    /**
     * Find teacher by NIP.
     *
     * @param string $nip
     * @return Teachers|null
     */
    public function findByNip(string $nip)
    {
        return $this->model->where('nip', $nip)->first();
    }
}
