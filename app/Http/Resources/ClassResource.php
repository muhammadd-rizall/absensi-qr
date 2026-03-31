<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if (!$this->resource) {
            return [];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'level' => $this->level,
            'room' => $this->room,
            'students_count' => $this->students()->count(), // Use the new students relationship
            'academic_year' => new AcademicYearResource($this->whenLoaded('academicYear')),
            'homeroom_teacher' => new TeacherResource($this->whenLoaded('homeroomTeacher')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'students' => ClassResource::collection($this->whenLoaded('students')), // Explicitly load students relationship
        ];
    }
}
