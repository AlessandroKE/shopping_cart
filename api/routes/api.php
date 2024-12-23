<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::apiResource('products', ProductController::class);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/cart', [CartController::class, 'index']);
    Route::delete('/cart', [CartController::class, 'destroy']);
    Route::post('/cart', [CartController::class, 'add']);
    Route::put('/cart', [CartController::class, 'update']);
    Route::delete('/cart/{productId}', [CartController::class, 'remove']);

    Route::resource('orders', OrderController::class);
});