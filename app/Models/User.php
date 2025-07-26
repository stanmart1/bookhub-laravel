<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'preferences',
        'notification_settings',
        'two_factor_enabled',
        // Add sync fields
        'is_sync_enabled',
        'last_sync_at',
        'ui_preferences',
        'notification_preferences',
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
            'preferences' => 'array',
            'notification_settings' => 'array',
            'two_factor_enabled' => 'boolean',
            'is_sync_enabled' => 'boolean',
            'last_sync_at' => 'datetime',
            'ui_preferences' => 'array',
            'notification_preferences' => 'array',
        ];
    }

    /**
     * Get user preferences with defaults
     */
    public function getPreferencesAttribute($value)
    {
        $defaults = [
            'language' => 'en',
            'theme' => 'light',
            'emailNotifications' => true,
            'pushNotifications' => false,
            'marketingEmails' => false,
            'publicProfile' => false,
            'showReadingProgress' => true,
            'allowRecommendations' => true,
        ];

        $preferences = json_decode($value, true) ?: [];
        return array_merge($defaults, $preferences);
    }

    /**
     * Get notification settings with defaults
     */
    public function getNotificationSettingsAttribute($value)
    {
        $defaults = [
            'emailNotifications' => true,
            'pushNotifications' => false,
            'orderUpdates' => true,
            'newBooks' => false,
            'achievements' => true,
            'systemUpdates' => true,
        ];

        $settings = json_decode($value, true) ?: [];
        return array_merge($defaults, $settings);
    }

    // Admin: Enable/disable sync for user
    public function enableSync() { $this->is_sync_enabled = true; $this->save(); }
    public function disableSync() { $this->is_sync_enabled = false; $this->save(); }
    public function logSync() { $this->last_sync_at = now(); $this->save(); }

    // RBAC relationships
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions');
    }

    public function languagePreference()
    {
        return $this->hasOne(LanguagePreference::class);
    }

    public function achievements()
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements')->withTimestamps();
    }

    public function rewards()
    {
        return $this->belongsToMany(Reward::class, 'user_rewards')->withTimestamps();
    }

    /**
     * Check if the user has a given permission (direct or via roles).
     */
    public function hasPermission($permissionName)
    {
        if ($this->permissions()->where('name', $permissionName)->exists()) {
            return true;
        }
        foreach ($this->roles as $role) {
            if ($role->getAllPermissions()->where('name', $permissionName)->count()) {
                return true;
            }
        }
        return false;
    }
}
