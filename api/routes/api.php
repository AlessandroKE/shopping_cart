<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::apiResource('products', ProductController::class);
Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);
