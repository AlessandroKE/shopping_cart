<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    private CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index(): JsonResponse
    {
        $orders = Order::where('user_id', Auth::user()->id)->latest()->paginate();
        
        return response()->json(OrderResource::collection($orders));
    }

    public function store(): JsonResponse
    {
        $cartItems = $this->cartService->getItems(Auth::user()->id);
        
        if (empty($cartItems)) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => Auth::user()->id,
                'status' => 'pending'
            ]);

            foreach ($cartItems as $item) {
                $order->orderItems()->create([
                    'product_id' => $item['product_id'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity']
                ]);
            }

            $this->cartService->clearCart(Auth::user()->id);

            DB::commit();
            return response()->json(new OrderResource($order), 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create order'], 500);
        }
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json(new OrderResource($order));
    }

    
}
