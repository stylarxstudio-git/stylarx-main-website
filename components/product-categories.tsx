"use client"

import { ArrowRight, Box, Layers, Play, Image } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const categories = [
  {
    title: "3D Models",
    description: "High-quality 3D models ready for your projects",
    icon: Box,
    href: "#",
  },
  {
    title: "3D Mockups",
    description: "Studio-grade mockups for product visualization",
    icon: Layers,
    href: "#",
  },
  {
    title: "Animated Mockups",
    description: "Bring your designs to life with motion",
    icon: Play,
    href: "#",
  },
  {
    title: "Gobo Textures",
    description: "Transform lighting with cinematic patterns",
    icon: Image,
    href: "#",
  },
]

export function ProductCategories() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="products" className="border-t border-border/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div 
          className={`mx-auto max-w-2xl text-center transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
  )
}
