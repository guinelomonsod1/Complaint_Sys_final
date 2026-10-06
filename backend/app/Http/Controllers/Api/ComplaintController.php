<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComplaintRequest;
use App\Models\Complaint;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ComplaintController extends Controller
{
    public function store(StoreComplaintRequest $request): JsonResponse
{
$user = Auth::user();
    if (! $user) {
        return response()->json([
            'message' => 'Authenticated user could not be resolved.',
        ], 401);
    }

    if ($user->role?->name !== 'Citizen') {
        return response()->json([
            'message' => 'Only citizens can submit complaints.',
        ], 403);
    }

    if (! $user->barangay_id) {
        return response()->json([
            'message' => 'Your account is not assigned to a barangay.',
        ], 422);
    }


        $complaint = DB::transaction(function () use ($request, $user) {
            do {
                $trackingNumber = 'CMP-' .
                    now()->format('Ymd') .
                    '-' .
                    strtoupper(Str::random(6));
            } while (
                Complaint::where('tracking_number', $trackingNumber)->exists()
            );

            return Complaint::create([
                'tracking_number' => $trackingNumber,
                'citizen_id' => $user->id,
                'barangay_id' => $user->barangay_id,
                'department_id' => null,
                'category_id' => $request->integer('category_id'),
                'priority_id' => null,
                'subject' => $request->string('subject')->toString(),
                'description' => $request->string('description')->toString(),
                'location' => $request->input('location'),
                'status' => 'SUBMITTED',
                'submitted_at' => now(),
                'resolved_at' => null,
            ]);
        });

        $complaint->load([
            'category',
            'barangay',
            'priority',
        ]);

        return response()->json([
            'message' => 'Complaint submitted successfully.',
            'complaint' => [
                'id' => $complaint->id,
                'tracking_number' => $complaint->tracking_number,
                'subject' => $complaint->subject,
                'description' => $complaint->description,
                'location' => $complaint->location,
                'status' => $complaint->status,
                'submitted_at' => $complaint->submitted_at,
                'category' => $complaint->category?->name,
                'barangay' => $complaint->barangay?->name,
                'priority' => $complaint->priority?->name,
            ],
        ], 201);
    }
}