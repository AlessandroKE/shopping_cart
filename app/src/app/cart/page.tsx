import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, X } from 'lucide-react'
import Image from "next/image"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Free Shipping Banner */}
      <div className="bg-white p-4 text-sm border-b">
        <div className="max-w-6xl mx-auto">
          <p>
            Free Shipping for Members.{" "}
            <span className="text-gray-600">
              Become a Nike Member for fast and free shipping.{" "}
              <a href="#" className="underline">
                Join us
              </a>{" "}
              or{" "}
              <a href="#" className="underline">
                Sign-in
              </a>
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
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt="NikeCourt Air Max Volley"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">NikeCourt Air Max Volley</h3>
                        <p className="text-sm text-gray-600">Womens Hard Court Tennis Shoe</p>
                        <p className="text-sm text-gray-600">Black/White/Metallic Red Bronze</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$90.00</div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <Select defaultValue="8">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Size 7</SelectItem>
                          <SelectItem value="8">Size 8</SelectItem>
                          <SelectItem value="9">Size 9</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="1">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-4 flex gap-4 text-sm">
                      <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <Heart className="w-4 h-4 mr-1" />
                        Move to Favorites
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <span>$90.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping & Handling</span>
                    <span>$8.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>—</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$98.00</span>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Button className="w-full rounded-full" size="lg">
                    Checkout
                  </Button>
                  <Button 
                    className="w-full rounded-full bg-white hover:bg-gray-50 text-[#003087] hover:text-[#003087] border-[#003087]" 
                    variant="outline" 
                    size="lg"
                  >
                    PayPal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

