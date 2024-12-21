<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
    {
        return response()->json(
            $this->cartService->getCart()
        );
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $this->cartService->addItem($validated['product_id'], $validated['quantity']);

        return response()->json(['message' => 'Item added to cart']);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:0'
        ]);

        $this->cartService->updateItem($validated['product_id'], $validated['quantity']);

        return response()->json(['message' => 'Cart updated']);
    }

    public function remove($productId)
    {
        $this->cartService->removeItem($productId);
        return response()->json(['message' => 'Item removed from cart']);
    }
}
