<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, $permission): Response
    {
        $user = $request->user();
        if (!$user || !$user->permissions()->where('name', $permission)->exists()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        return $next($request);
    }
}
