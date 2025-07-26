<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadingSession extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'started_at',
        'ended_at',
        'duration_seconds',
        'pages_read',
        'start_page',
        'end_page',
        'device_info',
        'ip_address',
        'session_data',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'duration_seconds' => 'integer',
        'pages_read' => 'integer',
        'start_page' => 'integer',
        'end_page' => 'integer',
        'session_data' => 'array',
    ];

    /**
     * Get the user that owns the reading session.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that the session is for.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Start a new reading session.
     */
    public static function start(int $userId, int $bookId, int $startPage = null): self
    {
        return static::create([
            'user_id' => $userId,
            'book_id' => $bookId,
            'started_at' => now(),
            'start_page' => $startPage,
            'device_info' => request()->header('User-Agent'),
            'ip_address' => request()->ip(),
        ]);
    }

    /**
     * End the reading session.
     */
    public function end(int $endPage = null): void
    {
        $this->ended_at = now();
        $this->end_page = $endPage;
        $this->duration_seconds = $this->started_at->diffInSeconds($this->ended_at);
        
        if ($this->start_page && $this->end_page) {
            $this->pages_read = $this->end_page - $this->start_page + 1;
        }
        
        $this->save();
    }

    /**
     * Get the session duration in a readable format.
     */
    public function getDurationFormatted(): string
    {
        $hours = floor($this->duration_seconds / 3600);
        $minutes = floor(($this->duration_seconds % 3600) / 60);
        $seconds = $this->duration_seconds % 60;

        if ($hours > 0) {
            return sprintf('%dh %dm %ds', $hours, $minutes, $seconds);
        } elseif ($minutes > 0) {
            return sprintf('%dm %ds', $minutes, $seconds);
        } else {
            return sprintf('%ds', $seconds);
        }
    }

    /**
     * Get reading speed (pages per hour).
     */
    public function getReadingSpeed(): float
    {
        if ($this->duration_seconds > 0 && $this->pages_read > 0) {
            return round(($this->pages_read / $this->duration_seconds) * 3600, 2);
        }
        
        return 0;
    }
}
