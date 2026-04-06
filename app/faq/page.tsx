"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Category = "ALL" | "FOUNDER PROGRAM" | "THE ASSETS" | "LICENSING" | "TECHNICAL"

const categories: Category[] = ["ALL", "FOUNDER PROGRAM", "THE ASSETS", "LICENSING", "TECHNICAL"]

interface FAQ {
  category: Exclude<Category, "ALL">
  question: string
  answer: string
  cta?: { label: string; href: string }
}

const faqs: FAQ[] = [
  // FOUNDER PROGRAM
  {
    category: "FOUNDER PROGRAM",
    question: "What exactly happens when Tier 1 sells out?",
    answer:
      "The price moves to $99. Not temporarily — permanently. After 250 more slots at $99, it moves to $149 and stays there. The $59 rate cannot be recovered after Tier 1 closes. There is no grace period. Slot 250 is the hard cutoff.",
    cta: { label: "View Pricing Tiers", href: "/pricing" },
  },
  {
    category: "FOUNDER PROGRAM",
    question: "Can I lose my Founder status after buying?",
    answer:
      "No. Your rate and access are locked at the moment of purchase. We cannot raise your price, convert your one-time payment to a subscription, or remove your Founder status.",
    cta: undefined,
  },
  {
    category: "FOUNDER PROGRAM",
    question: "Why are you selling at $59 if the product is worth $99?",
    answer:
      "Because you're buying before the platform is fully built. That carries real risk — you're betting on us. The Founder pricing is a fair trade: you accept early-stage uncertainty, we reward that trust with a permanently lower entry price. After the Founder tiers close, the $99 price reflects a more complete, proven product.",
    cta: undefined,
  },
  {
    category: "FOUNDER PROGRAM",
    question: "Can I buy multiple Founder slots for my team?",
    answer:
      "One per account by default. If you need multiple Founder seats for a studio or team, contact us before purchasing. We handle team setups manually to make sure each account is properly provisioned and receives the correct rate.",
    cta: { label: "Contact for Team Access", href: "/contact" },
  },
  
  // THE VAULT
  {
    category: "THE ASSETS",
    question: "What Assets are available right now?",
    answer:
      "140= production assets across 7 categories: 3D models, 3D mockups, scenes, Gobo textures, geometry node sets, Blender add-ons, 2D mockups. New drops are added weekly.",
    cta: { label: "Browse the Shop", href: "/shop" },
  },
  {
    category: "THE ASSETS",
    question: "What happens to my files if Stylarx goes offline?",
    answer:
      "Downloaded assets are yours — stored locally, licensed forever, used indefinitely under your commercial license. The 125GB cloud vault depends on Stylarx remaining operational. If we ever sunset the platform, we commit to 60 days advance notice. Files you've already downloaded are entirely unaffected regardless.",
    cta: undefined,
  },
  {
    category: "THE ASSETS",
    question: "Is the 125GB for Stylarx assets or my own files?",
    answer:
      "The 125GB is your personal cloud drive: upload your own project files, exports, work-in-progress, or anything else. It functions like Google Drive, not just a download folder.",
    cta: undefined,
  },
  {
    category: "THE ASSETS",
    question: "How often do new assets drop, and do I get them automatically?",
    answer:
      "New assets are added weekly — sometimes a single complex scene, sometimes a batch of models or gobos. Every drop is automatically included in your plan access at no extra cost. There is no upsell, no 'Premium Vault' tier above Founder. You get everything that ships, forever.",
    cta: undefined,
  },

  // LICENSING
  {
    category: "LICENSING",
    question: "Can I use these in commercial projects I get paid for?",
    answer:
      "Yes. The full commercial license covers client work, sold products, freelance deliverables, advertising, film, broadcast, architecture visualization, and social media. No per-project or per-seat fees. Use as many assets in as many projects as you want.",
    cta: undefined,
  },
  {
    category: "LICENSING",
    question: "Can I resell the raw asset files?",
    answer:
      "No. The license covers usage in derivative works — finished renders, products, games, scenes — not redistribution of the original source files. You can sell a client deliverable built with our assets. You cannot sell, share, or distribute the original .blend, .fbx, or texture files themselves.",
    cta: undefined,
  },
  {
    category: "LICENSING",
    question: "Can I use assets in a Unity or Unreal Engine game I sell commercially?",
    answer:
      "Yes. Commercial game development is explicitly covered by the license. .fbx, .obj, and more formats are included alongside .blend for direct engine import. Unreal Engine, Unity, Godot, and proprietary engines are all in scope. No engine specific licensing restrictions apply.",
    cta: undefined,
  },
  {
    category: "LICENSING",
    question: "Can I use these assets to train AI models?",
    answer:
      "No. AI training dataset use is explicitly excluded from the license. This exclusion applies to all asset types in the library — 3D models, textures, gobos, mockups, and add-ons — regardless of the model architecture or training purpose.",
    cta: undefined,
  },

  // TECHNICAL
  
  {
    category: "TECHNICAL",
    question: "Which Blender version do the add-ons support?",
    answer:
      "Blender 4.0 and above. We release compatibility updates within 14 days of every major Blender version release. All add-ons follow the same update schedule. Legacy support for Blender 3.x is not maintained.",
    cta: undefined,
  },

  {
    category: "TECHNICAL",
    question: "Are STYLARX Assets compatible with any software?",
    answer:
      "Yes. All Assets are provided in universal formats (like .blend, FBX, OBJ, PNG, etc) and are compatible with tools like Blender, Unreal, Unity, Maya, Houdini, Photoshop, and more",
    cta: undefined,
  },
  
  {
    category: "TECHNICAL",
    question: "What is the refund policy?",
    answer:
      "Due to the digital nature of our products, we don't offer refunds.",
    cta: { label: "Contact Support", href: "/contact" },
  },
]

