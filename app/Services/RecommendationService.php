<?php

namespace App\Services;

use App\Models\User;
use App\Models\Book;
use App\Models\RecommendationScore;
use App\Models\UserEvent;

class RecommendationService
{
    /**
     * Generate recommendations for a user.
     */
    public function generateForUser(User $user)
    {
        // Collaborative filtering: recommend books viewed/read by similar users
        $viewedBookIds = UserEvent::where('user_id', $user->id)
            ->where('event_type', 'book_view')
            ->pluck('event_data');
        $viewedBookIds = $viewedBookIds->map(function ($data) {
            $arr = json_decode($data, true);
            return $arr['book_id'] ?? null;
        })->filter()->unique();

        $similarUserIds = UserEvent::where('event_type', 'book_view')
            ->whereIn('event_data', $viewedBookIds->map(fn($id) => json_encode(['book_id' => $id])))
            ->where('user_id', '!=', $user->id)
            ->pluck('user_id')->unique();

        $collabBookIds = UserEvent::where('event_type', 'book_view')
            ->whereIn('user_id', $similarUserIds)
            ->pluck('event_data')->map(function ($data) {
                $arr = json_decode($data, true);
                return $arr['book_id'] ?? null;
            })->filter()->unique();

        // Content-based: recommend books in the same categories as user's viewed books
        $userBooks = Book::whereIn('id', $viewedBookIds)->get();
        $categories = $userBooks->pluck('category_id')->unique();
        $contentBookIds = Book::whereIn('category_id', $categories)
            ->whereNotIn('id', $viewedBookIds)
            ->pluck('id');

        // Merge and score
        $recommendIds = $collabBookIds->merge($contentBookIds)->unique();
        foreach ($recommendIds as $bookId) {
            $score = 1;
            $reason = 'collaborative';
            if ($contentBookIds->contains($bookId)) {
                $score += 0.5;
                $reason = 'content';
            }
            RecommendationScore::updateOrCreate(
                ['user_id' => $user->id, 'book_id' => $bookId],
                ['score' => $score, 'reason' => $reason]
            );
        }
    }
} 