<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the roles of the user.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Roles::class, 'user_has_roles', 'user_id', 'role_id')->withTimestamps();
    }

    public function teacher(): HasOne
    {
        return $this->hasOne(Teachers::class, 'user_id');
    }

    public function scannedAttendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'scanned_by');
    }

    /**
     * Check if user has a specific permission through their role.
     *
     * @param string $permissionSlug
     * @return bool
     */
    public function hasPermission(string $permissionSlug): bool
    {
        // Super Admin bypass
        if ($this->hasRole('super-admin')) {
            return true;
        }

        return $this->roles()
            ->whereHas('permissions', fn ($query) => $query->where('slug', $permissionSlug))
            ->exists();
    }

    /**
     * Check if user has a specific role.
     *
     * @param string $roleSlug
     * @return bool
     */
    public function hasRole(string $roleSlug): bool
    {
        return $this->roles()->where('slug', $roleSlug)->exists();
    }
}
