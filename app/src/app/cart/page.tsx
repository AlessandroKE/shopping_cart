'use client'
import { ProtectedRoute } from "@/components/protectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CartService } from "@/services/cart.service"
import { updateCart } from "@/store/cartSlice"
import { RootState } from "@/store/store"
import { X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function CartPage() {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount)
    useEffect(() => {
        if(!!localStorage.getItem('token'))fetchcart()
    }, [])

    const removeItem = async (product_id: number) => {
        const cartService = new CartService()
        await cartService.removeItem(product_id)
        fetchcart()
    }
    const updateItem = async (product_id: number, quantity:number) => {
        const cartService = new CartService()
        await cartService.updateItem(product_id, quantity)
        fetchcart()
    }
    const fetchcart = () =>{
        const cartService = new CartService()
        cartService.getCart().then(data => dispatch(updateCart(data)))
    }
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                {/* Free Shipping Banner */}
                <div className="bg-white p-4 text-sm border-b">
                    <div className="max-w-6xl mx-auto">
                        <p>
                            Free Shipping for Members.{" "}
                            <span className="text-gray-600">
                                Become a Member for fast and free shipping.{" "}
                                {/* <a href="#" className="underline">
                                    Join us
                                </a>{" "}
                                or{" "}
                                <a href="#" className="underline">
                                    Sign-in
                                </a> */}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Cart Section */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <h1 className="text-2xl font-semibold mb-1">Bag</h1>
                                <div className="text-sm text-gray-600">
                                    Save Up to 40%{" "}
                                    <a href="#" className="underline">
                                        Show All Our Markdowns
                                    </a>
                                </div>
                            </div>

                            {/* Cart Item */}
                            {cartItems.map(item => (
                                <Card className="mb-6" key={item.product_id}>
                                    <CardContent className="p-4">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    width={96}
                                                    height={96}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="font-medium">{item.name}</h3>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">${item.price * item.quantity} </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex gap-4">

                                                    <Input onChange={event=>updateItem(item.product_id, +event.target.value)}
                                                        placeholder="quantity"
                                                        defaultValue={item.quantity}
                                                        type="number"
                                                        min={1}
                                                        />
                                                </div>
                                                <div className="mt-4 flex gap-4 text-sm">
                                                    <button className="flex items-center text-gray-600 hover:text-gray-900" onClick={()=>removeItem(item.product_id)}>
                                                        <X className="w-4 h-4 mr-1" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Shipping Info */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">Shipping</h3>
                                    <p className="text-sm">
                                        Arrives Tue, Jul 20 - Thu, Jul 22{" "}
                                        <a href="#" className="underline">
                                            Edit Location
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Pickup</h3>
                                    <a href="#" className="text-sm underline">
                                        Find a Store
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                    <h2 className="font-semibold text-lg">Summary</h2>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Do you have a Promo Code?</span>
                                            <button className="text-gray-600">?</button>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${totalAmount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Estimated Shipping & Handling</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Estimated Tax</span>
                                            <span>—</span>
                                        </div>
                                        <div className="pt-4 border-t flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>${totalAmount}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <Link href="/checkout">
                                            <Button className="w-full mb-2 rounded-full" size="lg"  >
                                                Checkout
                                            </Button>
                                        </Link>
                                       <Link href="/">
                                       <Button
                                            className="w-full rounded-full bg-white hover:bg-gray-50 text-[#003087] hover:text-[#003087] border-[#003087]"
                                            variant="outline"
                                            size="lg"
                                        >
                                            Continue Shopping
                                        </Button>
                                       </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

