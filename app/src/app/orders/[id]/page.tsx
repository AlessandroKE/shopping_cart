'use client'

import { CalendarIcon, PackageIcon, TruckIcon } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Order } from '@/types'
import { OrderService } from '@/services/order.service'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { ProtectedRoute } from '@/components/protectedRoute'


export default function OrderPage() {
    const {id} = useParams()
    const [order, setOrder] = useState<Order | null>(null)
    useEffect(()=>{
       if (id) new OrderService().getOrder(+id).then(data=>setOrder(data)).catch(()=>setOrder(null))
    }, [id])
  return  order !== null ?
    <ProtectedRoute>

<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Order #{order.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                <span>Ordered on: {formatDate(order.created_at)}</span>
              </div>
              <Badge variant="outline">{order.status}</Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="font-semibold">Customer Information</h3>
              <p>Alessandro Koome</p>
              <p>koomealessandro@gmail.com</p>
              <p>232 Meru, Kenya</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <TruckIcon className="mr-2 h-4 w-4" /> Track Order
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${order.items.reduce((accum, curr)=>accum+curr.price*curr.quantity, 0)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <PackageIcon className="mr-2 h-4 w-4" /> View Invoice
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
    :
    <ProtectedRoute>
        <div>404 | NOT FOUND</div>
    </ProtectedRoute>

  
}
