"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MessageSquare, Send, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours",
    contact: "hello@stylarx.com",
    href: "mailto:hello@stylarx.com",
  },
  {
    icon: MessageSquare,
    title: "Discord Community",
    description: "Join our community for quick support and discussions",
    contact: "Join Discord",
    href: "#",
  },
]

const faqs = [
  {
    question: "How quickly do you respond?",
    answer: "We typically respond to all inquiries within 24 hours during business days."
  },
  {
    question: "Do you offer custom asset creation?",
    answer: "Yes! Contact us for custom 3D asset creation and we'll provide a quote based on your requirements."
  },
  {
    question: "Can I request specific assets?",
    answer: "Absolutely. We love hearing from our community. Submit your asset requests and we'll consider them for future drops."
  },
]

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formState)
  }

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
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Get in touch
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Have a question or need help? We&apos;re here for you. Reach out and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {contactMethods.map((method, index) => (
              <a
                key={method.title}
                href={method.href}
                className={`group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 ease-out hover:border-foreground/30 hover:bg-secondary/30 hover:scale-[1.02] ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${150 + index * 75}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary transition-all duration-200 group-hover:bg-foreground">
                  <method.icon className="h-6 w-6 text-foreground transition-colors duration-200 group-hover:text-background" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{method.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    {method.contact}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div 
              className={`transition-all duration-500 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Send us a message
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all duration-200"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all duration-200"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all duration-200"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="space-y-6 lg:pl-8">
              <div 
                className={`rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 ease-out ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Clock className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                </div>
                <p className="text-muted-foreground">
                  We typically respond within 24 hours during business days. Premium members get priority support.
                </p>
              </div>

              <div 
                className={`rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 ease-out ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "425ms" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                </div>
                <p className="text-muted-foreground">
                  We&apos;re a fully remote team working across multiple time zones to serve creators worldwide.
                </p>
              </div>

              {/* Quick FAQs */}
              <div 
                className={`transition-all duration-500 ease-out ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <h3 className="font-semibold text-foreground mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={faq.question}
                      className={`rounded-xl border border-border bg-card/30 p-4 transition-all duration-300 ease-out hover:border-foreground/20 ${
                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${550 + index * 50}ms` }}
                    >
                      <h4 className="text-sm font-medium text-foreground">{faq.question}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            style={{ transitionDelay: "700ms" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Check out our pricing and lock in lifetime access at the lowest price.
            </p>
            <div className="mt-8">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <Link href="/pricing">
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
