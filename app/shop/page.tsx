"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Download, ArrowRight, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Category = "ALL" | "SCENE" | "MODEL" | "MOCKUP" | "GOBO" | "ADDON" | "GEO NODE"

interface CategoryMeta {
  label: string
  total: number
}

const categoryMeta: Record<Category, CategoryMeta> = {
  ALL:        { label: "All Assets",    total: 147 },
  SCENE:      { label: "Scenes",        total: 7   },
  MODEL:      { label: "3D Models",     total: 51  },
  MOCKUP:     { label: "Mockups",       total: 30  },
  GOBO:       { label: "Gobo Textures", total: 50  },
  ADDON:      { label: "Add-ons",       total: 4   },
  "GEO NODE": { label: "Geo Nodes",     total: 5   },
}

interface Asset {
  id: number
  name: string
  category: Exclude<Category, "ALL">
  formats: string[]
  free: boolean
  isNew: boolean
  description: string
  meta: string
}

const assets: Asset[] = [
  // SCENES
  {
    id: 1,
    name: "Brutalist Studio",
    category: "SCENE",
    formats: [".blend"],
    free: false,
    isNew: true,
    description: "Raw concrete interior. HDRI-ready. Zero lighting setup required.",
    meta: "2.4M polys · Cycles / EEVEE",
  },
  {
    id: 2,
    name: "Desert Canyon Vista",
    category: "SCENE",
    formats: [".blend"],
    free: false,
    isNew: false,
    description: "Photorealistic canyon exterior with volumetric atmosphere and distance haze.",
    meta: "1.1M polys · Cycles",
  },
  {
    id: 3,
    name: "Neon Alley Night",
    category: "SCENE",
    formats: [".blend"],
    free: false,
    isNew: false,
    description: "Urban night environment. Fully lit RGB neon setup. Rain-wet surfaces.",
    meta: "3.2M polys · Cycles / EEVEE",
  },
  {
    id: 4,
    name: "Void Stage Vol.1",
    category: "SCENE",
    formats: [".blend"],
    free: true,
    isNew: false,
    description: "Minimal product stage. Drop in any model, render immediately. No setup.",
    meta: "140K polys · Cycles / EEVEE",
  },

  // GOBOS
  {
    id: 5,
    name: "Venetian Shadows Vol.1",
    category: "GOBO",
    formats: [".exr", ".png"],
    free: true,
    isNew: false,
    description: "12 venetian blind shadow patterns. Product and portrait applications.",
    meta: "4K · 12 textures",
  },
  {
    id: 6,
    name: "Forest Canopy Vol.1",
    category: "GOBO",
    formats: [".exr", ".png"],
    free: false,
    isNew: false,
    description: "24 organic leaf and branch light break patterns. Natural diffusion.",
    meta: "8K · 24 textures",
  },
  {
    id: 7,
    name: "Urban Grid Vol.2",
    category: "GOBO",
    formats: [".exr", ".png"],
    free: false,
    isNew: true,
    description: "18 structural grid and architectural shadow patterns. Hard edge.",
    meta: "8K · 18 textures",
  },
  {
    id: 8,
    name: "Cinema Pack Vol.1",
    category: "GOBO",
    formats: [".exr", ".png"],
    free: false,
    isNew: false,
    description: "30 film-grade light cut patterns. Based on real cinema gobo shapes.",
    meta: "4K · 30 textures",
  },

  // 3D MODELS
  {
    id: 9,
    name: "Arch Chair Series",
    category: "MODEL",
    formats: [".blend", ".fbx", ".obj"],
    free: false,
    isNew: true,
    description: "4 chair variants. PBR materials. Unreal / Unity ready FBX included.",
    meta: "42K polys · PBR",
  },
  {
    id: 10,
    name: "Pendant Light Kit",
    category: "MODEL",
    formats: [".blend", ".fbx"],
    free: false,
    isNew: false,
    description: "6 pendant styles. Emissive glass shader. Area light already configured.",
    meta: "18K polys · PBR",
  },
  {
    id: 11,
    name: "Brutalist Planter Set",
    category: "MODEL",
    formats: [".blend", ".fbx", ".obj"],
    free: false,
    isNew: false,
    description: "8 concrete planter variants. Procedural surface detail. No UV unwrap required.",
    meta: "12K polys · PBR",
  },
  {
    id: 12,
    name: "Hero Desk Setup",
    category: "MODEL",
    formats: [".blend", ".fbx"],
    free: false,
    isNew: true,
    description: "Full hero-grade workstation. Display, peripherals, cables. Print-resolution textures.",
    meta: "280K polys · Cycles",
  },
  {
    id: 13,
    name: "Minimal Vase Set",
    category: "MODEL",
    formats: [".blend", ".fbx", ".obj"],
    free: true,
    isNew: false,
    description: "3 ceramic vase forms. Subsurface scattering material included.",
    meta: "8K polys · PBR",
  },

  // MOCKUPS
  {
    id: 14,
    name: "Brand Box Vol.3",
    category: "MOCKUP",
    formats: [".blend"],
    free: false,
    isNew: true,
    description: "6 packaging angles. Smart UV for instant artwork replacement. No texture painting.",
    meta: "Cycles / EEVEE",
  },
  {
    id: 15,
    name: "Poster Frame Set",
    category: "MOCKUP",
    formats: [".blend"],
    free: false,
    isNew: false,
    description: "5 frame styles with texture displacement for material realism.",
    meta: "Cycles",
  },
  {
    id: 16,
    name: "Phone 16 Pro Rig",
    category: "MOCKUP",
    formats: [".blend", ".fbx"],
    free: false,
    isNew: true,
    description: "Animated screen mockup. 60fps timeline. Reflection-accurate display shader.",
    meta: "Animated · Cycles / EEVEE",
  },
  {
    id: 17,
    name: "Apparel Flat Lay",
    category: "MOCKUP",
    formats: [".blend"],
    free: false,
    isNew: false,
    description: "T-shirt + hoodie flat lay. Baked cloth sim. Print-ready UV layout.",
    meta: "Cycles",
  },

  // ADD-ONS
  {
    id: 18,
    name: "Pure Bake",
    category: "ADDON",
    formats: [".py"],
    free: false,
    isNew: false,
    description: "Single-panel texture baking. Essential controls, zero interface clutter.",
    meta: "Blender 4.0+ · All platforms",
  },
  {
    id: 19,
    name: "StashOps",
    category: "ADDON",
    formats: [".py"],
    free: false,
    isNew: false,
    description: "Asset organization and batch import. Clears clutter, boosts pipeline speed.",
    meta: "Blender 4.0+ · All platforms",
  },
  {
    id: 20,
    name: "CineOps",
    category: "ADDON",
    formats: [".py"],
    free: false,
    isNew: false,
    description: "Cinematic camera control panel. Cuts, motion paths, lens presets in one panel.",
    meta: "Blender 4.0+ · All platforms",
  },
  {
    id: 21,
    name: "Scatter Pro",
    category: "ADDON",
    formats: [".py"],
    free: false,
    isNew: true,
    description: "Intelligent object scattering with live density, scale, and rotation control.",
    meta: "Blender 4.0+ · All platforms",
  },

  // GEO NODES
  {
    id: 22,
    name: "Procedural City Block",
    category: "GEO NODE",
    formats: [".blend"],
    free: false,
    isNew: false,
    description: "Parameter-driven urban block generator. Adjustable density and facade variation.",
    meta: "Blender 4.0+",
  },
  {
    id: 23,
    name: "Vine & Growth System",
    category: "GEO NODE",
    formats: [".blend"],
    free: false,
    isNew: true,
    description: "Organic growth along any surface mesh. Animated growth timeline included.",
    meta: "Blender 4.0+",
  },
  {
    id: 24,
    name: "Particle Trail FX",
    category: "GEO NODE",
    formats: [".blend"],
    free: true,
    isNew: false,
    description: "Motion trail node system. Velocity-based emission. Plug in, render.",
    meta: "Blender 4.0+",
  },
]

