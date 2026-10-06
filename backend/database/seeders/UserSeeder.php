<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $citizenRole = DB::table('roles')
            ->where('name', 'Citizen')
            ->value('id');

        $lguStaffRole = DB::table('roles')
            ->where('name', 'LGU Staff')
            ->value('id');

        $departmentHeadRole = DB::table('roles')
            ->where('name', 'Department Head')
            ->value('id');

        $assignedPersonnelRole = DB::table('roles')
            ->where('name', 'Assigned Personnel')
            ->value('id');

        $adminRole = DB::table('roles')
            ->where('name', 'System Administrator')
            ->value('id');

        $poblacionBarangay = DB::table('barangays')
            ->where('code', 'BRGY-001')
            ->value('id');

        $engineeringDepartment = DB::table('departments')
            ->where('name', 'Engineering')
            ->value('id');

        $generalServicesDepartment = DB::table('departments')
            ->where('name', 'General Services')
            ->value('id');

        $users = [
            [
                'supabase_user_id' => '00000000-0000-0000-0000-000000000001',
                'role_id' => $citizenRole,
                'barangay_id' => $poblacionBarangay,
                'department_id' => null,
                'first_name' => 'Juan',
                'middle_name' => null,
                'last_name' => 'Dela Cruz',
                'email' => 'citizen@example.com',
                'phone' => '09170000001',
                'profile_image' => null,
                'is_active' => true,
            ],
            [
                'supabase_user_id' => '00000000-0000-0000-0000-000000000002',
                'role_id' => $lguStaffRole,
                'barangay_id' => null,
                'department_id' => $generalServicesDepartment,
                'first_name' => 'Maria',
                'middle_name' => 'Santos',
                'last_name' => 'Reyes',
                'email' => 'lgu.staff@example.com',
                'phone' => '09170000002',
                'profile_image' => null,
                'is_active' => true,
            ],
            [
                'supabase_user_id' => '00000000-0000-0000-0000-000000000003',
                'role_id' => $departmentHeadRole,
                'barangay_id' => null,
                'department_id' => $engineeringDepartment,
                'first_name' => 'Pedro',
                'middle_name' => 'Garcia',
                'last_name' => 'Ramos',
                'email' => 'department.head@example.com',
                'phone' => '09170000003',
                'profile_image' => null,
                'is_active' => true,
            ],
            [
                'supabase_user_id' => '00000000-0000-0000-0000-000000000004',
                'role_id' => $assignedPersonnelRole,
                'barangay_id' => null,
                'department_id' => $engineeringDepartment,
                'first_name' => 'Jose',
                'middle_name' => 'M.',
                'last_name' => 'Santos',
                'email' => 'assigned.personnel@example.com',
                'phone' => '09170000004',
                'profile_image' => null,
                'is_active' => true,
            ],
            [
                'supabase_user_id' => '00000000-0000-0000-0000-000000000005',
                'role_id' => $adminRole,
                'barangay_id' => null,
                'department_id' => null,
                'first_name' => 'Admin',
                'middle_name' => null,
                'last_name' => 'User',
                'email' => 'admin@example.com',
                'phone' => '09170000005',
                'profile_image' => null,
                'is_active' => true,
            ],
        ];

        foreach ($users as $user) {
            DB::table('users')->updateOrInsert(
                ['supabase_user_id' => $user['supabase_user_id']],
                $user
            );
        }
    }
}