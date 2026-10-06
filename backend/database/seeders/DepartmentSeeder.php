<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Engineering',
                'description' => 'Handles infrastructure, roads, drainage, and related engineering concerns.',
            ],
            [
                'name' => 'Health',
                'description' => null,
            ],
            [
                'name' => 'Social Welfare',
                'description' => null,
            ],
            [
                'name' => 'Environment',
                'description' => null,
            ],
            [
                'name' => 'General Services',
                'description' => null,
            ],
        ];

        foreach ($departments as $department) {
            DB::table('departments')->updateOrInsert(
                ['name' => $department['name']],
                $department
            );
        }
    }
}