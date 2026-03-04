<?php

namespace App\Services;

use App\Repositories\PermissionRepository;

class PermissionService
{
    protected $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function getAll()
    {
        return $this->permissionRepository->all();
    }

    public function getGrouped()
    {
        return $this->permissionRepository->getAllGrouped();
    }
}
