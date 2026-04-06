"use client"

import { useCart } from "@/context/cart-context"
import { formatColor } from "@/lib/assets"
import { Button } from "@/components/ui/button"
import { X, Download, Lock, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CartDrawer() {
  const { items, removeItem, count, isOpen, closeCart } = useCart()

  const freeItems = items.filter((i) => i.free)
  const paidItems = items.filter((i) => !i.free)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-4 w-4 text-foreground" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
              Cart
            </span>
            {count > 0 && (
              <span className="font-mono text-xs text-muted-foreground">
                — {count} item{count !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/20" />
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <Button size="sm" variant="outline" asChild onClick={closeCart}>
                <Link href="/shop">Browse Assets</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border/50 px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  {/* Thumb */}
                  <div className="h-16 w-16 shrink-0 rounded-lg border border-border bg-secondary/50" />

                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold leading-tight text-foreground hover:underline"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-1">
                          <span className="rounded border border-border/60 bg-secondary/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                            [{item.category}]
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-0.5 shrink-0 text-muted-foreground/40 transition-colors hover:text-foreground"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Format tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.formats.map((fmt) => (
                        <span
                          key={fmt}
                          className={`rounded border px-1.5 py-0.5 font-mono text-xs ${
                            formatColor[fmt] ?? "border-border bg-secondary text-muted-foreground"
                          }`}
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>

                    {/* Per-item action */}
                    <div className="mt-1">
                      {item.free ? (
                        <Button
                          size="sm"
                          className="h-7 bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90"
                          asChild
                        >
                          <a href={item.lemonsqueezy_url ?? "#"} onClick={closeCart}>
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Lock className="h-3 w-3 text-muted-foreground/40" />
                          <span className="font-mono text-xs text-muted-foreground/60">
                            Requires Founder Access
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer CTAs */}
        {items.length > 0 && (
          <div className="space-y-2 border-t border-border/60 px-6 py-5">
            {freeItems.length > 0 && (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download {freeItems.length} Free Asset{freeItems.length !== 1 ? "s" : ""}
              </Button>
            )}
            {paidItems.length > 0 && (
              <Button
                variant="outline"
                className="w-full border-border hover:border-foreground/30"
                size="sm"
                asChild
              >
                <Link href="/pricing" onClick={closeCart}>
                  <Lock className="mr-2 h-4 w-4" />
                  Unlock {paidItems.length} Asset{paidItems.length !== 1 ? "s" : ""} — from $59
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
