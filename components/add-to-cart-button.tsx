"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Check } from "lucide-react"
import type { Asset } from "@/lib/assets"

export function AddToCartButton({ asset }: { asset: Asset }) {
  const { addItem, items } = useCart()
  const inCart = items.some((i) => i.id === asset.id)

  return (
    <Button
      size="lg"
      onClick={() => addItem(asset)}
      disabled={inCart}
      className={
        inCart
          ? "w-full bg-secondary text-foreground cursor-default"
          : "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      }
    >
      {inCart ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
