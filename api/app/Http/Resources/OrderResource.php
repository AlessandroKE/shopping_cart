<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'items' => $this->orderItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->product->name,
                    'slug' => $item->product->slug,
                    'imageUrl' => $item->product->image_url,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
