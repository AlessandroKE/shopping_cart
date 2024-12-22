'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, DollarSign, CreditCardIcon } from 'lucide-react'

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="credit-card"
                  onValueChange={(value) => setSelectedPaymentMethod(value)}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="mr-2" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex items-center">
                      <Smartphone className="mr-2" />
                      M-Pesa
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center">
                      <DollarSign className="mr-2" />
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe" className="flex items-center">
                      <CreditCardIcon className="mr-2" />
                      Stripe
                    </Label>
                  </div>
                </RadioGroup>

                <Separator className="my-6" />

                {selectedPaymentMethod === 'credit-card' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'mpesa' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone-number">M-Pesa Phone Number</Label>
                      <Input id="phone-number" placeholder="+254 7XX XXX XXX" />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'paypal' && (
                  <div className="text-center">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}

                {selectedPaymentMethod === 'stripe' && (
                  <div className="text-center">
                    <p>You will be redirected to Stripe to complete your payment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$90.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$8.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$7.20</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$105.20</span>
                </div>
                <Button className="w-full mt-4" size="lg">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
