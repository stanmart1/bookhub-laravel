<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Highlight;

class HighlightController extends Controller
{
    // Get highlights for a book
    public function getHighlights($bookId)
    {
        $user = Auth::user();
        $highlights = Highlight::where('user_id', $user->id)->where('book_id', $bookId)->get();
        return response()->json($highlights);
    }

    // Add a highlight
    public function addHighlight(Request $request, $bookId)
    {
        $user = Auth::user();
        $request->validate([
            'content' => 'required|string',
            'page_number' => 'nullable|integer',
            'color' => 'nullable|string',
        ]);
        $highlight = Highlight::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'content' => $request->content,
            'page_number' => $request->page_number,
            'color' => $request->color,
        ]);
        return response()->json($highlight);
    }

    // Remove a highlight
    public function removeHighlight($id)
    {
        $user = Auth::user();
        $highlight = Highlight::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $highlight->delete();
        return response()->json(['message' => 'Highlight removed.']);
    }
}
