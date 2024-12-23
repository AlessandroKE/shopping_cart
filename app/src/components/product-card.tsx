"use client"

import { Heart } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from '@/types'
import { toast } from 'sonner'
import { CartService } from '@/services/cart.service'
import { updateCart } from '@/store/cartSlice'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

export function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  slug, 
  imageUrl, 
}: Product) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const addItem = async () => {
    const cartService = new CartService()
    try {
      const res = await cartService.addItem(id, 1)
      if(res.message !== 'Unauthenticated.') {
        toast.success("Product successfully added to cart.")
        fetchCart()
      }
    } catch {
      toast.error("Unable to add item to cart")
    }
    
    
  }
  const fetchCart = () => {
    const cartService = new CartService()
    cartService.getCart().then(data => dispatch(updateCart(data)))
  }

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full">
      <button 
        className="absolute right-2 top-2 z-10 rounded-full bg-white/80 backdrop-blur-sm p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        aria-label="Add to favorites"
      >
        <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <CardContent className="p-2 sm:p-4 flex-grow">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-base font-medium line-clamp-1">{name}</h3>
          {description && (
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
          <p className="text-sm sm:text-base font-medium text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-2 sm:p-4 pt-0">
        {cartItems.find(item => item.product_id === id) ? (
          <span className="w-full text-center text-sm text-gray-500 py-2">
            Item in Cart
          </span>
        ) : (
          <Button 
            className="w-full bg-green-950 text-white hover:bg-green-900" 
            onClick={addItem}
            size="sm"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

