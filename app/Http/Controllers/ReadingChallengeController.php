<?php

namespace App\Http\Controllers;

use App\Models\ReadingChallenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReadingChallengeController extends Controller
{
    public function index()
    {
        $challenges = ReadingChallenge::with('participants')->get();
        return view('reading_challenges.index', compact('challenges'));
    }

    public function create()
    {
        return view('reading_challenges.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'goal_books' => 'required|integer|min:1',
        ]);
        $challenge = ReadingChallenge::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'goal_books' => $request->goal_books,
            'created_by' => Auth::id(),
        ]);
        $challenge->participants()->attach(Auth::id(), ['books_read' => 0]);
        return redirect()->route('reading-challenges.show', $challenge);
    }

    public function show($id)
    {
        $challenge = ReadingChallenge::with('participants')->findOrFail($id);
        return view('reading_challenges.show', compact('challenge'));
    }

    public function join($id)
    {
        $challenge = ReadingChallenge::findOrFail($id);
        $challenge->participants()->syncWithoutDetaching([Auth::id() => ['books_read' => 0]]);
        return back();
    }

    public function updateProgress(Request $request, $id)
    {
        $challenge = ReadingChallenge::findOrFail($id);
        $request->validate(['books_read' => 'required|integer|min:0']);
        $challenge->participants()->updateExistingPivot(Auth::id(), ['books_read' => $request->books_read]);
        return back();
    }
} 