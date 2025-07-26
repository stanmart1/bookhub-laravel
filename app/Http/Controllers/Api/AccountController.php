<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class AccountController extends Controller
{
    /**
     * Update user profile information
     */
    public function updateProfile(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'name' => 'required|string|max:255|min:2',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'phone' => 'nullable|string|max:32|regex:/^[\+]?[1-9][\d]{0,15}$/',
            ], [
                'name.min' => 'Name must be at least 2 characters long.',
                'phone.regex' => 'Please enter a valid phone number.',
            ]);

            $user->update($data);
            
            Log::info('User profile updated', [
                'user_id' => $user->id,
                'updated_fields' => array_keys($data)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'user' => $user->only(['id', 'name', 'email', 'phone'])
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Profile update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile. Please try again.'
            ], 500);
        }
    }

    /**
     * Update user preferences
     */
    public function updatePreferences(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'language' => 'required|string|in:en,es,fr,de,pt,ar,zh,ja,ko',
                'theme' => 'required|string|in:light,dark,auto',
                'emailNotifications' => 'boolean',
                'pushNotifications' => 'boolean',
                'marketingEmails' => 'boolean',
                'publicProfile' => 'boolean',
                'showReadingProgress' => 'boolean',
                'allowRecommendations' => 'boolean',
            ]);

            // Store preferences as JSON in the database
            $user->preferences = array_merge($user->preferences ?? [], $data);
            $user->save();

            Log::info('User preferences updated', [
                'user_id' => $user->id,
                'updated_preferences' => array_keys($data)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Preferences updated successfully',
                'preferences' => $user->preferences
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Preferences update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update preferences. Please try again.'
            ], 500);
        }
    }

    /**
     * Update user password with security logging
     */
    public function updatePassword(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'currentPassword' => 'required|string',
                'newPassword' => 'required|string|min:8|max:255|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/',
                'newPassword_confirmation' => 'required|same:newPassword',
            ], [
                'newPassword.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'newPassword_confirmation.same' => 'Password confirmation does not match.',
            ]);

            if (!Hash::check($data['currentPassword'], $user->password)) {
                Log::warning('Failed password change attempt - incorrect current password', [
                    'user_id' => $user->id,
                    'ip' => $request->ip()
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect.'
                ], 422);
            }

            $user->password = Hash::make($data['newPassword']);
            $user->save();

            Log::info('User password changed successfully', [
                'user_id' => $user->id,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password updated successfully'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Password update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update password. Please try again.'
            ], 500);
        }
    }

    /**
     * Toggle two-factor authentication
     */
    public function toggleTwoFactor(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'enabled' => 'required|boolean',
            ]);

            $enabled = $data['enabled'];
            $user->two_factor_enabled = $enabled;
            $user->save();

            Log::info('Two-factor authentication ' . ($enabled ? 'enabled' : 'disabled'), [
                'user_id' => $user->id,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Two-factor authentication ' . ($enabled ? 'enabled' : 'disabled') . ' successfully',
                'two_factor_enabled' => $enabled
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Two-factor toggle failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update two-factor authentication. Please try again.'
            ], 500);
        }
    }

    /**
     * Update notification settings
     */
    public function updateNotificationSettings(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'emailNotifications' => 'boolean',
                'pushNotifications' => 'boolean',
                'orderUpdates' => 'boolean',
                'newBooks' => 'boolean',
                'achievements' => 'boolean',
                'systemUpdates' => 'boolean',
            ]);

            $user->notification_settings = array_merge($user->notification_settings ?? [], $data);
            $user->save();

            Log::info('Notification settings updated', [
                'user_id' => $user->id,
                'updated_settings' => array_keys($data)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Notification settings updated successfully',
                'notification_settings' => $user->notification_settings
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Notification settings update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notification settings. Please try again.'
            ], 500);
        }
    }

    /**
     * Mark notifications as read
     */
    public function markNotificationsAsRead(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'notification_ids' => 'required|array',
                'notification_ids.*' => 'integer|exists:notifications,id,user_id,' . $user->id,
                'mark_all' => 'boolean',
            ]);

            if (!empty($data['mark_all'])) {
                \DB::table('notifications')
                    ->where('user_id', $user->id)
                    ->update(['read_at' => now()]);
            } else {
                \DB::table('notifications')
                    ->where('user_id', $user->id)
                    ->whereIn('id', $data['notification_ids'])
                    ->update(['read_at' => now()]);
            }

            Log::info('Notifications marked as read', [
                'user_id' => $user->id,
                'notification_count' => count($data['notification_ids'] ?? []),
                'mark_all' => $data['mark_all'] ?? false
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Notifications marked as read successfully'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Mark notifications as read failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark notifications as read. Please try again.'
            ], 500);
        }
    }

    /**
     * Update subscription plan
     */
    public function updatePlan(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'plan_id' => 'required|integer|exists:subscription_plans,id',
                'payment_method_id' => 'required|string',
            ]);

            // TODO: Implement actual billing logic with payment gateway
            Log::info('Subscription plan change requested', [
                'user_id' => $user->id,
                'plan_id' => $data['plan_id'],
                'payment_method_id' => $data['payment_method_id']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Plan update initiated successfully',
                'plan_id' => $data['plan_id']
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Plan update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update plan. Please try again.'
            ], 500);
        }
    }

    /**
     * Add payment method
     */
    public function addPaymentMethod(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $data = $request->validate([
                'payment_method_type' => 'required|string|in:card,bank_transfer',
                'payment_token' => 'required|string',
                'is_default' => 'boolean',
            ]);

            // TODO: Implement actual payment method addition logic
            Log::info('Payment method addition requested', [
                'user_id' => $user->id,
                'payment_method_type' => $data['payment_method_type'],
                'is_default' => $data['is_default'] ?? false
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment method added successfully',
                'payment_method_id' => 'pm_' . uniqid()
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Payment method addition failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to add payment method. Please try again.'
            ], 500);
        }
    }
} 