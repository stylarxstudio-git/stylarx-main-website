"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Animated gradient orb */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-muted/50 to-transparent blur-3xl animate-pulse" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
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

        <h1 
          className={`text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-500 ease-out delay-75 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Premium Asset Library
          <br />
          <span className="text-muted-foreground">for High-End 3D Artists</span>
        </h1>

        <p 
          className={`mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl transition-all duration-500 ease-out delay-150 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Bring your ideas to life with premium 3D models, scenes, mockups, and tools built for creators who take their craft seriously.
        </p>

        <div 
          className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-500 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Button 
            size="lg" 
            className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Get Lifetime Access
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border text-foreground hover:bg-secondary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse Products
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
              <div className="text-3xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">{stat.value}</div>
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
  )
}
