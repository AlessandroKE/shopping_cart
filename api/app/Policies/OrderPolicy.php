<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;


class OrderPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->is_admin===true;
    }

    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Order $order): bool
    {
        return false;
    }
}