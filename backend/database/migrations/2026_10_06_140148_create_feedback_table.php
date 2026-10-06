<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();

            $table->foreignId('complaint_id')
                ->unique()
                ->constrained('complaints')
                ->cascadeOnDelete();

            $table->foreignId('citizen_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->unsignedSmallInteger('rating');

            $table->text('comments')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};