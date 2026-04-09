export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { supabase, mapProductToAsset } from "@/lib/supabase"
import type { Product } from "@/lib/supabase"
import { formatColor, categoryMeta, PLAN_MAP } from "@/lib/assets"
import type { Asset } from "@/lib/assets"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Lock, Download, FileBox, ChevronDown, Package, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: rows, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .limit(1)

  const data = rows?.[0] ?? null

  if (error || !data) {
    notFound()
  }

  const asset = mapProductToAsset(data as Product)

  // Build gallery
  const gallery: string[] = [data.image_url ?? "/placeholder.jpg"]
  if (Array.isArray(data.extra_images)) gallery.push(...data.extra_images)
  while (gallery.length < 4) gallery.push(data.image_url ?? "/placeholder.jpg")

  // Fetch related
  const { data: relData } = await supabase
    .from("products")
    .select("*")
    .eq("category", data.category)
    .neq("id", data.id)
    .limit(4)
  const related = (relData ?? []).map((p) => mapProductToAsset(p as Product))

  const categoryLabel = categoryMeta[asset.category]?.label ?? asset.category
  const planInfo = asset.required_plan_uid ? PLAN_MAP[asset.required_plan_uid] : null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2">
          <Link
            href="/shop"
            className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Shop
          </Link>
          <span className="font-mono text-xs text-muted-foreground/40">/</span>
          <span className="font-mono text-xs text-muted-foreground/60">{categoryLabel}</span>
          <span className="font-mono text-xs text-muted-foreground/40">/</span>
          <span className="font-mono text-xs text-foreground">{asset.name}</span>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left — preview */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary/30">
              <Image
                src={gallery[0]}
                alt={asset.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded border border-border/60 bg-background/80 px-2.5 py-1 font-mono text-xs font-medium text-foreground backdrop-blur-sm">
                  [{asset.category}]
                </span>
                {asset.isNew && (
                  <span className="rounded bg-foreground/90 px-2.5 py-1 font-mono text-xs font-bold text-background">
                    NEW
                  </span>
                )}
                {asset.free && (
                  <span className="rounded bg-emerald-500 px-2.5 py-1 font-mono text-xs font-bold text-white">
                    FREE
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-border bg-secondary/30 transition-all duration-150 hover:border-foreground/30"
                >
                  <Image
                    src={src}
                    alt={`${asset.name} preview ${i + 1}`}
                    width={200}
                    height={150}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — info panel */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                — {categoryLabel}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {asset.name}
              </h1>
              {asset.free ? (
                <span className="mt-3 inline-flex items-center rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs text-emerald-500">
                  Free Access
                </span>
              ) : planInfo ? (
                <span className={`mt-3 inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs ${planInfo.color}`}>
                  {planInfo.label} Required
                </span>
              ) : null}
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {asset.description}
              </p>
            </div>

            {/* Technical specs */}
            <div className="rounded-xl border border-border bg-card/50 p-5">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Technical Specs
              </p>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileBox className="h-3.5 w-3.5 shrink-0" />
                    File Formats
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {asset.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className={`rounded border px-1.5 py-0.5 font-mono text-xs ${
                          formatColor[fmt] ?? "border-border bg-secondary text-muted-foreground"
                        }`}
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    Access
                  </div>
                  <span className="font-mono text-xs text-foreground">
                    {asset.free
                      ? "Free — No account required"
                      : planInfo
                      ? `${planInfo.label} required`
                      : "Member access required"}
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <details className="group rounded-xl border border-border bg-card/50">
              <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Disclaimer
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {asset.disclaimer ?? "This is a digital product. Please review the file formats and compatibility requirements before purchasing. All sales are subject to our 7-day refund policy (no downloads made). Assets are for personal or commercial use as per your license tier."}
                </p>
              </div>
            </details>

            {/* What You Will Get */}
            <div className="rounded-xl border border-border bg-card/50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  What You Will Get
                </p>
              </div>
              {asset.whatYouGet && asset.whatYouGet.length > 0 ? (
                <ul className="space-y-2">
                  {asset.whatYouGet.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground/60 italic">
                  Product contents will be listed here.
                </p>
              )}
            </div>

            {/* CTA block */}
            <div className="flex flex-col gap-3">
              <AddToCartButton asset={asset} />

              <div data-o-anonymous>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border hover:border-foreground/30"
                  asChild
                >
                  <Link href="/pricing">
                    <Lock className="mr-2 h-4 w-4" />
                    {asset.free
                      ? "Create Account to Download"
                      : planInfo
                      ? `Unlock — Requires ${planInfo.label}`
                      : "Unlock with Member Access"}
                  </Link>
                </Button>
              </div>

              {asset.free ? (
                <div data-o-authenticated>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-border hover:border-foreground/30"
                    asChild
                  >
                    <a href={asset.lemonsqueezy_url ?? "#"}>
                      <Download className="mr-2 h-4 w-4" />
                      Free Download
                    </a>
                  </Button>
                </div>
              ) : (
                <div
                  data-o-authenticated
                  {...(asset.required_plan_uid ? { "data-o-plans": asset.required_plan_uid } : {})}
                >
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                    asChild
                  >
                    <a href={asset.lemonsqueezy_url ?? "#"}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Now
                    </a>
                  </Button>
                </div>
              )}

              {!asset.free && (
                <Link
                  href="/contact"
                  className="text-center font-mono text-xs text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground"
                >
                  Report a Problem
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Related assets */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                — More {categoryLabel}
              </p>
              <Link
                href="/shop"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View All →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item: Asset) => (
                <Link
                  key={item.id}
                  href={`/shop/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/50 transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                    <Image
                      src={item.image_url ?? "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    {item.isNew && (
                      <span className="absolute left-3 top-3 rounded bg-foreground/90 px-2 py-0.5 font-mono text-xs font-bold text-background">
                        NEW
                      </span>
                    )}
                    {item.free && (
                      <span className="absolute right-3 top-3 rounded bg-emerald-500 px-2 py-0.5 font-mono text-xs font-bold text-white">
                        FREE
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground/50">{item.meta}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
