<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class BookReleaseNotification extends Notification
{
    use Queueable;

    public function __construct(public $bookTitle)
    {
    }

    public function via($notifiable)
    {
        return ['mail', 'broadcast'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Book Release!')
            ->line('A new book has been released: ' . $this->bookTitle)
            ->action('View Book', url('/'));
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'title' => 'New Book Release!',
            'body' => 'A new book has been released: ' . $this->bookTitle,
        ]);
    }
} 