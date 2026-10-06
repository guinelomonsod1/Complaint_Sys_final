<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Citizen',
                'description' => 'Registers, submits, tracks, and provides feedback on complaints.',
            ],
            [
                'name' => 'LGU Staff',
                'description' => 'Receives, reviews, logs, updates, routes, and prepares reports for complaints.',
            ],
            [
                'name' => 'Department Head',
                'description' => 'Oversees department complaints, assigns personnel, reviews resolutions, and monitors progress.',
            ],
            [
                'name' => 'Assigned Personnel',
                'description' => 'Conducts field investigations, performs assigned actions, uploads proof, and submits complaint updates.',
            ],
            [
                'name' => 'System Administrator',
                'description' => 'Manages user accounts, department settings, system configuration, reports, and database administration.',
            ],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']],
                $role
            );
        }
    }
}