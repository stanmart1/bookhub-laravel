<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ReadingReminderNotification extends Notification
{
    use Queueable;

    public function __construct(public $message = 'Time to read!') {}

    public function via($notifiable)
    {
        return ['mail', 'broadcast'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Reading Reminder')
            ->line($this->message)
            ->action('Open BookHub', url('/'));
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'title' => 'Reading Reminder',
            'body' => $this->message,
        ]);
    }
} 