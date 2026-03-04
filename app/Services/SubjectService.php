<?php

namespace App\Services;

use App\Repositories\SubjectRepository;
use Illuminate\Support\Str;

class SubjectService
{
    protected $subjectRepository;

    public function __construct(SubjectRepository $subjectRepository)
    {
        $this->subjectRepository = $subjectRepository;
    }

    public function getAll()
    {
        return $this->subjectRepository->all();
    }

    public function find($id)
    {
        return $this->subjectRepository->find($id);
    }

    public function create(array $data)
    {
        if (!isset($data['slug']) || empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->subjectRepository->create($data);
    }

    public function update($id, array $data)
    {
        if (isset($data['name']) && (!isset($data['slug']) || empty($data['slug']))) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->subjectRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->subjectRepository->delete($id);
    }

    public function findBySlug($slug)
    {
        return $this->subjectRepository->findBySlug($slug);
    }
}
