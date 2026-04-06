"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Download, SlidersHorizontal, ShoppingBag, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { categoryMeta, categoryOrder, formatColor, PLAN_MAP } from "@/lib/assets"
import type { Asset, Category } from "@/lib/assets"
import { supabase, mapProductToAsset } from "@/lib/supabase"

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>("ALL")
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem, items } = useCart()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("category") as Category
    if (cat && categoryOrder.includes(cat)) {
      setActiveCategory(cat)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setAssets(data.map(mapProductToAsset))
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered =
    activeCategory === "ALL"
      ? assets
      : assets.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div
            className={`transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              — STYLARX VAULT
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              The Asset Browser
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Production assets. 7 categories. New drops weekly.
              Free assets available. Full Assets unlocked with Founder access.
            </p>
          </div>

          {/* Stats */}
          <div
            className={`mt-8 grid grid-cols-2 gap-6 sm:flex sm:flex-wrap transition-all duration-500 ease-out delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {[
              { value: "140+",   label: "Total Assets"      },
              { value: "Weekly", label: "New Drops"         },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="border-y border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            <SlidersHorizontal className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                [{cat}]
                <span
                  className={`text-xs ${activeCategory === cat ? "text-background/50" : "text-muted-foreground/40"}`}
                >
                  {categoryMeta[cat].total}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-xl border border-border bg-secondary/30"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((asset, index) => {
                const inCart = items.some((i) => i.id === asset.id)
                const planInfo = asset.required_plan_uid ? PLAN_MAP[asset.required_plan_uid] : null

                return (
                  <div
                    key={asset.id}
                    className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/50 transition-all duration-300 ease-out hover:border-foreground/20 hover:shadow-lg ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${Math.min(index * 30, 500)}ms` }}
                  >
                    {/* Thumbnail */}
                    <Link href={`/shop/${asset.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-secondary/30">
                      <Image
                        src={asset.image_url ?? "/placeholder.jpg"}
                        alt={asset.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />

                      {/* Top-left: category + new badge */}
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <span className="rounded border border-border/60 bg-background/75 px-2 py-0.5 font-mono text-xs font-medium text-foreground backdrop-blur-sm">
                          [{asset.category}]
                        </span>
                        {asset.isNew && (
                          <span className="rounded bg-foreground/90 px-2 py-0.5 font-mono text-xs font-bold text-background">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Top-right: free badge */}
                      {asset.free && (
                        <div className="absolute right-3 top-3">
                          <span className="rounded bg-emerald-500 px-2 py-0.5 font-mono text-xs font-bold text-white">
                            FREE
                          </span>
                        </div>
                      )}

                      {/* Hover overlay — locked indicator */}
                      {!asset.free && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-3 py-2 backdrop-blur-sm">
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-mono text-xs text-muted-foreground">
                              {planInfo?.label ?? "MEMBER ACCESS"}
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-4">
                      {/* Access tier badge */}
                      {asset.free ? (
                        <span className="mb-2 inline-flex w-fit items-center rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-xs text-emerald-500">
                          Free Access
                        </span>
                      ) : planInfo ? (
                        <span className={`mb-2 inline-flex w-fit items-center rounded border px-1.5 py-0.5 font-mono text-xs ${planInfo.color}`}>
                          {planInfo.label} Required
                        </span>
                      ) : null}

                      <Link href={`/shop/${asset.slug}`} className="hover:underline">
                        <h3 className="font-semibold leading-tight text-foreground">{asset.name}</h3>
                      </Link>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {asset.description}
                      </p>

                      {/* Technical metadata */}
                      <p className="mt-2 font-mono text-xs text-muted-foreground/50">{asset.meta}</p>

                      {/* Format tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Array.isArray(asset.formats) && asset.formats.map((fmt) => (
                          <span
                            key={fmt}
                            className={`rounded border px-1.5 py-0.5 font-mono text-xs ${formatColor[fmt] ?? "border-border bg-secondary text-muted-foreground"}`}
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="mt-auto pt-4 flex flex-col gap-2">
                        {/* Add to Cart */}
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!inCart) addItem(asset)
                          }}
                          disabled={inCart}
                          className={
                            inCart
                              ? "w-full bg-secondary text-foreground cursor-default"
                              : "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                          }
                        >
                          {inCart ? (
                            <>
                              <Check className="mr-1.5 h-3.5 w-3.5" />
                              In Cart
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                              Add to Cart
                            </>
                          )}
                        </Button>

                        {/* Secondary action */}
                        {asset.free ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-border transition-all duration-200 hover:border-foreground/30"
                            asChild
                          >
                            <a href={asset.lemonsqueezy_url ?? "#"} onClick={(e) => e.stopPropagation()}>
                              <Download className="mr-1.5 h-3.5 w-3.5" />
                              Free Download
                            </a>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-muted-foreground hover:text-foreground"
                            asChild
                          >
                            <Link href="/pricing">
                              <Lock className="mr-1.5 h-3.5 w-3.5" />
                              {planInfo ? `Requires ${planInfo.label}` : "Unlock Access"}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
