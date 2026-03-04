<?php

namespace App\Repositories;

use App\Models\Attendance;

class AttendanceRepository extends BaseRepository
{
    public function __construct(Attendance $attendance)
    {
        $this->model = $attendance;
    }

    /**
     * Get attendance by date.
     *
     * @param string $date
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByDate(string $date)
    {
        return $this->model->where('attendance_date', $date)->with(['student', 'teaching.subject', 'teaching.class'])->get();
    }

    /**
     * Get student attendance history.
     *
     * @param string $studentId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByStudent(string $studentId)
    {
        return $this->model->where('student_id', $studentId)->with(['teaching.subject', 'teaching.class'])->get();
    }
}
