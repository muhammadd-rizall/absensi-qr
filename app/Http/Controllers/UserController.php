<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Services\RoleService;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;
    protected $roleService;

    public function __construct(UserService $userService, RoleService $roleService)
    {
        $this->userService = $userService;
        $this->roleService = $roleService;
    }

    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($this->userService->getAll()),
            'roles' => $this->roleService->getAll(),
        ]);
    }

    public function store(UserRequest $request)
    {
        $this->userService->create($request->validated());
        return redirect()->back()->with('message', 'Pengguna berhasil ditambahkan.');
    }

    public function update(UserRequest $request, string $id)
    {
        $this->userService->update($id, $request->validated());
        return redirect()->back()->with('message', 'Pengguna berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $this->userService->delete($id);
        return redirect()->back()->with('message', 'Pengguna berhasil dihapus.');
    }
}
