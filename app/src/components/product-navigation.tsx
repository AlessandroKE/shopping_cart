"use client"

import { Menu, ShoppingCart, User, X } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { menuItems } from "@/lib/menu-items"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RootState } from '@/store/store'
import { CartService } from '@/services/cart.service'
import { updateCart } from '@/store/cartSlice'

export function ProductNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const uniqueItemsCount = useSelector((state: RootState) => state.cart.items.length)

  useEffect(() => {
    const cartService = new CartService()
    if (!!localStorage.getItem('token')) {
      cartService.getCart().then(data => {
        dispatch(updateCart(data))
      })
    }
  }, [dispatch])

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="text-lg font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="flex-1 px-2 py-4">
                {menuItems.map((item) => (
                  <div key={item.href} className="mb-4">
                    {item.children ? (
                      <div className="space-y-3">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block text-sm text-muted-foreground hover:text-primary"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-sm font-medium hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="text-xl font-bold">
          Store
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-sm font-medium hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only">Cart</span>
            {uniqueItemsCount > 0 && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                {uniqueItemsCount}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="flex items-center gap-1.5 text-sm font-medium hover:text-primary"
          >
            <User className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only">Account</span>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <NavigationMenu className="mx-auto max-w-screen-2xl px-4 py-2">
          <NavigationMenuList className="flex-1">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.children.map((child) => (
                          <NavigationMenuLink asChild key={child.href}>
                            <Link
                              href={child.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{child.title}</div>
                              {child.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    {item.title}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <div className="flex items-center gap-6">
            <Link
              href="/account"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart {uniqueItemsCount > 0 && `(${uniqueItemsCount})`}</span>
            </Link>
          </div>
        </NavigationMenu>
      </div>
    </div>
  )
}

