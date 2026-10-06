<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Closure;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SupabaseJwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $authorization = $request->header('Authorization');

        if (! $authorization || ! str_starts_with($authorization, 'Bearer ')) {
            return response()->json([
                'message' => 'Authentication required.',
            ], 401);
        }

        $token = trim(substr($authorization, 7));

        if ($token === '') {
            return response()->json([
                'message' => 'Authentication required.',
            ], 401);
        }

        try {
            $supabaseUrl = rtrim((string) config('services.supabase.url'), '/');
            $audience = (string) config('services.supabase.jwt_audience', 'authenticated');

            if ($supabaseUrl === '') {
                return response()->json([
                    'message' => 'Supabase authentication is not configured.',
                ], 500);
            }

            $jwksUrl = $supabaseUrl . '/auth/v1/.well-known/jwks.json';

            $jwksResponse = file_get_contents($jwksUrl);

            if ($jwksResponse === false) {
                return response()->json([
                    'message' => 'Unable to retrieve Supabase signing keys.',
                ], 503);
            }

            $jwks = json_decode($jwksResponse, true);

            if (! is_array($jwks) || ! isset($jwks['keys'])) {
                return response()->json([
                    'message' => 'Invalid Supabase signing-key response.',
                ], 503);
            }

            $payload = JWT::decode(
                $token,
                JWK::parseKeySet($jwks)
            );

            $issuer = $supabaseUrl . '/auth/v1';

            if (($payload->iss ?? null) !== $issuer) {
                return response()->json([
                    'message' => 'Invalid token issuer.',
                ], 401);
            }

            if (($payload->aud ?? null) !== $audience) {
                return response()->json([
                    'message' => 'Invalid token audience.',
                ], 401);
            }

            $supabaseUserId = $payload->sub ?? null;

            if (! is_string($supabaseUserId) || $supabaseUserId === '') {
                return response()->json([
                    'message' => 'Invalid token subject.',
                ], 401);
            }

         $user = User::where('supabase_user_id', $supabaseUserId)
    ->where('is_active', true)
    ->first();

if (! $user) {
    return response()->json([
        'message' => 'User account is not registered or inactive.',
    ], 403);
}

Auth::setUser($user);

return $next($request);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Invalid or expired authentication token.',
            ], 401);
        }
    }
}