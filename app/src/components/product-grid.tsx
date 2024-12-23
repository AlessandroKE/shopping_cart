'use client'
import { ProductCard } from "@/components/product-card"
import { HttpClient } from "@/services/http.service"
import { Product } from "@/types"
import { useEffect, useState } from "react"


// const products = [
//   {
//     name: "Wireless Earbuds, IPX8",
//     price: "89.99",
//     rating: 4,
//     reviews: 123,
//     image: "/placeholder.svg",
//     description: "Dynamic Carbon, Nano-scale certified"
//   },
//   {
//     name: "AirPods Max",
//     price: "549.99",
//     rating: 5,
//     reviews: 89,
//     image: "/placeholder.svg",
//     description: "A perfect balance of high-fidelity audio"
//   },
//   {
//     name: "Bose BT Earphones",
//     price: "299.99",
//     rating: 4,
//     reviews: 231,
//     image: "/placeholder.svg",
//     description: "Clear audio and perfect, tailored noise-block"
//   },
//   {
//     name: "VIVEFOX Headphones",
//     price: "39.99",
//     rating: 4,
//     reviews: 156,
//     image: "/placeholder.svg",
//     description: "Wired Stereo Headphones With Mic"
//   },
//   {
//     name: "JBL TUNE 660BTNC",
//     price: "99.99",
//     rating: 5,
//     reviews: 321,
//     image: "/placeholder.svg",
//     description: "Premium Bass Construction Open-Ear Bluetooth"
//   },
//   {
//     name: "TAGRY Bluetooth",
//     price: "109.99",
//     rating: 4,
//     reviews: 432,
//     image: "/placeholder.svg",
//     description: "TWS Extra-Safe 5.0"
//   },
//   {
//     name: "Monster MNFLEX",
//     price: "49.99",
//     rating: 4,
//     reviews: 98,
//     image: "/placeholder.svg",
//     description: "Flex Active Noise Cancelling Bluetooth"
//   },
//   {
//     name: "Mpow CH6",
//     price: "69.99",
//     rating: 4,
//     reviews: 187,
//     image: "/placeholder.svg",
//     description: "Kids Headphones"
//   },
// ]

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const fetchProducts = async () => {
    const http = new HttpClient<{data:Product[]}>()
    try {
      const res = await http.get('/api/products')
      setProducts(res.data)
    } catch {
      setProducts([])
    }
  }
  useEffect(()=>{
    fetchProducts()
  }, [])

  
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-2xl font-bold">Available Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

