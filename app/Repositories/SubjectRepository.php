<?php

namespace App\Repositories;

use App\Models\Subjects;

class SubjectRepository extends BaseRepository
{
    public function __construct(Subjects $subject)
    {
        $this->model = $subject;
    }

    /**
     * Find subject by slug.
     *
     * @param string $slug
     * @return Subjects|null
     */
    public function findBySlug(string $slug)
    {
        return $this->model->where('slug', $slug)->first();
    }
}
