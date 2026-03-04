<?php

namespace Database\Seeders;

use App\Models\Roles;
use App\Models\User;
use App\Models\Teachers;
use App\Models\Permissions;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleAndUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Permissions
        $permissions = [
            ['name' => 'View Dashboard', 'slug' => 'view-dashboard', 'group' => 'System'],
            ['name' => 'Manage Users', 'slug' => 'manage-users', 'group' => 'User Management'],
            ['name' => 'Manage Roles', 'slug' => 'manage-roles', 'group' => 'User Management'],
            ['name' => 'Manage Academic Years', 'slug' => 'manage-academic-years', 'group' => 'Master Data'],
            ['name' => 'Manage Classes', 'slug' => 'manage-classes', 'group' => 'Master Data'],
            ['name' => 'Manage Teachers', 'slug' => 'manage-teachers', 'group' => 'Master Data'],
            ['name' => 'Manage Students', 'slug' => 'manage-students', 'group' => 'Master Data'],
            ['name' => 'Manage Subjects', 'slug' => 'manage-subjects', 'group' => 'Master Data'],
            ['name' => 'Scan Attendance', 'slug' => 'scan-attendance', 'group' => 'Attendance'],
            ['name' => 'View Attendance Reports', 'slug' => 'view-attendance-reports', 'group' => 'Attendance'],
        ];

        foreach ($permissions as $perm) {
            Permissions::updateOrCreate(['slug' => $perm['slug']], $perm);
        }

        // 2. Create Roles
        $roles = [
            [
                'name' => 'Super Admin',
                'slug' => 'super-admin',
                'is_active' => true,
            ],
            [
                'name' => 'Administrator',
                'slug' => 'admin',
                'is_active' => true,
            ],
            [
                'name' => 'Guru',
                'slug' => 'guru',
                'is_active' => true,
            ],
        ];

        foreach ($roles as $roleData) {
            Roles::updateOrCreate(['slug' => $roleData['slug']], $roleData);
        }

        // 3. Assign Permissions to Roles
        $allPermissions = Permissions::all();
        $teacherPermissions = Permissions::whereIn('slug', ['view-dashboard', 'scan-attendance', 'view-attendance-reports'])->get();

        Roles::where('slug', 'super-admin')->first()->permissions()->sync($allPermissions->pluck('id'));
        Roles::where('slug', 'admin')->first()->permissions()->sync($allPermissions->pluck('id'));
        Roles::where('slug', 'guru')->first()->permissions()->sync($teacherPermissions->pluck('id'));

        // 4. Create Users
        $superAdminRole = Roles::where('slug', 'super-admin')->first();
        $adminRole = Roles::where('slug', 'admin')->first();
        $guruRole = Roles::where('slug', 'guru')->first();

        // Super Admin
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
            ]
        );
        $superAdmin->roles()->sync([$superAdminRole->id]);

        // Admin
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin Sistem',
                'password' => Hash::make('password'),
            ]
        );
        $admin->roles()->sync([$adminRole->id]);

        // Guru
        $guruUser = User::updateOrCreate(
            ['email' => 'guru@example.com'],
            [
                'name' => 'Guru Pengajar',
                'password' => Hash::make('password'),
            ]
        );
        $guruUser->roles()->sync([$guruRole->id]);

        // 5. Create Teacher record for Guru
        Teachers::updateOrCreate(
            ['user_id' => $guruUser->id], // kondisi
            [
                'nip' => '1234567890',
                'no_hp' => '0983783232',
                'address' => 'padang'
            ]
        );
        $this->command->info('Roles, Permissions, and Users seeded successfully!');
        $this->command->info('Super Admin: superadmin@example.com | password');
        $this->command->info('Admin: admin@example.com | password');
        $this->command->info('Guru: guru@example.com | password');
    }
}
