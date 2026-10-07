<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ComplaintController;
use App\Http\Controllers\Api\CitizenDashboardController;


Route::middleware('supabase.jwt')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/complaints', [ComplaintController::class, 'store']);
    Route::get('/citizen/dashboard' , [CitizenDashboardController:: class, 'index']);
});
