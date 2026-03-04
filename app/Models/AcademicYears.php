<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class AcademicYears extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'is_active'
    ];

    public function classes(): HasMany
    {
        return $this->hasMany(Classes::class, 'academic_year_id');
    }

    public function classStudents(): HasMany
    {
        return $this->hasMany(ClassStudents::class, 'academic_year_id');
    }
}
