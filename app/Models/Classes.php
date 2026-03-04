<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Classes extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'academic_year_id',
        'homeroom_teacher_id'
    ];

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYears::class, 'academic_year_id');
    }

    public function homeroomTeacher(): BelongsTo
    {
        return $this->belongsTo(Teachers::class, 'homeroom_teacher_id');
    }

    public function classStudents(): HasMany
    {
        return $this->hasMany(ClassStudents::class, 'class_id');
    }

    public function teachings(): HasMany
    {
        return $this->hasMany(Teachings::class, 'class_id');
    }
}
