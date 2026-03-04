<?php

namespace App\Repositories;

use App\Models\Permissions;

class PermissionRepository extends BaseRepository
{
    public function __construct(Permissions $permission)
    {
        $this->model = $permission;
    }

    /**
     * Get all permissions grouped by their group name.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllGrouped()
    {
        return $this->model->all()->groupBy('group');
    }
}
