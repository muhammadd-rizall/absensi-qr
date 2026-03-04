<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teachings extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'teacher_id',
        'class_id',
        'subject_id',
        'day_of_week',
        'start_time',
        'end_time'
    ];

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teachers::class, 'teacher_id');
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subjects::class, 'subject_id');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'teaching_id');
    }
}
