<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class NotificationPreferenceController extends Controller
{
    public function edit()
    {
        $user = Auth::user();
        $prefs = $user->notification_preferences ?? [
            'reading_reminders' => true,
            'book_releases' => true,
        ];
        return view('account.notifications', compact('prefs'));
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $prefs = [
            'reading_reminders' => $request->has('reading_reminders'),
            'book_releases' => $request->has('book_releases'),
        ];
        $user->notification_preferences = $prefs;
        $user->save();
        return back()->with('success', 'Notification preferences updated.');
    }
} 