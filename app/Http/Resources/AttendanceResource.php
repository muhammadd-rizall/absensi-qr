<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student' => new StudentResource($this->whenLoaded('student')),
            'teaching_id' => $this->teaching_id,
            'scanned_by' => $this->scanned_by,
            'attendance_date' => $this->attendance_date,
            'check_in' => $this->check_in,
            'status' => $this->status,
            'late_minutes' => $this->late_minutes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
