<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permissions extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'slug',
        'group'
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Roles::class, 'role_has_permissions', 'permission_id', 'role_id')->withTimestamps();
    }

    public function scopeByGroup($query, string $group)
    {
        return $query->where('group', $group);
    }
}
