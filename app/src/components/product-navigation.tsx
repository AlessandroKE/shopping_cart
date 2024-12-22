"use client"

import { ShoppingCart, User } from 'lucide-react'
import Link from "next/link"

import { menuItems } from "@/lib/menu-items"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function ProductNavigationMenu() {
  return (
    <NavigationMenu className="sticky top-0 z-50 border-b bg-background px-4 py-2">
      <NavigationMenuList>
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
          <span>Cart</span>
        </Link>
      </div>
    </NavigationMenu>
  )
}

