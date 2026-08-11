<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\B2bController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::post('/login', [AuthController::class, 'login']);

Route::prefix('public')->group(function () {
    Route::get('/brands', [PublicController::class, 'brands']);
    Route::get('/products', [PublicController::class, 'products']);
    Route::get('/pharmacies', [PublicController::class, 'pharmacies']);
    Route::get('/blog', [PublicController::class, 'blogPosts']);
});

// Protected B2B Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    
    Route::prefix('b2b')->group(function () {
        Route::get('/catalog', [B2bController::class, 'catalog']);
        Route::get('/orders', [B2bController::class, 'orders']);
        Route::post('/orders', [B2bController::class, 'storeOrder']);
        Route::get('/documents', [B2bController::class, 'documents']);
    });
});
