<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class ExtendedRecommendationController extends Controller
{
    public function getPersonalized()
    {
        return response()->json(['recommendations' => Book::inRandomOrder()->limit(5)->get()]);
    }

    public function getSimilar(Book $book)
    {
        return response()->json(['recommendations' => Book::where('id', '!=', $book->id)->inRandomOrder()->limit(3)->get()]);
    }

    public function getByGenre($genre)
    {
        return response()->json(['recommendations' => Book::where('genre', $genre)->inRandomOrder()->limit(5)->get()]);
    }

    public function getByAuthor($author)
    {
        return response()->json(['recommendations' => Book::where('author', $author)->inRandomOrder()->limit(5)->get()]);
    }

    public function getByMood($mood)
    {
        // This is a placeholder for the mood-based recommendation logic
        return response()->json(['recommendations' => Book::inRandomOrder()->limit(5)->get()]);
    }

    public function provideFeedback(Request $request)
    {
        // This is a placeholder for the feedback logic
        return response()->json(['message' => 'Feedback received.']);
    }
}
