<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class NotificationController extends Controller
{
    public function getNotifications(Request $request)
    {
        $user = $request->user();
        return response()->json($user->notifications);
    }

    public function markAsRead(Request $request)
    {
        $user = $request->user();
        $user->unreadNotifications->markAsRead();
        return response()->json(['message' => 'Notifications marked as read.']);
    }

    public function getSettings(Request $request)
    {
        $user = $request->user();
        return response()->json($user->notificationSettings);
    }

    public function updateSettings(Request $request)
    {
        $user = $request->user();
        $user->notificationSettings()->update($request->all());
        return response()->json(['message' => 'Settings updated successfully.']);
    }
}
