import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PricingSection } from "@/components/pricing-section"
import { ProductCategories } from "@/components/product-categories"
import { FeaturesSection } from "@/components/features-section"
import { LatestReleases } from "@/components/latest-releases"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PricingSection />
      <ProductCategories />
      <FeaturesSection />
      <LatestReleases />
      <Footer />
    </main>
  )
}
