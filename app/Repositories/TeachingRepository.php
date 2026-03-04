<?php

namespace App\Repositories;

use App\Models\Teachings;

class TeachingRepository extends BaseRepository
{
    public function __construct(Teachings $teaching)
    {
        $this->model = $teaching;
    }

    /**
     * Get teachings by teacher.
     *
     * @param string $teacherId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByTeacher(string $teacherId)
    {
        return $this->model->where('teacher_id', $teacherId)->with(['subject', 'class'])->get();
    }

    /**
     * Get teachings by class.
     *
     * @param string $classId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByClass(string $classId)
    {
        return $this->model->where('class_id', $classId)->with(['teacher', 'subject'])->get();
    }
}
