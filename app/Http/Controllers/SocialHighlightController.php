<?php

namespace App\Http\Controllers;

use App\Models\SocialHighlight;
use App\Models\BookClub;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SocialHighlightController extends Controller
{
    public function index($bookId)
    {
        $highlights = SocialHighlight::where('book_id', $bookId)
            ->whereNull('shared_with_club_id')
            ->get();
        return view('social_highlights.index', compact('highlights', 'bookId'));
    }

    public function store(Request $request, $bookId)
    {
        $request->validate([
            'content' => 'required|string',
            'page_number' => 'nullable|integer',
            'color' => 'nullable|string',
            'shared_with_club_id' => 'nullable|exists:book_clubs,id',
        ]);
        SocialHighlight::create([
            'user_id' => Auth::id(),
            'book_id' => $bookId,
            'content' => $request->content,
            'page_number' => $request->page_number,
            'color' => $request->color,
            'shared_with_club_id' => $request->shared_with_club_id,
        ]);
        return back();
    }

    public function clubHighlights($clubId, $bookId)
    {
        $club = BookClub::findOrFail($clubId);
        $highlights = SocialHighlight::where('book_id', $bookId)
            ->where('shared_with_club_id', $clubId)
            ->get();
        return view('social_highlights.club', compact('highlights', 'club', 'bookId'));
    }
} 