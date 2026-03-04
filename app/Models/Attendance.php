<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'student_id',
        'teaching_id',
        'scanned_by',
        'attendance_date',
        'check_in',
        'status',
        'late_minutes'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Students::class, 'student_id');
    }

    public function teaching(): BelongsTo
    {
        return $this->belongsTo(Teachings::class, 'teaching_id');
    }

    public function scannedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'scanned_by');
    }
}
