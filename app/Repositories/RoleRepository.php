<?php

namespace App\Repositories;

use App\Models\Roles;

class RoleRepository extends BaseRepository
{
    public function __construct(Roles  $role)
    {
        $this->model = $role;
    }

    /**
     * Get all roles with permissions.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllWithPermissions()
    {
        return $this->model->with('permissions')->withCount('users')->get();
    }

    /**
     * Find role with permissions.
     *
     * @param string $id
     * @return Roles
     */
    public function findWithPermissions(string $id): Roles
    {
        return $this->model->with('permissions')->withCount('users')->findOrFail($id);
    }

    /**
     * Sync permissions to role.
     *
     * @param string $roleId
     * @param array $permissionIds
     * @return Roles
     */
    public function syncPermissions(string $roleId, array $permissionIds): Roles
    {
        $role = $this->find($roleId);
        $role->permissions()->sync($permissionIds);
        return $role->load('permissions');
    }

    /**
     * Attach single permission to role.
     *
     * @param string $roleId
     * @param string $permissionId
     * @return Roles
     */
    public function attachPermission(string $roleId, string $permissionId): Roles
    {
        $role = $this->find($roleId);
        $role->permissions()->attach($permissionId);
        return $role->load('permissions');
    }

    /**
     * Detach single permission from role.
     *
     * @param string $roleId
     * @param string $permissionId
     * @return Roles
     */
    public function detachPermission(string $roleId, string $permissionId): Roles
    {
        $role = $this->find($roleId);
        $role->permissions()->detach($permissionId);
        return $role->load('permissions');
    }

    /**
     * Find role by slug.
     *
     * @param string $slug
     * @return Roles|null
     */
    public function findBySlug(string $slug): ?Roles
    {
        return $this->model->where('slug', $slug)->first();
    }
}
