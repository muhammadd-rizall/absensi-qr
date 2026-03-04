<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,id',
            'teaching_id' => 'required|exists:teachings,id',
            'scanned_by' => 'nullable|exists:users,id',
            'attendance_date' => 'required|date',
            'check_in' => 'nullable|date',
            'status' => 'required|in:hadir,izin,sakit,alfa,telat',
            'late_minutes' => 'nullable|integer|min:0',
        ];
    }
}
