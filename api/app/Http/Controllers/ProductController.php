<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::all());
    }


    public function show(Product $product)
    {
        return new ProductResource($product);
    }
    public function showBySlug($slug)
    {
        $product = Product::where('slug', '=', $slug)->firstOrFail();
        return new ProductResource($product);
    }

    
}
