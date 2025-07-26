<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookmark extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'page_number',
        'chapter',
        'location',
        'note',
        'title',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    /**
     * Get the user that owns the bookmark.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that the bookmark is for.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Get the location description.
     */
    public function getLocationDescription(): string
    {
        if ($this->page_number) {
            return "Page {$this->page_number}";
        }
        
        if ($this->chapter) {
            return "Chapter {$this->chapter}";
        }
        
        return "Unknown location";
    }

    /**
     * Get the display title.
     */
    public function getDisplayTitle(): string
    {
        return $this->title ?: $this->getLocationDescription();
    }
}
