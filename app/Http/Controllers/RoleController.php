<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Services\RoleService;
use App\Services\PermissionService;
use Inertia\Inertia;

class RoleController extends Controller
{
    protected $roleService;
    protected $permissionService;

    public function __construct(RoleService $roleService, PermissionService $permissionService)
    {
        $this->roleService = $roleService;
        $this->permissionService = $permissionService;
    }

    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => RoleResource::collection($this->roleService->getAll()),
            'permissions' => $this->permissionService->getGrouped(),
        ]);
    }

    public function store(RoleRequest $request)
    {
        $role = $this->roleService->create($request->validated());
        if ($request->has('permissions')) {
            $this->roleService->syncPermissions($role->id, $request->permissions);
        }
        return redirect()->back()->with('message', 'Peran berhasil ditambahkan.');
    }

    public function update(RoleRequest $request, string $id)
    {
        $this->roleService->update($id, $request->validated());
        if ($request->has('permissions')) {
            $this->roleService->syncPermissions($id, $request->permissions);
        }
        return redirect()->back()->with('message', 'Peran berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->roleService->delete($id);
        return redirect()->back()->with('message', 'Peran berhasil dihapus.');
    }
}
