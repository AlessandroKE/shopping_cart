import { Heart } from 'lucide-react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from '@/types'



export function ProductCard({id, name, description, price, slug, imageUrl,  }: Product) {
  return (
    <Card className="group relative overflow-hidden">
      <button className="absolute right-2 top-2 z-10 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
        <Heart className="h-5 w-5" />
        <span className="sr-only">Add to favorites</span>
      </button>
      <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium">{name}</h3>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
          {/* <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div> */}
          <p className="mt-1 text-sm font-medium text-gray-900">${price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-green-950 text-white hover:bg-green-900">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}

