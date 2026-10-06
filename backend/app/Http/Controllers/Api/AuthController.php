<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController
{
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load([
            'role',
            'barangay',
            'department',
        ]);

        return response()->json([
            'message' => 'Authenticated successfully.',
            'user' => [
                'id' => $user->id,
                'supabase_user_id' => $user->supabase_user_id,
                'role' => $user->role?->name,
                'barangay' => $user->barangay?->name,
                'department' => $user->department?->name,
                'first_name' => $user->first_name,
                'middle_name' => $user->middle_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'profile_image' => $user->profile_image,
                'is_active' => $user->is_active,
            ],
        ]);
    }
}