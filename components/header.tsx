"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

const productLinks = [
  { href: "/products/free", label: "Free" },
  { href: "/products/scenes", label: "Scenes" },
  { href: "/products/gobos", label: "Gobo's" },
  { href: "/products/geometry-nodes", label: "Geometry Nodes" },
  { href: "/products/add-ons", label: "Add-ons" },
  { href: "/products/3d-models", label: "3D Models" },
  { href: "/products/3d-mockups", label: "3D Mockups" },
  { href: "/products/2d-mockups", label: "2D Mockups" },
  { href: "/products/animated-mockups", label: "Animated Mockups" },
]

const navLinks = [
  { href: "/ai-toolkit", label: "AI Toolkit" },
  { href: "/pricing", label: "Pricing" },
  { href: "/pricing#faqs", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-out"
      style={{ paddingTop: scrolled ? 16 : 0 }}
    >
      <div
        className={`flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "h-14 w-[85%] max-w-5xl rounded-full border border-border/30 bg-background/60 px-8 shadow-lg shadow-black/5 backdrop-blur-2xl backdrop-saturate-150"
            : "h-16 w-full max-w-7xl border-b border-border/40 bg-background/70 px-6 backdrop-blur-xl"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-foreground transition-all duration-300">
            STYLARX
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ${
                productsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="w-56 rounded-xl border border-border bg-background p-2 shadow-xl">
                {productLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            Log in
          </Button>
          <Button 
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
          >
            Get Access
          </Button>
        </div>

        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={`absolute top-full left-0 right-0 bg-background/60 backdrop-blur-2xl backdrop-saturate-150 md:hidden transition-all duration-200 ${
          scrolled ? "mt-2 mx-4 rounded-2xl border border-border/30 shadow-lg" : "border-t border-border/40"
        }`}>
          <nav className="flex flex-col gap-1 px-4 py-4">
            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-200 ${mobileProductsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="ml-4 flex flex-col gap-1 border-l border-border/50 pl-4 py-2">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex flex-col gap-2 border-t border-border/40 pt-4 mt-2">
              <Button variant="ghost" size="sm" className="justify-start text-muted-foreground hover:text-foreground">
                Log in
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Access
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
