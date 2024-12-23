'use client'
import { useEffect, useState } from "react";
import { OrderService } from "@/services/order.service"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protectedRoute";
// import { CartService } from "@/services/cart.service";
// import { updateCart } from "@/store/cartSlice";
// import { RootState } from "@/store/store";
// import { useDispatch, useSelector } from "react-redux";

export default function Orders() {
  //const dispatch = useDispatch()
  const [orders, setOrders] = useState<Order[]>([])
  const orderService = new OrderService()

  // const totalAmount = useSelector((state: RootState) => state.cart.totalAmount)
  // useEffect(() => {
  //     fetchcart()
  // }, [])

  // const fetchcart = () =>{
  //         const cartService = new CartService()
  //         cartService.getCart().then(data => dispatch(updateCart(data)))
  //     }

  async function fetchOrders() {
    try {
      const response = await orderService.getOrders()
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders([])
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
  <ProtectedRoute>
        <Table className="max-w-screen-md mx-auto my-4 md:my-8 lg:my-16">
      <TableCaption>A list of your orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order no.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Total cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link href={'/orders/'+order.id} className="underline text-blue-500">{order.id}</Link>
              </TableCell>
              <TableCell><Badge variant="outline">{order.status}</Badge></TableCell>
              <TableCell>{formatDate(order.created_at)}</TableCell>
              <TableCell className="text-right">${order.items.reduce((accum, curr)=>accum+curr.price*curr.quantity, 0)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">No orders found</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Orders</TableCell>
          <TableCell className="text-right">{orders?.length || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </ProtectedRoute>
  );
}