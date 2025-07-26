<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ReaderSetting;

class ReaderSettingsController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();
        $settings = ReaderSetting::where('user_id', $user->id)->first();
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $data = $request->only(['font', 'font_size', 'theme', 'line_height', 'background_color', 'extra']);
        $settings = ReaderSetting::updateOrCreate(
            ['user_id' => $user->id],
            $data
        );
        return response()->json($settings);
    }
}
