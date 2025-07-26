<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user();
        if (!$user || !$user->roles()->where('name', $role)->exists()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        return $next($request);
    }
}
