"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import {
  Menu,
  X,
  Globe,
  Smartphone,
  Palette,
  Code,
  Rocket,
  MessageSquare,
  FileText,
  Layers,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Instagram,
  Star,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

// Animated Background with pure CSS
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Nebula clouds */}
      <div className="nebula-cloud nebula-1" />
      <div className="nebula-cloud nebula-2" />
      <div className="nebula-cloud nebula-3" />
      
      {/* Floating orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />
      <div className="floating-orb orb-4" />
      
      {/* Star field */}
      <div className="stars stars-small" />
      <div className="stars stars-medium" />
      <div className="stars stars-large" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)]" />
    </div>
  )
}

// Navigation
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const navLinksContainerRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

  const sectionIds = navLinks.map((l) => l.id)

  // Lock body scroll while the mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Single passive scroll listener handles both navbar bg + active section
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Find which section's top is closest above 25% of viewport
      const trigger = scrollY + 80 + window.innerHeight * 0.25
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= trigger) current = id
      }
      setActiveSection(current)
    }

    onScroll() // set correct state immediately on mount
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Move slider using offsetLeft — layout-stable, no getBoundingClientRect race
  useEffect(() => {
    const activeEl = linkRefs.current[activeSection]
    if (!activeEl) return
    setSliderStyle({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      opacity: 1,
    })
  }, [activeSection])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center group">
            <img src="/aurean-logo.png" alt="Aurean Solutions" className="h-18 w-auto" />
          </a>

          {/* Desktop nav with sliding underline */}
          <div ref={navLinksContainerRef} className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                ref={(el) => { linkRefs.current[link.id] = el }}
                className={`relative text-sm transition-colors duration-200 pb-1 ${
                  activeSection === link.id ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Animated gradient underline slider */}
            <span
              className="absolute -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 pointer-events-none"
              style={{
                left: sliderStyle.left,
                width: sliderStyle.width,
                opacity: sliderStyle.opacity,
                transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
              }}
            />
          </div>

          <a
            href="#contact"
            className="hidden md:flex px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Get Started
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Mobile sidebar panel */}
      <div
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-[78%] max-w-xs bg-[#0d0d0d] border-l border-white/10 shadow-2xl shadow-black/60 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/5">
          <img src="/aurean-logo.png" alt="Aurean Solutions" className="h-10 w-auto" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 40 + 80}ms` : "0ms",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(16px)",
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              )}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-scale")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <Rocket className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-300">Custom Software Development & Digital Solutions</span>
        </div>

        <h1 className="reveal delay-100 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Stop Losing Bookings to
          <span className="block gradient-text">Missed WhatsApp Messages</span>
        </h1>

        <p className="reveal delay-200 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          We build custom booking and automated WhatsApp reminder systems for clinics, salons, and service businesses — so you never lose a customer to a missed reply again.
        </p>

        <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
          >
            Explore Our Systems
          </a>
        </div>

        <p className="reveal delay-400 mt-8 text-sm text-gray-500">
          Currently building custom systems for our first clients
        </p>
{/* 
        <div className="reveal delay-400 grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
          {[
            { value: "50+", label: "Projects" },
            { value: "100%", label: "Satisfaction" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div> */}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-scale")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const services = [
    { icon: CheckCircle, title: "Appointment Booking System", description: "Fully custom scheduling platforms with automated confirmations, calendar sync, staff management, and client self-service portals.", color: "#f59e0b" },
    { icon: Smartphone, title: "WhatsApp Automation System", description: "Integrated WhatsApp-based automation for customer engagement, order notifications, appointment reminders, and support flows.", color: "#22c55e" },
    { icon: MessageSquare, title: "CRM System", description: "Custom CRM platforms built around your actual sales process — centralising lead data, client history, follow-up pipelines, and team activity.", color: "#ec4899" },
    { icon: Layers, title: "Inventory Management System", description: "End-to-end stock tracking and inventory control — eliminate manual reconciliation and gain real-time visibility across locations.", color: "#3b82f6", comingSoon: true },
    { icon: Globe, title: "Website Development", description: "Professional corporate and business websites built with modern, performance-optimised architecture.", color: "#3b82f6" },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white mb-4">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 max-w-2xl mx-auto">
            Custom booking and WhatsApp automation systems built for service businesses — plus CRM, inventory, and website development to support them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`reveal-scale delay-${(index % 3) * 100 + 100} group relative p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden`}
            >
              <div
                className={`transition-all duration-500 ease-out ${
                  service.comingSoon ? "blur-[3px] opacity-50 scale-[0.98] group-hover:blur-[4px]" : ""
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>

              {service.comingSoon && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-500 ease-out">
                  <span className="px-4 py-1.5 rounded-full bg-black/70 border border-white/10 text-white text-xs font-medium tracking-wide backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Section
function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const steps = [
    { icon: MessageSquare, title: "Discovery", description: "We analyse your operational workflows, pain points, and business objectives to define the right system architecture.", color: "#3b82f6" },
    { icon: FileText, title: "Architecture & Planning", description: "Data models, API structure, and business logic are planned before a single line of code is written.", color: "#8b5cf6" },
    { icon: Palette, title: "UI/UX Design", description: "Figma-based interface design grounded in usability and brand clarity — signed off before development begins.", color: "#ec4899" },
    { icon: Code, title: "Development", description: "Built with Next.js, TypeScript, NestJS, and PostgreSQL — clean architecture, production-grade code.", color: "#10b981" },
    { icon: CheckCircle, title: "QA & Testing", description: "End-to-end testing with Playwright, ESLint, and Prettier — ensuring reliability before any deployment.", color: "#f59e0b" },
    { icon: Rocket, title: "Deployment & Handover", description: "Deployed via CI/CD pipeline with full documentation and post-launch support.", color: "#ef4444" },
  ]

  return (
    <section id="process" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 max-w-2xl mx-auto">
            From discovery to deployment — we own the full delivery lifecycle with no handoff chaos and no accountability gaps.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:-translate-x-1/2" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative flex items-center gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`${index % 2 === 0 ? "reveal-left" : "reveal-right"} delay-${index * 100} flex-1 p-6 rounded-2xl bg-[#111] border border-white/5 ml-16 md:ml-0`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>

              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-[#0a0a0a] md:-translate-x-1/2 -translate-x-1/2" />

              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-scale")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const testimonials = [
    { name: "Sarah Chen", role: "CEO, TechStart", content: "Aurean Solutions delivered beyond our expectations. Our new website has increased conversions by 40%.", rating: 5 },
    { name: "Michael Torres", role: "Founder, GrowthLab", content: "Professional, creative, and incredibly responsive. They truly understood our vision and brought it to life.", rating: 5 },
    { name: "Emily Watson", role: "Marketing Director", content: "The best investment we've made for our digital presence. Highly recommend their services!", rating: 5 },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 max-w-2xl mx-auto">
            Don{"'"}t just take our word for it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`reveal-scale delay-${index * 100 + 100} p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">{`"${testimonial.content}"`}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Tech Stack Section
function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )
    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-scale")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const stack = [
    { layer: "Frontend", techs: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN/UI", "Radix UI"], color: "#3b82f6" },
    { layer: "Backend", techs: ["Node.js", "NestJS"], color: "#8b5cf6" },
    { layer: "Database", techs: ["PostgreSQL", "Supabase"], color: "#10b981" },
    { layer: "Hosting & Cloud", techs: ["DigitalOcean", "AWS (EC2, RDS, S3, CloudFront)"], color: "#f59e0b" },
    { layer: "DevOps", techs: ["GitHub Actions (CI/CD)"], color: "#ef4444" },
    { layer: "Design", techs: ["Figma"], color: "#ec4899" },
    { layer: "Auth", techs: ["Auth.js (NextAuth)"], color: "#06b6d4" },
    { layer: "Testing & QA", techs: ["ESLint", "Prettier", "Playwright"], color: "#a855f7" },
  ]

  return (
    <section id="stack" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Technology
          </span>
          <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 max-w-2xl mx-auto">
            A deliberate, consistent foundation selected for performance, scalability, and long-term maintainability — used across every project we ship.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stack.map((item, index) => (
            <div
              key={item.layer}
              className={`reveal-scale delay-${(index % 4) * 100 + 100} p-5 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all`}
            >
              <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: item.color }} />
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: item.color }}>{item.layer}</p>
              <div className="flex flex-wrap gap-2">
                {item.techs.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    // Replace YOUR_FORM_ID below with the ID from your Formspree dashboard (formspree.io)
    const FORMSPREE_ID = "mkokkdoe"

    try {
      const formData = new FormData(formRef.current!)
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setIsSuccess(true)
        setMessage("Message Sent Successfully!")
        formRef.current?.reset()

        setTimeout(() => {
          setMessage("")
          setIsSuccess(false)
        }, 5000)
      } else {
        const data = await response.json()
        throw new Error(data?.errors?.[0]?.message || "Submission failed")
      }
    } catch (err: unknown) {
      setIsSuccess(false)
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "admin@aureansolutions.com", href: "mailto:admin@aureansolutions.com", color: "#3b82f6" },
    { icon: Phone, label: "Phone", value: "019 361 1203", href: "tel:+60193611203", color: "#8b5cf6" },
    { icon: MapPin, label: "Location", value: "Petaling Jaya, Selangor, Malaysia", href: "#", color: "#ec4899" },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white mb-4">
            Let{"'"}s <span className="gradient-text">Connect</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 max-w-2xl mx-auto">
            We are currently accepting new client engagements. Whether you are digitising manual operations, replacing a legacy system, or building a new platform from scratch — let{"'"}s talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal-left delay-100 space-y-6">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[#111] border border-white/5 hover:border-white/20 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${info.color}20` }}
                >
                  <info.icon className="w-6 h-6" style={{ color: info.color }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </a>
            ))}

            <div className="pt-4">
              <p className="text-gray-400 mb-4">Follow us</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/aurean_solutions/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://wa.me/60193611203" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all" aria-label="WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="reveal-right delay-200">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-[#111] border border-white/5">
              <input
                type="text"
                name="Name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input
                type="email"
                name="Email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                name="Message"
                rows={5}
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {message && (
                <div className={`p-4 rounded-xl text-center font-medium ${isSuccess ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="relative py-8 border-t border-white/5 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/aurean-logo.png" alt="Aurean Solutions" className="h-7 w-auto" />
          </div>
          <p className="text-gray-500 text-sm">&copy; 2026 Aurean Solutions Enterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a]">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </main>
  )
}