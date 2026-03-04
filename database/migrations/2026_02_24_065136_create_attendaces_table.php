<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('student_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('teaching_id')->constrained('teachings')->cascadeOnDelete();
            $table->foreignUuid('scanned_by')->nullable()->constrained('users')->nullOnDelete();

            $table->date('attendance_date');
            $table->dateTime('check_in')->nullable();

            $table->enum('status', ['hadir', 'izin', 'sakit', 'alfa', 'telat'])
                ->default('hadir');

            $table->integer('late_minutes')->nullable();

            $table->timestamps();

            $table->unique(['student_id', 'teaching_id', 'attendance_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
