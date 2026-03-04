<?php

namespace App\Repositories;

use App\Models\Classes;

class ClassRepository extends BaseRepository
{
    public function __construct(Classes $class)
    {
        $this->model = $class;
    }

    /**
     * Get classes by academic year.
     *
     * @param string $academicYearId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByAcademicYear(string $academicYearId)
    {
        return $this->model->where('academic_year_id', $academicYearId)->with(['academicYear', 'homeroomTeacher'])->get();
    }
}
