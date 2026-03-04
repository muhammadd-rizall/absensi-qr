<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
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
            'nis' => 'required|string|max:50|unique:students,nis,' . ($this->student ? $this->student->id : 'NULL'),
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'barcode_code' => 'nullable|string|max:255|unique:students,barcode_code,' . ($this->student ? $this->student->id : 'NULL'),
            'status' => 'nullable|string',
        ];
    }
}
