"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  "Full Commercial License",
  "All Future Drops, Tools & Assets",
  "Pay Once, Access Forever",
  "Premium Support",
]

const tiers = [
  { tier: 1, price: 59, slots: "23/250", status: "Active" },
  { tier: 2, price: 99, slots: "0/250", status: "Upcoming" },
  { tier: 3, price: 149, slots: "0/500", status: "Final" },
]

export function PricingSection() {
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
    <section ref={sectionRef} id="pricing" className="relative border-t border-border/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div 
          className={`mx-auto max-w-2xl text-center transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
          {tiers.map((tier, index) => (
            <div
              key={tier.tier}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl ${
                index === 0
                  ? "border-foreground bg-secondary/50 shadow-lg"
                  : "border-border bg-card/50 hover:border-foreground/30"
              } ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
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
                {features.map((feature, featureIndex) => (
                  <li 
                    key={feature} 
                    className={`flex items-start gap-3 transition-all duration-300 ease-out ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                    }`}
                    style={{ transitionDelay: `${200 + index * 75 + featureIndex * 30}ms` }}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  index === 0
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                disabled={index !== 0}
              >
                {index === 0 ? "Get Lifetime Access" : "Coming Soon"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
