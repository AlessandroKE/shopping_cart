<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'imageUrl', 'slug'];

    /**
     * Boot the model to automatically generate the slug.
     */
    protected static function booted()
    {
        static::creating(function ($product) {
            // Generate a slug using the product's name and the current epoch timestamp
            $slug = Str::slug($product->name) . '_' . (string) Str::uuid();
            $product->slug = $slug;
        });
    }

    protected $casts = [
        'price'=>'decimal:2'
    ];
}