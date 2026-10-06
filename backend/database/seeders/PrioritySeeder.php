<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioritySeeder extends Seeder
{
    public function run(): void
    {
        $priorities = [
            ['name' => 'Low', 'description' => null],
            ['name' => 'Medium', 'description' => null],
            ['name' => 'High', 'description' => null],
            ['name' => 'Urgent', 'description' => null],
        ];

        foreach ($priorities as $priority) {
            DB::table('priorities')->updateOrInsert(
                ['name' => $priority['name']],
                $priority
            );
        }
    }
}