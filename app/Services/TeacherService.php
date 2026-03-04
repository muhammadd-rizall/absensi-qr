<?php

namespace App\Services;

use App\Repositories\TeacherRepository;
use App\Models\User;
use App\Models\Roles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherService
{
    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository)
    {
        $this->teacherRepository = $teacherRepository;
    }

    public function getAll()
    {
        return $this->teacherRepository->all(['user']);
    }

    public function find($id)
    {
        return $this->teacherRepository->find($id, ['user']);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            if (!isset($data['user_id']) || empty($data['user_id'])) {
                // Create a user account for the teacher
                $user = User::create([
                    'name' => $data['name'],
                    'email' => strtolower(str_replace(' ', '.', $data['name'])) . '@example.com', // Placeholder email
                    'password' => Hash::make('password'), // Default password
                ]);

                // Assign Guru role
                $guruRole = Roles::where('slug', 'guru')->first();
                if ($guruRole) {
                    $user->roles()->sync([$guruRole->id]);
                }

                $data['user_id'] = $user->id;
            }

            // Map phone to no_hp if necessary
            if (isset($data['phone'])) {
                $data['no_hp'] = $data['phone'];
            }

            return $this->teacherRepository->create($data);
        });
    }

    public function update($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $teacher = $this->teacherRepository->find($id);
            
            if (isset($data['name']) && $teacher->user) {
                $teacher->user->update(['name' => $data['name']]);
            }

            if (isset($data['phone'])) {
                $data['no_hp'] = $data['phone'];
            }

            return $this->teacherRepository->update($id, $data);
        });
    }

    public function delete($id)
    {
        return $this->teacherRepository->delete($id);
    }

    public function findByNip($nip)
    {
        return $this->teacherRepository->findByNip($nip);
    }
}
