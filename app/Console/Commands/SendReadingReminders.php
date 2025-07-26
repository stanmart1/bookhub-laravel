<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\UserEvent;
use App\Notifications\ReadingReminderNotification;

class SendReadingReminders extends Command
{
    protected $signature = 'reminders:send-reading';
    protected $description = 'Send reading reminders to inactive users';

    public function handle()
    {
        $users = User::all();
        foreach ($users as $user) {
            $lastRead = UserEvent::where('user_id', $user->id)
                ->where('event_type', 'reading_activity')
                ->orderByDesc('created_at')
                ->first();
            if (!$lastRead || $lastRead->created_at < now()->subDays(3)) {
                $user->notify(new ReadingReminderNotification());
            }
        }
        $this->info('Reading reminders sent.');
    }
} 