export default function FAQPage() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>("ALL")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filtered =
    activeCategory === "ALL" ? faqs : faqs.filter((f) => f.category === activeCategory)

  const categoryCount = (cat: Exclude<Category, "ALL">) =>
    faqs.filter((f) => f.category === cat).length

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div
            className={`transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              — No Spin. No Deflection.
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Honest Answers
              <br />
              <span className="text-muted-foreground">to Hard Questions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              These are the questions a suspicious buyer would ask.
              Answered without filters, qualifications, or marketing gloss.
            </p>
          </div>

          {/* Stats */}
          <div
            className={`mt-10 flex flex-wrap gap-8 transition-all duration-500 ease-out delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {[
              { value: `${faqs.length}`, label: "Questions Answered" },
              { value: "4", label: "Categories" },
              { value: "0", label: "Deflections" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter — sticky */}
      <div className="sticky top-[64px] z-30 border-y border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenIndex(null)
                }}
                className={`shrink-0 rounded-lg px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
                {cat !== "ALL" && (
                  <span
                    className={`ml-2 ${activeCategory === cat ? "text-background/50" : "text-muted-foreground/40"}`}
                  >
                    [{categoryCount(cat as Exclude<Category, "ALL">)}]
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          {activeCategory !== "ALL" && (
            <p
              className={`mb-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground transition-all duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
            >
              — {activeCategory} · {filtered.length} questions
            </p>
          )}

          <div className="space-y-2">
            {filtered.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={`${faq.category}-${index}`}
                  className={`rounded-xl border transition-all duration-200 ease-out ${
                    isOpen
                      ? "border-foreground/20 bg-secondary/30"
                      : "border-border bg-card/30 hover:border-foreground/10 hover:bg-card/60"
                  } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${Math.min(index * 25, 400)}ms` }}
                >
                  <button
                    className="flex w-full items-start justify-between gap-4 p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <span className="mt-0.5 shrink-0 select-none font-mono text-xs text-muted-foreground/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium leading-relaxed text-foreground">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Answer — smooth height transition */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
                  >
                    <div className="px-6 pb-6 pl-[3.75rem]">
                      <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                      {faq.cta && (
                        <Link
                          href={faq.cta.href}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:gap-2.5"
                        >
                          {faq.cta.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      {/* Category tag */}
                      <div className="mt-5 flex items-center gap-2">
                        <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground/50">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No questions in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Still unsure CTA */}
      <section className="border-t border-border/40 py-16">
        <div className="mx-auto max-w-4xl px-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              — Question Not Listed?
            </p>
            <h3 className="mt-2 text-xl font-bold text-foreground">
              Ask us directly.
            </h3>
            <p className="mt-1 text-muted-foreground">
              We respond to all inquiries within 24 hours, no sales script.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="shrink-0 border-border transition-all duration-200 hover:border-foreground/40"
            asChild
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            — Every Question Answered
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Now Make the Call.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Lock in the $59 rate before the next tier hits at $99. Then $149.
            Same access either way — just a different number on the receipt.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="/pricing#tier-alpha">
                Lock In $59 — Founder Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-foreground/40"
              asChild
            >
              <Link href="/shop">Browse the Assets</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
