<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class ReadingProgress extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'current_page',
        'total_pages',
        'current_chapter',
        'progress_percentage',
        'time_spent_seconds',
        'last_read_at',
        'is_completed',
        'reading_session_data',
    ];

    protected $casts = [
        'progress_percentage' => 'decimal:2',
        'time_spent_seconds' => 'integer',
        'last_read_at' => 'datetime',
        'is_completed' => 'boolean',
        'reading_session_data' => 'array',
    ];

    /**
     * Get the user that owns the reading progress.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that the progress is for.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Calculate progress percentage.
     */
    public function calculateProgress(): float
    {
        if ($this->total_pages > 0) {
            return round(($this->current_page / $this->total_pages) * 100, 2);
        }
        
        return 0;
    }

    /**
     * Update progress and save.
     */
    public function updateProgress(int $currentPage = null, string $currentChapter = null): void
    {
        if ($currentPage !== null) {
            $this->current_page = $currentPage;
        }
        
        if ($currentChapter !== null) {
            $this->current_chapter = $currentChapter;
        }
        
        $this->progress_percentage = $this->calculateProgress();
        $this->last_read_at = now();
        $this->save();
    }

    /**
     * Add reading time in seconds.
     */
    public function addReadingTime(int $seconds): void
    {
        $this->time_spent_seconds += $seconds;
        $this->save();
    }

    /**
     * Mark as completed.
     */
    public function markAsCompleted(): void
    {
        $this->is_completed = true;
        $this->progress_percentage = 100.00;
        $this->last_read_at = now();
        $this->save();
    }

    protected static function booted()
    {
        static::created(function ($progress) {
            Log::info('Reading progress created', [
                'user_id' => $progress->user_id,
                'book_id' => $progress->book_id,
                'current_page' => $progress->current_page,
                'current_chapter' => $progress->current_chapter,
                'progress_percentage' => $progress->progress_percentage,
                'timestamp' => now(),
                'device' => request()->header('User-Agent'),
            ]);
        });
        
        static::updated(function ($progress) {
            Log::info('Reading progress updated', [
                'user_id' => $progress->user_id,
                'book_id' => $progress->book_id,
                'current_page' => $progress->current_page,
                'current_chapter' => $progress->current_chapter,
                'progress_percentage' => $progress->progress_percentage,
                'timestamp' => now(),
                'device' => request()->header('User-Agent'),
            ]);
        });
    }
}
