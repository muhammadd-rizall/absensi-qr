<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll()
    {
        return $this->userRepository->all(['roles']);
    }

    public function find($id)
    {
        return $this->userRepository->find($id, ['roles']);
    }

    public function create(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = $this->userRepository->create($data);
        
        if (isset($data['roles'])) {
            $user->roles()->sync($data['roles']);
        }
        
        return $user->load('roles');
    }

    public function update($id, array $data)
    {
        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user = $this->userRepository->update($id, $data);
        
        if (isset($data['roles'])) {
            $user->roles()->sync($data['roles']);
        }
        
        return $user->load('roles');
    }

    public function delete($id)
    {
        return $this->userRepository->delete($id);
    }
}
