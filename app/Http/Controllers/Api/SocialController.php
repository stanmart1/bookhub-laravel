<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\BookClub;

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
}
