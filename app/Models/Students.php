<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Students extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'nis',
        'name',
        'gender',
        'barcode_code',
        'status'

    ];

    public function classStudents(): HasMany
    {
        return $this->hasMany(ClassStudents::class, 'student_id');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'student_id');
    }
}
