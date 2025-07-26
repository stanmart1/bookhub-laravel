<?php

namespace App\Http\Controllers;

use App\Models\BookClub;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookClubController extends Controller
{
    public function index()
    {
        $clubs = BookClub::with('members')->get();
        return view('book_clubs.index', compact('clubs'));
    }

    public function create()
    {
        return view('book_clubs.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $club = BookClub::create([
            'name' => $request->name,
            'description' => $request->description,
            'owner_id' => Auth::id(),
        ]);
        $club->members()->attach(Auth::id());
        return redirect()->route('book-clubs.show', $club);
    }

    public function show($id)
    {
        $club = BookClub::with('members')->findOrFail($id);
        return view('book_clubs.show', compact('club'));
    }

    public function join($id)
    {
        $club = BookClub::findOrFail($id);
        $club->members()->syncWithoutDetaching([Auth::id()]);
        return back();
    }

    public function leave($id)
    {
        $club = BookClub::findOrFail($id);
        $club->members()->detach(Auth::id());
        return back();
    }
} 