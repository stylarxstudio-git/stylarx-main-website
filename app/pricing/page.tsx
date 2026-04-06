"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles, ArrowLeft, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const features = [
  "Full Commercial License",
  "All Future Drops, Tools & Assets",
  "300 AI Credits / month",
  "Full Access to AI Toolkit",
  "125 GB Vault Storage",
  "3D Mentor: 300 msgs / 3hrs",
  "Game Dev Blueprint: 50 msgs / 3hrs",
  "Premium Support",
  "Pay Once, Access Forever",
]

const tiers = [
  { tier: 1, price: 59, slots: "23/250", status: "Active", description: "Best value for early supporters" },
  { tier: 2, price: 99, slots: "0/250", status: "Upcoming", description: "Limited slots at this price" },
  { tier: 3, price: 149, slots: "0/500", status: "Final", description: "Final tier before full price" },
]

const faqs = [
  {
    question: "What does lifetime access mean?",
    answer: "Once you purchase, you get access to all current and future assets forever. No subscriptions, no recurring fees."
  },
  {
    question: "Can I use assets commercially?",
    answer: "Yes! All plans include a full commercial license. Use the assets in client work, products, and more."
  },
  {
    question: "What happens after Tier 1 sells out?",
    answer: "The price increases to Tier 2 pricing. Early supporters get locked in at the lowest price forever."
  },
  {
    question: "Do I get future updates?",
    answer: "Absolutely. All future drops, tools, and assets are included with your one-time purchase."
  },
  {
    question: "Is there a refund policy?",
    answer: "Due to the digital nature of our products, we offer refunds within 7 days if you haven't downloaded any assets."
  },
  {
    question: "How do I access the assets?",
    answer: "After purchase, you'll get instant access to our member portal where you can browse and download all assets."
  },
]

export default function PricingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <Link 
            href="/"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-8 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div 
            className={`max-w-2xl transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              227 Founder Slots Remaining
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Lock in the lowest price before it increases. Pay once, access forever. No subscriptions, no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <div
                key={tier.tier}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl ${
                  index === 0
                    ? "border-foreground bg-secondary/50 shadow-lg"
                    : "border-border bg-card/50 hover:border-foreground/30"
                } ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
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
                    <span className="text-5xl font-bold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground">/ one-time</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {tier.slots} Slots Filled
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-4">
                  {features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className={`flex items-start gap-3 transition-all duration-300 ease-out ${
                        mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                      }`}
                      style={{ transitionDelay: `${300 + index * 100 + featureIndex * 40}ms` }}
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {index === 0 ? (
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    asChild
                  >
                    <a href="https://stylarx.outseta.com/auth?widgetMode=register&planUid=7ma2MXQE&planPaymentTerm=oneTime&skipPlanOptions=true#o-anonymous">
                      Get Lifetime Access
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
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

      {/* Comparison */}
      <section className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div 
            className={`text-center transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything included
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No matter which tier you join at, you get the same premium access
            </p>
          </div>

          <div 
            className={`mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {[
              { title: "Full Asset Marketplace Access", description: "140+ premium assets across 7 categories — models, mockups, scenes, gobos, add-ons, and more" },
              { title: "Every AI Tool", description: "10+ AI tools on Stylarx.app — Gobo Gen, Scene Stager, PBR Gen, SFX Gen, 3D Mentor, and more" },
              { title: "300 AI Credits / Month", description: "Generate gobos, scenes, PBR maps, SFX, and much more every month" },
              { title: "Commercial License", description: "Use everything in client work, products, and commercial projects" },
              { title: "Blender Add-ons", description: "Pure Bake, StashOps, CineOps, Scatter Pro — all included" },
              { title: "Priority Support", description: "Get help when you need it" },
              { title: "125 GB Vault Storage", description: "Store 125 GB worth of Assets in the Vault and Access them Anywhere." },
              { title: "Game Dev Blueprint", description: "Turn Raw Ideas into a Structured Game Design Document Instantly." },
              { title: "3D Mentor", description: "Master Blender, Unreal, Unity, and more with 3D Mentor that Speaks every 3D Language" },
            ].map((item, index) => (
              <div 
                key={item.title}
                className={`rounded-xl border border-border bg-card/30 p-6 transition-all duration-300 ease-out hover:border-foreground/20 hover:bg-secondary/30 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${550 + index * 50}ms` }}
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div 
            className={`text-center transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <HelpCircle className="h-6 w-6 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about STYLARX
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.question}
                className={`rounded-xl border border-border bg-card/30 p-6 transition-all duration-300 ease-out hover:border-foreground/20 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${700 + index * 50}ms` }}
              >
                <h3 className="font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div 
            className={`transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to level up your 3D workflow?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join 23 other founders who locked in lifetime access at Tier 1 pricing.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <a href="https://stylarx.outseta.com/auth?widgetMode=register&planUid=7ma2MXQE&planPaymentTerm=oneTime&skipPlanOptions=true#o-anonymous">
                  Get Lifetime Access - $59
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary transition-all duration-200"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
