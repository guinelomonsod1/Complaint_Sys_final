<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarangaySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('barangays')->updateOrInsert(
            ['code' => 'BRGY-001'],
            [
                'name' => 'Poblacion',
                'code' => 'BRGY-001',
                'description' => 'Development reference barangay.',
            ]
        );
    }
}