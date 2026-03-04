<?php

namespace App\Repositories;

use App\Models\AcademicYears;

class AcademicYearRepository extends BaseRepository
{
    public function __construct(AcademicYears $academicYear)
    {
        $this->model = $academicYear;
    }

    /**
     * Get the active academic year.
     *
     * @return AcademicYears|null
     */
    public function getActive()
    {
        return $this->model->where('is_active', true)->first();
    }

    /**
     * Set a specific academic year as active and deactivate others.
     *
     * @param string $id
     * @return AcademicYears
     */
    public function setActive(string $id)
    {
        $this->model->where('is_active', true)->update(['is_active' => false]);
        $academicYear = $this->find($id);
        $academicYear->update(['is_active' => true]);
        return $academicYear;
    }
}
