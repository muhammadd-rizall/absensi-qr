<?php

namespace App\Services;

use App\Repositories\RoleRepository;

class RoleService
{
    protected $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function getAll()
    {
        return $this->roleRepository->getAllWithPermissions();
    }

    public function find($id)
    {
        return $this->roleRepository->findWithPermissions($id);
    }

    public function create(array $data)
    {
        return $this->roleRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->roleRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->roleRepository->delete($id);
    }

    public function syncPermissions($roleId, array $permissionIds)
    {
        return $this->roleRepository->syncPermissions($roleId, $permissionIds);
    }
}
