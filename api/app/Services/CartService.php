<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;

class CartService
{
    private string $prefix = 'cart:';
    
    private function getCartKey(): string
    {
        return $this->prefix . Auth::id();
    }

    public function addItem(int $productId, int $quantity = 1): bool
    {
        $product = Product::find($productId);
        
        if (!$product) {
            throw new \Exception('Product not found');
        }

        $cartKey = $this->getCartKey();
        $currentQuantity = Redis::hget($cartKey, $productId) ?? 0;
        
        return Redis::hset($cartKey, $productId, $currentQuantity + $quantity);
    }

    public function updateItem(int $productId, int $quantity): bool
    {
        $product = Product::find($productId);
        
        if (!$product) {
            throw new \Exception('Product not found');
        }

        if ($quantity <= 0) {
            return $this->removeItem($productId);
        }

        return Redis::hset($this->getCartKey(), $productId, $quantity);
    }

    public function removeItem(int $productId): bool
    {
        return Redis::hdel($this->getCartKey(), $productId) > 0;
    }

    public function getCart(): array
    {
        $cartKey = $this->getCartKey();
        $cartItems = Redis::hgetall($cartKey);
        $cart = [];

        foreach ($cartItems as $productId => $quantity) {
            $product = Product::find($productId);
            
            if (!$product) {
                $this->removeItem($productId);
                continue;
            }

            $cart[] = [
                'product_id' => $productId,
                'quantity' => (int)$quantity,
                'name' => $product->name,
                'price' => (float) $product->price,
                'image_url' => $product->image_url,
                'slug' => $product->slug,
            ];
        }

        return $cart;
    }

    public function getItems(): array
    {
        $cartKey = $this->getCartKey();
        $cartItems = Redis::hgetall($cartKey);
        $cart = [];

        foreach ($cartItems as $productId => $quantity) {
            $product = Product::find($productId);
            
            if (!$product) {
                $this->removeItem($productId);
                continue;
            }

            $cart[] = [
                'product_id' => $productId,
                'quantity' => (int)$quantity,
                'price' => $product->price,
            ];
        }

        return $cart;
    }

    public function clearCart(): bool
    {
        return Redis::del($this->getCartKey()) > 0;
    }
}
