<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Highlight extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'page_number',
        'chapter',
        'location',
        'selected_text',
        'note',
        'color',
        'style',
        'position_data',
        'metadata',
    ];

    protected $casts = [
        'position_data' => 'array',
        'metadata' => 'array',
    ];

    /**
     * Get the user that owns the highlight.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the book that the highlight is for.
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
     * Get the text excerpt.
     */
    public function getTextExcerpt(int $length = 100): string
    {
        if (strlen($this->selected_text) <= $length) {
            return $this->selected_text;
        }
        
        return substr($this->selected_text, 0, $length) . '...';
    }
}
