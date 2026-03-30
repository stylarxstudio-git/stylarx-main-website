"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    title: "Ready-to-Go Scenes",
    description:
      "Our ready-to-go scenes are built to save you time and boost your results. Just drop in your model, pick a camera, and start rendering instantly. Every scene is professionally lit, fully customizable, and optimized for clean, high-end visuals.",
    cta: "Browse Scenes",
    href: "#",
  },
  {
    title: "Gobo Textures for Cinematic Lighting",
    description:
      "Transform any light into a storytelling tool. Our gobo texture packs give you instantly usable, high-resolution patterns ready for Blender, Unreal Engine, and every major 3D software. Just load a texture into your spotlight and watch your scene come alive.",
    cta: "Browse Gobo Textures",
    href: "#",
  },
  {
    title: "Pro Blender Add-ons",
    description:
      "Streamline your workflow with our custom Blender add-ons. From texture baking to scene setup, our tools are designed to help you work faster and smarter. Simple interfaces, powerful results.",
    cta: "Browse Add-ons",
    href: "#",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

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
        >
          {feature.cta}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
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

export function FeaturesSection() {
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
    <section ref={sectionRef} id="features" className="border-t border-border/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div 
          className={`mx-auto max-w-2xl text-center transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
  )
}
