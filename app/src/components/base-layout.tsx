'use client'
import React from 'react'
import { CartProvider } from './cartProvider'
import { ProductNavigationMenu } from './product-navigation'


function BaseLayout({children}) {
  return (
    <CartProvider>
        <ProductNavigationMenu />
        {children}
    </CartProvider>
  )
}

export default BaseLayout
