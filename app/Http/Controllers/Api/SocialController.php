<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\BookClub;
use App\Models\ReadingChallenge;
use App\Models\SocialHighlight;
use App\Models\UserReview;

class SocialController extends Controller
{
    public function getBookClubs()
    {
        $clubs = BookClub::with('members')->get();
        return response()->json(['clubs' => $clubs]);
    }

    public function createBookClub(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|nullable',
        ]);

        $user = Auth::user();

        $club = BookClub::create([
            'name' => $request->name,
            'description' => $request->description,
            'owner_id' => $user->id,
        ]);

        $club->members()->attach($user->id);

        return response()->json(['club' => $club], 201);
    }

    public function joinClub(Request $request, BookClub $club)
    {
        $user = Auth::user();
        $club->members()->syncWithoutDetaching([$user->id]);
        return response()->json(['message' => 'Successfully joined the club.']);
    }

    public function getReadingChallenges()
    {
        return ReadingChallenge::with('participants')->get();
    }

    public function createReadingChallenge(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        return ReadingChallenge::create($request->all());
    }

    public function joinChallenge(Request $request, ReadingChallenge $challenge)
    {
        $user = Auth::user();
        $challenge->participants()->syncWithoutDetaching([$user->id]);
        return response()->json(['message' => 'Successfully joined the challenge.']);
    }

    public function getSocialHighlights()
    {
        return SocialHighlight::with('user', 'highlight.book')->get();
    }

    public function createSocialHighlight(Request $request)
    {
        $request->validate([
            'highlight_id' => 'required|exists:highlights,id',
            'comment' => 'string|nullable',
        ]);

        $user = Auth::user();

        return SocialHighlight::create([
            'user_id' => $user->id,
            'highlight_id' => $request->highlight_id,
            'comment' => $request->comment,
        ]);
    }

    public function getBookReviews(Request $request, $bookId)
    {
        return UserReview::where('book_id', $bookId)->with('user')->get();
    }

    public function createBookReview(Request $request, $bookId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'string|nullable',
        ]);

        $user = Auth::user();

        return UserReview::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'rating' => $request->rating,
            'review' => $request->review,
        ]);
    }

    public function getBookDiscussions(Request $request, $bookId)
    {
        return response()->json(['message' => 'Not implemented yet.']);
    }

    public function createBookDiscussion(Request $request, $bookId)
    {
        return response()->json(['message' => 'Not implemented yet.']);
    }

    public function getActivityFeed()
    {
        return response()->json(['message' => 'Not implemented yet.']);
    }

    public function getFriendsReading()
    {
        return response()->json(['message' => 'Not implemented yet.']);
    }

    public function getReadingBuddies()
    {
        return response()->json(['message' => 'Not implemented yet.']);
    }
}