const formatColor: Record<string, string> = {
  ".blend": "bg-orange-500/10 text-orange-500/80 border-orange-500/20",
  ".fbx":   "bg-blue-500/10 text-blue-500/80 border-blue-500/20",
  ".obj":   "bg-purple-500/10 text-purple-500/80 border-purple-500/20",
  ".exr":   "bg-cyan-500/10 text-cyan-500/80 border-cyan-500/20",
  ".png":   "bg-green-500/10 text-green-500/80 border-green-500/20",
  ".py":    "bg-yellow-500/10 text-yellow-500/80 border-yellow-500/20",
  ".usdz":  "bg-pink-500/10 text-pink-500/80 border-pink-500/20",
}

const categoryOrder: Category[] = ["ALL", "SCENE", "MODEL", "MOCKUP", "GOBO", "ADDON", "GEO NODE"]

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>("ALL")

  useEffect(() => {
    setMounted(true)
  }, [])

  const filtered =
    activeCategory === "ALL"
      ? assets
      : assets.filter((a) => a.category === activeCategory)

  const currentMeta = categoryMeta[activeCategory]
  const showingMore = filtered.length < currentMeta.total

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
              147 production assets. 7 categories. New drops weekly.
              Free assets available. Full vault unlocked with Founder access.
            </p>
          </div>

          {/* Stats */}
          <div
            className={`mt-8 grid grid-cols-2 gap-6 sm:flex sm:flex-wrap transition-all duration-500 ease-out delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {[
              { value: "147+", label: "Total Assets" },
              { value: "51",   label: "3D Models"    },
              { value: "50",   label: "Gobo Textures" },
              { value: "4",    label: "Blender Add-ons" },
              { value: "Weekly", label: "New Drops"  },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar — sticky */}
      <div className="sticky top-[64px] z-30 border-y border-border/40 bg-background/80 backdrop-blur-xl">
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
          {/* Results header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-xs text-muted-foreground">
              Showing {filtered.length}
              {showingMore && ` of ${currentMeta.total}`}{" "}
              {currentMeta.label.toLowerCase()}
              {showingMore && (
                <span className="text-muted-foreground/50">
                  {" "}— {currentMeta.total - filtered.length} more with Founder access
                </span>
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((asset, index) => (
              <div
                key={asset.id}
                className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/50 transition-all duration-300 ease-out hover:border-foreground/20 hover:shadow-lg ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${Math.min(index * 30, 500)}ms` }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                  <Image
                    src="/placeholder.jpg"
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
                        <span className="font-mono text-xs text-muted-foreground">FOUNDER ACCESS</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold leading-tight text-foreground">{asset.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {asset.description}
                  </p>

                  {/* Technical metadata */}
                  <p className="mt-2 font-mono text-xs text-muted-foreground/50">{asset.meta}</p>

                  {/* Format tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {asset.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className={`rounded border px-1.5 py-0.5 font-mono text-xs ${formatColor[fmt] ?? "border-border bg-secondary text-muted-foreground"}`}
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-4">
                    {asset.free ? (
                      <Button
                        size="sm"
                        className="w-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90"
                      >
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Free Download
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-border transition-all duration-200 hover:border-foreground/30"
                        asChild
                      >
                        <Link href="/pricing#tier-alpha">
                          <Lock className="mr-1.5 h-3.5 w-3.5" />
                          Unlock with Founder Access
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* "More available" overflow card */}
          {showingMore && (
            <div
              className={`mt-6 rounded-2xl border border-border border-dashed bg-card/20 p-10 text-center transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Lock className="mx-auto mb-3 h-6 w-6 text-muted-foreground/40" />
              <p className="text-sm font-medium text-foreground">
                {currentMeta.total - filtered.length} more {currentMeta.label.toLowerCase()} in the vault
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Unlocked instantly with Founder access.
              </p>
              <Button size="sm" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/pricing#tier-alpha">
                  Get Access — $59
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Founder CTA Banner */}
      <section className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`rounded-2xl border border-border bg-secondary/20 p-10 text-center transition-all duration-500 ease-out sm:p-16 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              — Unlock the Full Vault
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              147+ Assets. One Payment. Forever.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Founder access unlocks every asset in the vault — current and future — plus the
              125GB personal vault and AI Toolkit. One-time payment at $59 while Tier 1 is active.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <Link href="/pricing#tier-alpha">
                  Get Founder Access — $59
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-foreground/40"
                asChild
              >
                <Link href="/faq">Questions? Read the FAQ</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              7-day refund · Instant access · 227 Tier 1 slots remaining at $59
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
