<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CitizenDashboardController extends Controller
{
    public function index (Request $request): JsonResponse {


        $user = $request->user();

        $query = Complaint::query()
            ->where('citizen_id', $user->id);

        $total = (clone $query)->count();

        $submitted = (clone $query)
            ->where('status', 'SUBMITTED')
            ->count();

        $inProgress = (clone $query)
            ->where('status', 'IN_PROGRESS')
            ->count();

        $resolved = (clone $query)
            ->where('status', 'RESOLVED')
            ->count();

        $recentComplaint = (clone $query)
            ->with([
                'barangay', 'category', 'priority'
            ])
            ->latest('submitted_at')
            ->limit(5)
            ->get()
            ->map(function (Complaint $complaint) {
                return [
                    'id' =>$complaint->id,
                    'tracking_number' =>$complaint->tracking_number,
                    'subject' =>$complaint->subject,
                    'status' =>$complaint->status,
                    'category' =>$complaint->category,
                    'submitted_at' =>$complaint->submitted_at,
                ];
            });

            return response()->json([
                'statistics' => [
                    'total' => $total,
                    'submitted' =>$submitted,
                    'resolved' =>$resolved,
                    'in_progress' =>$inProgress,   
                ],
                'recent_complaints' =>$recentComplaints,
            ]);
    }
}
