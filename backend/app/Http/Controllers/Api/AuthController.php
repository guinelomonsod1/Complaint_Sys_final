<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController
{
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        /*
         * First-time Supabase user.
         *
         * The JWT has already been verified by
         * SupabaseJwtMiddleware.
         */
        if (! $user) {
            $supabaseUserId = $request->attributes->get(
                'supabase_user_id'
            );

            $payload = $request->attributes->get(
                'supabase_payload'
            );

            if (! $supabaseUserId || ! $payload) {
                return response()->json([
                    'message' =>
                        'Authenticated user could not be resolved.',
                ], 401);
            }

            $role = Role::where(
                'name',
                'Citizen'
            )->first();

            if (! $role) {
                return response()->json([
                    'message' =>
                        'Citizen role is not configured.',
                ], 500);
            }

            $email = $payload->email ?? null;

            $metadata = $payload->user_metadata ?? [];

            if (! is_array($metadata)) {
                $metadata = [];
            }

            $user = User::create([
                'supabase_user_id' => $supabaseUserId,
                'role_id' => $role->id,
                'barangay_id' => null,
                'department_id' => null,
                'first_name' => $metadata['first_name']
                    ?? $metadata['given_name']
                    ?? '',
                'middle_name' => null,
                'last_name' => $metadata['last_name']
                    ?? $metadata['family_name']
                    ?? '',
                'email' => $email ?? '',
                'phone' => null,
                'profile_image' => $metadata['avatar_url']
                    ?? $metadata['picture']
                    ?? null,
                'is_active' => true,
            ]);

            auth()->setUser($user);

            $user->load([
                'role',
                'barangay',
                'department',
            ]);

            return response()->json([
                'message' =>
                    'Account created successfully.',
                'needs_profile_setup' => true,
                'user' => $this->formatUser($user),
            ]);
        }

        $user->load([
            'role',
            'barangay',
            'department',
        ]);

        return response()->json([
            'message' =>
                'Authenticated successfully.',
            'needs_profile_setup' =>
                $user->role?->name === 'Citizen' &&
                (
                    ! $user->barangay_id ||
                    ! $user->phone ||
                    ! $user->first_name ||
                    ! $user->last_name
                ),
            'user' => $this->formatUser($user),
        ]);
    }

    private function formatUser(User $user): array
    {
        return [
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
        ];
    }
}