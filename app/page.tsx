"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Sparkles, Box, Layers, Play, Image } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

// ─── DATA ────────────────────────────────────────────────────────────────────

const pricingFeatures = [
  "Full Commercial License",
  "All Future Drops, Tools & Assets",
  "Pay Once, Access Forever",
  "Premium Support",
]

const pricingTiers = [
  { tier: 1, price: 59, slots: "23/250", status: "Active" },
  { tier: 2, price: 99, slots: "0/250", status: "Upcoming" },
  { tier: 3, price: 149, slots: "0/500", status: "Final" },
]

const categories = [
  {
    title: "3D Models",
    description: "High-quality 3D models ready for your projects",
    icon: Box,
    href: "/shop?category=MODEL",
  },
  {
    title: "3D Mockups",
    description: "Studio-grade mockups for product visualization",
    icon: Layers,
    href: "/shop?category=MOCKUP",
  },
  {
    title: "Animated Mockups",
    description: "Bring your designs to life with motion",
    icon: Play,
    href: "/shop?category=MOCKUP",
  },
  {
    title: "Gobo Textures",
    description: "Transform lighting with cinematic patterns",
    icon: Image,
    href: "/shop?category=GOBO",
  },
]

const features = [
  {
    title: "Ready-to-Go Scenes",
    description:
      "Our ready-to-go scenes are built to save you time and boost your results. Just drop in your model, pick a camera, and start rendering instantly. Every scene is professionally lit, fully customizable, and optimized for clean, high-end visuals.",
    cta: "Browse Scenes",
    href: "/shop?category=SCENE",
  },
  {
    title: "Gobo Textures for Cinematic Lighting",
    description:
      "Transform any light into a storytelling tool. Our gobo texture packs give you instantly usable, high-resolution patterns ready for Blender, Unreal Engine, and every major 3D software. Just load a texture into your spotlight and watch your scene come alive.",
    cta: "Browse Gobo Textures",
    href: "/shop?category=GOBO",
  },
  {
    title: "Pro Blender Add-ons",
    description:
      "Streamline your workflow with our custom Blender add-ons. From texture baking to scene setup, our tools are designed to help you work faster and smarter. Simple interfaces, powerful results.",
    cta: "Browse Add-ons",
    href: "/shop?category=ADDON",
  },
]

const releases = [
  {
    title: "Pro Pure Bake",
    description: "A simple Blender add-on for fast, clean texture baking with essential controls in one panel.",
    category: "Add-on",
    slug: "pro-pure-bake",
  },
  {
    title: "Pro Daylight Studio Scene",
    description: "A clean studio scene with soft daylight shadows, cloud textures, and multiple gobo background options.",
    category: "Scene",
    slug: "pro-daylight-studio-scene",
  },
  {
    title: "Pro Sky Light Studio Scene",
    description: "A minimalist display scene with a white pedestal and soft tree silhouettes.",
    category: "Scene",
    slug: "pro-sky-light-studio-scene",
  },
  {
    title: "Standard Container 01",
    description: "A 3D model of a standard shipping container with corrugated metal panels and double doors.",
    category: "3D Model",
    slug: "standard-container-01",
  },
  {
    title: "Standard CCTV Camera 01",
    description: "Premium 3D model of a surveillance camera. Perfect for renders, games, or animations.",
    category: "3D Model",
    slug: "standard-cctv-camera-01",
  },
  {
    title: "Metallic Logo Mockup",
    description: "Elegant metallic logo mockup with customizable lighting and surface options.",
    category: "Mockup",
    slug: "metallic-logo-mockup",
  },
]

