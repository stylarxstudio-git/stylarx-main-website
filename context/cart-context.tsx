"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Asset } from "@/lib/assets"

interface CartContextValue {
  items: Asset[]
  addItem: (item: Asset) => void
  removeItem: (id: number) => void
  count: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Asset[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: Asset) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]))
    setIsOpen(true)
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        count: items.length,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
