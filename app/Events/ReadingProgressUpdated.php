<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\ReadingProgress;

class ReadingProgressUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $progress;

    public function __construct(ReadingProgress $progress)
    {
        $this->progress = $progress;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->progress->user_id);
    }

    public function broadcastWith()
    {
        return [
            'book_id' => $this->progress->book_id,
            'current_page' => $this->progress->current_page,
            'total_pages' => $this->progress->total_pages,
            'updated_at' => $this->progress->updated_at,
        ];
    }
} 