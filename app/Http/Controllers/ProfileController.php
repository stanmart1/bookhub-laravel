<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    // Show preferences form
    public function preferences()
    {
        $user = Auth::user();
        return view('account.preferences', compact('user'));
    }

    // Update email
    public function updateEmail(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);
        $user->email = $request->email;
        $user->save();
        return back()->with('success', 'Email updated.');
    }

    // Update password
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user->password = Hash::make($request->password);
        $user->save();
        return back()->with('success', 'Password updated.');
    }

    public function updateUIPreferences(Request $request)
    {
        $user = Auth::user();
        $data = $request->only(['theme', 'font_size', 'layout']);
        $user->ui_preferences = array_merge($user->ui_preferences ?? [], $data);
        $user->save();
        return back()->with('success', 'UI preferences updated.');
    }

    public function language()
    {
        $user = Auth::user();
        $preference = $user->languagePreference->language_code ?? app()->getLocale();
        return view('account.language', compact('user', 'preference'));
    }

    public function updateLanguage(Request $request)
    {
        $user = Auth::user();
        $request->validate(['language_code' => 'required|string|max:10']);
        $user->languagePreference()->updateOrCreate([], [
            'language_code' => $request->language_code
        ]);
        app()->setLocale($request->language_code);
        return back()->with('success', 'Language updated.');
    }
}
