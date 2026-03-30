"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const releases = [
  {
    title: "Pro Pure Bake",
    description: "A simple Blender add-on for fast, clean texture baking with essential controls in one panel.",
    category: "Add-on",
  },
  {
    title: "Pro Daylight Studio Scene",
    description: "A clean studio scene with soft daylight shadows, cloud textures, and multiple gobo background options.",
    category: "Scene",
  },
  {
    title: "Pro Sky Light Studio Scene",
    description: "A minimalist display scene with a white pedestal and soft tree silhouettes.",
    category: "Scene",
  },
  {
    title: "Standard Container 01",
    description: "A 3D model of a standard shipping container with corrugated metal panels and double doors.",
    category: "3D Model",
  },
  {
    title: "Standard CCTV Camera 01",
    description: "Premium 3D model of a surveillance camera. Perfect for renders, games, or animations.",
    category: "3D Model",
  },
  {
    title: "Metallic Logo Mockup",
    description: "Elegant metallic logo mockup with customizable lighting and surface options.",
    category: "Mockup",
  },
]

export function LatestReleases() {
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
    <section ref={sectionRef} className="border-t border-border/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div 
          className={`flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {releases.map((release, index) => (
            <div
              key={release.title}
              className={`group flex flex-col rounded-2xl border border-border bg-card/50 transition-all duration-300 ease-out hover:border-foreground/30 hover:bg-secondary/50 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
