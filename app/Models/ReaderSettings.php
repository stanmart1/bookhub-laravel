<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReaderSettings extends Model
{
    protected $fillable = [
        'user_id',
        'font_family',
        'font_size',
        'line_height',
        'margins',
        'theme',
        'text_align',
        'reading_mode',
        'auto_save_progress',
        'show_progress_bar',
        'show_page_numbers',
        'show_toc',
        'advanced_settings',
    ];

    protected $casts = [
        'font_size' => 'integer',
        'line_height' => 'decimal:2',
        'auto_save_progress' => 'boolean',
        'show_progress_bar' => 'boolean',
        'show_page_numbers' => 'boolean',
        'show_toc' => 'boolean',
        'advanced_settings' => 'array',
    ];

    /**
     * Get the user that owns the settings.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get default settings.
     */
    public static function getDefaults(): array
    {
        return [
            'font_family' => 'Inter',
            'font_size' => 16,
            'line_height' => 1.5,
            'margins' => 'normal',
            'theme' => 'light',
            'text_align' => 'left',
            'reading_mode' => 'paginated',
            'auto_save_progress' => true,
            'show_progress_bar' => true,
            'show_page_numbers' => true,
            'show_toc' => true,
        ];
    }

    /**
     * Create or update settings for a user.
     */
    public static function updateForUser(int $userId, array $settings): self
    {
        return static::updateOrCreate(
            ['user_id' => $userId],
            $settings
        );
    }

    /**
     * Get settings for a user or create defaults.
     */
    public static function getForUser(int $userId): self
    {
        return static::firstOrCreate(
            ['user_id' => $userId],
            static::getDefaults()
        );
    }
}
