<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComplaintCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Roads', 'description' => null],
            ['name' => 'Garbage', 'description' => null],
            ['name' => 'Drainage', 'description' => null],
            ['name' => 'Public Safety', 'description' => null],
            ['name' => 'Health', 'description' => null],
            ['name' => 'Noise', 'description' => null],
            ['name' => 'Other', 'description' => null],
        ];

        foreach ($categories as $category) {
            DB::table('complaint_categories')->updateOrInsert(
                ['name' => $category['name']],
                $category
            );
        }
    }
}