"use client"

import { CartProvider } from "@/context/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