// ─── FEATURE CARD (scroll-triggered animation) ───────────────────────────────

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`flex flex-col gap-8 rounded-2xl border border-border bg-card/30 p-8 transition-all duration-400 ease-out hover:border-foreground/20 hover:shadow-xl lg:flex-row lg:items-center lg:p-12 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      } ${
        isVisible
          ? "opacity-100 translate-x-0"
          : index % 2 === 0
          ? "opacity-0 -translate-x-6"
          : "opacity-0 translate-x-6"
      }`}
    >
      <div className="flex-1">
        <h3
          className={`text-2xl font-bold text-foreground lg:text-3xl transition-all duration-400 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`mt-4 text-muted-foreground leading-relaxed transition-all duration-400 ease-out delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {feature.description}
        </p>
        <Button
          variant="outline"
          className={`group mt-6 border-border text-foreground hover:bg-secondary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          asChild
        >
          <Link href={feature.href}>
            {feature.cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      <div
        className={`flex aspect-video w-full items-center justify-center rounded-xl border border-border/50 bg-secondary/30 transition-all duration-400 ease-out delay-100 hover:scale-[1.02] lg:w-1/2 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="grid h-16 w-16 place-items-center rounded-xl bg-secondary transition-transform duration-200 hover:rotate-6 hover:scale-110">
            <span className="text-2xl font-bold text-foreground">{index + 1}</span>
          </div>
          <span className="text-sm">Feature Preview</span>
        </div>
      </div>
    </div>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [pricingVisible, setPricingVisible] = useState(false)
  const [categoriesVisible, setCategoriesVisible] = useState(false)
  const [featuresVisible, setFeaturesVisible] = useState(false)
  const [releasesVisible, setReleasesVisible] = useState(false)

  const pricingRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const releasesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)

    const observe = (ref: React.RefObject<HTMLElement | null>, setter: (v: boolean) => void) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true) },
        { threshold: 0.1 }
      )
      if (ref.current) observer.observe(ref.current)
      return observer
    }

    const o1 = observe(pricingRef, setPricingVisible)
    const o2 = observe(categoriesRef, setCategoriesVisible)
    const o3 = observe(featuresRef, setFeaturesVisible)
    const o4 = observe(releasesRef, setReleasesVisible)

    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); o4.disconnect() }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-muted/50 to-transparent blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Status badge */}
          <div
            className={`mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Tier 1 Pricing Active
          </div>

          {/* Headline */}
          <h1
            className={`text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-500 ease-out delay-75 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The Premium Asset Library
            <br />
            <span className="text-muted-foreground">for High-End 3D Artists</span>
          </h1>

          {/* Sub-headline */}
          <p
            className={`mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl transition-all duration-500 ease-out delay-150 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Bring your ideas to life with premium 3D models, scenes, mockups, and tools built for creators who take their craft seriously.
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-500 ease-out delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              asChild
            >
              <Link href="/pricing">
                Get Lifetime Access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`mt-20 grid grid-cols-2 gap-8 border-t border-border/40 pt-10 md:grid-cols-4 transition-all duration-500 ease-out delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {[
              { value: "500+", label: "Premium Assets" },
              { value: "23/250", label: "Founder Slots" },
              { value: "Forever", label: "Lifetime Access" },
              { value: "Weekly", label: "New Releases" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`group cursor-default transition-all duration-400 ease-out hover:scale-105 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: mounted ? `${350 + index * 50}ms` : "0ms" }}
              >
                <div className="text-3xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 p-1">
              <div className="h-2 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER PRICING ──────────────────────────────────────────────── */}
      <section ref={pricingRef} id="pricing" className="relative border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`mx-auto max-w-2xl text-center transition-all duration-500 ease-out ${
              pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Founder Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Lock in the lowest price before it increases. Pay once, access forever.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.tier}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl ${
                  index === 0
                    ? "border-foreground bg-secondary/50 shadow-lg"
                    : "border-border bg-card/50 hover:border-foreground/30"
                } ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${100 + index * 75}ms` }}
              >
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background animate-pulse">
                      <Sparkles className="h-3 w-3" />
                      Active
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Tier {tier.tier}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground">/ one-time</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {tier.slots} Slots Filled
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {pricingFeatures.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 transition-all duration-300 ease-out ${
                        pricingVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                      }`}
                      style={{ transitionDelay: `${200 + index * 75 + featureIndex * 30}ms` }}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {index === 0 ? (
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    asChild
                  >
                    <a href="https://stylarx.outseta.com/auth?widgetMode=register&planUid=7ma2MXQE&planPaymentTerm=oneTime&skipPlanOptions=true#o-anonymous">
                      Get Lifetime Access
                    </a>
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    disabled
                  >
                    Coming Soon
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY ───────────────────────────────────────────── */}
      <section ref={categoriesRef} id="products" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`mx-auto max-w-2xl text-center transition-all duration-500 ease-out ${
              categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our growing library of premium assets
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                href={category.href}
                className={`group relative flex flex-col rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 ease-out hover:border-foreground/30 hover:bg-secondary/50 hover:scale-[1.03] hover:shadow-xl ${
                  categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${75 + index * 50}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-all duration-200 group-hover:scale-110 group-hover:bg-foreground">
                  <category.icon className="h-6 w-6 text-foreground transition-colors duration-200 group-hover:text-background" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{category.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:text-foreground">
                  Browse
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS YOU GET WITH STYLARX ─────────────────────────────────── */}
      <section ref={featuresRef} id="features" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`mx-auto max-w-2xl text-center transition-all duration-500 ease-out ${
              featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Results You Get with STYLARX
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your work grows, our library grows with it.
            </p>
          </div>

          <div className="mt-16 space-y-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST RELEASES ──────────────────────────────────────────────── */}
      <section ref={releasesRef} className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center transition-all duration-500 ease-out ${
              releasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Latest Releases
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Browse the newly released products
              </p>
            </div>
            <Button
              variant="outline"
              className="group border-border text-foreground hover:bg-secondary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {releases.map((release, index) => (
              <Link
                key={release.title}
                href={`/shop/${release.slug}`}
                className={`group flex flex-col rounded-2xl border border-border bg-card/50 transition-all duration-300 ease-out hover:border-foreground/30 hover:bg-secondary/50 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
                  releasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${50 + index * 40}ms` }}
              >
                <div className="flex aspect-[4/3] items-center justify-center border-b border-border/50 bg-secondary/30 rounded-t-2xl overflow-hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-all duration-200 group-hover:scale-125 group-hover:rotate-6">
                    <span className="text-lg font-bold text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                      {release.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 w-fit rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-all duration-200 group-hover:bg-foreground group-hover:text-background">
                    {release.category}
                  </span>
                  <h3 className="font-semibold text-foreground">{release.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {release.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
