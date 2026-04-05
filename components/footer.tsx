"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const footerLinks = {
  products: [
    { label: "3D Models", href: "#" },
    { label: "3D Mockups", href: "#" },
    { label: "Animated Mockups", href: "#" },
    { label: "Scenes", href: "#" },
    { label: "Gobo Textures", href: "#" },
  ],
  company: [
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "#" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/stylarx.official" },
    { label: "TikTok", href: "https://www.tiktok.com/@stylarx.official" },
    { label: "X (Twitter)", href: "https://x.com/stylarxofficial" },
  ],
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} id="contact" className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div 
            className={`lg:col-span-1 transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/" className="text-xl font-bold text-foreground transition-opacity duration-200 hover:opacity-70">
              STYLARX
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Premium digital asset platform offering high-quality 3D models, mockups, scenes, and tools for designers and creators worldwide.
            </p>
          </div>

          <div 
            className={`transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "50ms" }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div 
            className={`transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div 
            className={`transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Social
            </h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div 
          className={`mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} STYLARX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
