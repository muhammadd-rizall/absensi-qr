<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassStudents extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'student_id',
        'class_id',
        'academic_year_id'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Students::class, 'student_id');
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYears::class, 'academic_year_id');
    }
}
