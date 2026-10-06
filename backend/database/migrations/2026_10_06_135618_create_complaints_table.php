<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();

            $table->string('tracking_number')->unique();

            $table->foreignId('citizen_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->foreignId('barangay_id')
                ->constrained('barangays')
                ->restrictOnDelete();

            $table->foreignId('department_id')
                ->nullable()
                ->constrained('departments')
                ->nullOnDelete();

            $table->foreignId('category_id')
                ->constrained('complaint_categories')
                ->restrictOnDelete();

            $table->foreignId('priority_id')
                ->nullable()
                ->constrained('priorities')
                ->nullOnDelete();

            $table->string('subject');
            $table->text('description');
            $table->text('location')->nullable();

            $table->string('status')->default('SUBMITTED');

            $table->timestamp('submitted_at');
            $table->timestamp('resolved_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};