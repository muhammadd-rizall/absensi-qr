<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Get all active users with their roles.
     *
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllWithRole(array $relations = ['role'])
    {
        return $this->model->with($relations)->get();
    }

    /**
     * Find user by email.
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }

    /**
     * Get users by role.
     *
     * @param string $roleId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByRole(string $roleId)
    {
        return $this->model->where('role_id', $roleId)->with('role')->get();
    }
}
