"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import {
  Menu,
  X,
  Globe,
  ShoppingCart,
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
  Linkedin,
  Star,
  ArrowRight,
  ChevronDown,
  Zap,
  Shield,
  Target,
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
    { label: "Why Us", href: "#why", id: "why" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Portfolio", href: "#portfolio", id: "portfolio" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

  const sectionIds = navLinks.map((l) => l.id)

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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 transition-colors text-sm ${
                  activeSection === link.id ? "text-white" : "text-gray-400"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center font-medium"
            >
              Get Started
            </a>
          </div>
        )}
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
          Systems That Drive Operations.
          <span className="block gradient-text">Software That Scales.</span>
        </h1>

        <p className="reveal delay-200 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          We build business-critical software systems that help SMEs and growing organisations manage, automate, and scale their operations — replacing inefficient manual processes with purpose-built digital infrastructure.
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
    { icon: Layers, title: "Inventory Management System", description: "End-to-end stock tracking and inventory control — eliminate manual reconciliation and gain real-time visibility across locations.", color: "#3b82f6" },
    { icon: FileText, title: "Invoice & Billing System", description: "Scalable invoicing and billing infrastructure that automates payment workflows, tracks receivables, and generates professional documentation.", color: "#8b5cf6" },
    { icon: MessageSquare, title: "CRM System", description: "Custom CRM platforms built around your actual sales process — centralising lead data, client history, follow-up pipelines, and team activity.", color: "#ec4899" },
    { icon: ShoppingCart, title: "POS System", description: "Tailored point-of-sale systems for retail, F&B, and service businesses — with real-time transaction processing and integrated inventory sync.", color: "#10b981" },
    { icon: CheckCircle, title: "Appointment Booking System", description: "Fully custom scheduling platforms with automated confirmations, calendar sync, staff management, and client self-service portals.", color: "#f59e0b" },
    { icon: Rocket, title: "Payroll Management System", description: "Custom payroll platforms handling salary computation, EPF/SOCSO compliance, payslip generation, and leave management.", color: "#ef4444" },
    { icon: Code, title: "Operations Dashboard", description: "Business-critical command centres surfacing real-time KPIs, operational metrics, and team performance data for informed decision-making.", color: "#06b6d4" },
    { icon: Smartphone, title: "WhatsApp Automation System", description: "Integrated WhatsApp-based automation for customer engagement, order notifications, appointment reminders, and support flows.", color: "#22c55e" },
    { icon: Globe, title: "E-Commerce Platform", description: "Custom-engineered commerce platforms with full backend control — product management, order processing, payment integration, and analytics.", color: "#a855f7" },
    { icon: Layers, title: "Workflow Automation Tools", description: "Custom internal automation systems that replace repetitive manual tasks with triggered, rule-based workflows — reducing error and improving throughput.", color: "#f97316" },
    { icon: Palette, title: "UI/UX Design", description: "Interface design grounded in usability, brand clarity, and user flow — applied to both software systems and client-facing digital products.", color: "#ec4899" },
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
            Engineering-first software systems built to solve real operational problems — from inventory and invoicing to CRM, payroll, and workflow automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`reveal-scale delay-${(index % 3) * 100 + 100} group p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-300`}
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

// Why Aurean Section
function WhyAureanSection() {
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

  const pillars = [
    {
      icon: Code,
      title: "Engineering-First, Systems-Thinking",
      description: "Every system is architected from scratch — data models, API structure, and business logic planned before a single line of code is written. No templates, no white-labelled products.",
      color: "#8b5cf6",
    },
    {
      icon: Shield,
      title: "End-to-End Ownership",
      description: "From discovery to deployment, we manage the full delivery lifecycle. No handoff chaos, no fragmented teams, no accountability gaps. One team, one outcome.",
      color: "#3b82f6",
    },
    {
      icon: Target,
      title: "Business Outcomes Over Visual Polish",
      description: "Every system is measured against operational outcomes: reduced manual effort, faster processing, fewer errors, and improved decision-making velocity. We build for results.",
      color: "#10b981",
    },
    {
      icon: Zap,
      title: "Built for SMEs, Architected to Scale",
      description: "Designed for businesses transitioning from manual to digital systems — and built with the architecture to scale globally as those businesses grow.",
      color: "#f59e0b",
    },
  ]

  return (
    <section id="why" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="reveal inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Why Aurean
          </span>
          <h2 className="reveal delay-100 text-3xl md:text-5xl font-bold text-white mb-4">
            Our Competitive <span className="gradient-text">Advantage</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 max-w-2xl mx-auto">
            In a market saturated with generic web agencies and templated solutions, we stand apart through engineering excellence and operational problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`reveal-scale delay-${index * 100 + 100} group p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-300`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${pillar.color}20` }}
              >
                <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{pillar.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
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
    { layer: "Hosting & Cloud", techs: ["Vercel", "Railway", "AWS (EC2, RDS, S3, CloudFront)"], color: "#f59e0b" },
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
    { icon: Mail, label: "Email", value: "info@aureanorg.com", href: "mailto:info@aureanorg.com", color: "#3b82f6" },
    { icon: Phone, label: "Phone", value: "+60 111 093 5551", href: "tel:+601110935551", color: "#8b5cf6" },
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
                <a href="https://www.linkedin.com/in/jeeva10/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://wa.me/+601110935551" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all" aria-label="WhatsApp">
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

// Portfolio Section
function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [headerVisible, setHeaderVisible] = React.useState(false)
  const [cardsVisible, setCardsVisible] = React.useState(false)

  // Trigger header + cards visible once section enters viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          setTimeout(() => setCardsVisible(true), 150)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filters = [
    { label: "All", value: "all" },
    { label: "Operations", value: "operations" },
    { label: "Commerce", value: "commerce" },
    { label: "Finance", value: "finance" },
    { label: "Automation", value: "automation" },
    { label: "Web & Design", value: "web" },
  ]

  const projects = [
    {
      category: "operations",
      tag: "Operations",
      tagColor: "#3b82f6",
      tagBg: "rgba(59,130,246,.12)",
      title: "Inventory Management System",
      desc: "End-to-end stock tracking and inventory control. Real-time visibility across multiple locations with automated low-stock alerts, eliminating manual reconciliation entirely.",
      techs: ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
      metrics: [{ val: "–80%", label: "Manual Work", color: "#3b82f6" }, { val: "Real-time", label: "Stock Sync", color: "#10b981" }, { val: "Multi-loc", label: "Visibility", color: "#f59e0b" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#0a1628 0%,#0d2040 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#60a5fa", marginBottom: 4 }}>Inventory Manager v2.1</div>
          <div>Stock Level ─────── <span style={{ color: "#10b981" }}>94.2%</span></div>
          <div>Low Stock Alerts ─── <span style={{ color: "#f59e0b" }}>3</span></div>
          <div>Locations Synced ── <span style={{ color: "#60a5fa" }}>12</span></div>
          <div style={{ marginTop: 6, color: "#10b981" }}>▲ Real-time sync active</div>
        </div>
      ),
    },
    {
      category: "finance",
      tag: "Finance",
      tagColor: "#a78bfa",
      tagBg: "rgba(139,92,246,.12)",
      title: "Invoice & Billing System",
      desc: "Multi-tenant billing platform handling complex invoicing logic, automated payment tracking, PDF generation and client management — replacing spreadsheet-based billing workflows.",
      techs: ["Next.js", "NestJS", "Supabase", "PDF Gen"],
      metrics: [{ val: "Auto", label: "PDF Generation", color: "#a78bfa" }, { val: "0", label: "Billing Errors", color: "#10b981" }, { val: "Multi-tenant", label: "Architecture", color: "#f59e0b" }],
      status: "Live",
      screenBg: "linear-gradient(135deg,#120a28 0%,#1d1040 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#a78bfa", marginBottom: 4 }}>Invoice Generator Pro</div>
          <div>INV-2026-0142 ── <span style={{ color: "#10b981" }}>PAID</span></div>
          <div>INV-2026-0143 ── <span style={{ color: "#f59e0b" }}>PENDING</span></div>
          <div>INV-2026-0144 ── <span style={{ color: "#60a5fa" }}>DRAFT</span></div>
          <div style={{ marginTop: 6 }}>Receivables ── <span style={{ color: "#a78bfa" }}>RM 48,200</span></div>
        </div>
      ),
    },
    {
      category: "operations",
      tag: "Operations",
      tagColor: "#f472b6",
      tagBg: "rgba(236,72,153,.12)",
      title: "CRM System",
      desc: "Custom CRM built around the client's actual sales pipeline — centralising lead data, client history, follow-up queues, and team activity without generic SaaS overhead.",
      techs: ["Next.js", "TypeScript", "NestJS", "PostgreSQL"],
      metrics: [{ val: "360°", label: "Client View", color: "#f472b6" }, { val: "Custom", label: "Pipeline Stages", color: "#3b82f6" }, { val: "Auto", label: "Follow-ups", color: "#10b981" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#1a0a18 0%,#2a1030 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#f472b6", marginBottom: 4 }}>CRM Pipeline</div>
          <div>New Leads ──────── <span style={{ color: "#f472b6" }}>24</span></div>
          <div>In Negotiation ─── <span style={{ color: "#f59e0b" }}>11</span></div>
          <div>Closed Won ──────── <span style={{ color: "#10b981" }}>8</span></div>
          <div style={{ marginTop: 6 }}>Conversion ── <span style={{ color: "#f472b6" }}>33.3%</span></div>
        </div>
      ),
    },
    {
      category: "commerce",
      tag: "Commerce",
      tagColor: "#34d399",
      tagBg: "rgba(16,185,129,.12)",
      title: "POS System — F&B & Retail",
      desc: "Tailored point-of-sale for F&B and retail operators with real-time transaction processing, integrated inventory sync, split billing, and end-of-day reporting.",
      techs: ["Next.js", "NestJS", "PostgreSQL", "Vercel"],
      metrics: [{ val: "<200ms", label: "Transaction", color: "#10b981" }, { val: "Sync", label: "Inventory", color: "#3b82f6" }, { val: "EOD", label: "Reports", color: "#f59e0b" }],
      status: "Live",
      screenBg: "linear-gradient(135deg,#0a1a0f 0%,#0d2a18 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#34d399", marginBottom: 4 }}>POS Terminal — Table 7</div>
          <div>Nasi Lemak ×2 ─── <span style={{ color: "#fff" }}>RM 26.00</span></div>
          <div>Teh Tarik ×3 ──── <span style={{ color: "#fff" }}>RM 12.00</span></div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", margin: "5px 0", paddingTop: 4, color: "#34d399" }}>Total ────── RM 38.00</div>
          <div style={{ color: "#f59e0b" }}>● Processing payment...</div>
        </div>
      ),
    },
    {
      category: "operations",
      tag: "Operations",
      tagColor: "#38bdf8",
      tagBg: "rgba(56,189,248,.12)",
      title: "Appointment Booking System",
      desc: "Fully custom scheduling platform with automated confirmations, calendar sync, staff roster management, and a client self-service portal reducing admin overhead by 70%.",
      techs: ["Next.js", "Auth.js", "Supabase", "Cal API"],
      metrics: [{ val: "–70%", label: "Admin Load", color: "#06b6d4" }, { val: "Auto", label: "Reminders", color: "#10b981" }, { val: "Self-serve", label: "Client Portal", color: "#3b82f6" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#0a1520 0%,#0d1e30 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#38bdf8", marginBottom: 4 }}>BookFlow — May 2026</div>
          <div>Mon ── <span style={{ color: "#10b981" }}>●●●</span><span style={{ color: "#4b5563" }}>○○</span></div>
          <div>Tue ── <span style={{ color: "#10b981" }}>●●●●</span><span style={{ color: "#4b5563" }}>○</span></div>
          <div>Wed ── <span style={{ color: "#f59e0b" }}>●●</span> <span style={{ color: "#4b5563" }}>Blocked</span></div>
          <div style={{ marginTop: 5, color: "#38bdf8" }}>Next: 10:30 AM — Ahmad R.</div>
        </div>
      ),
    },
    {
      category: "finance",
      tag: "Finance",
      tagColor: "#fb923c",
      tagBg: "rgba(249,115,22,.12)",
      title: "Payroll Management System",
      desc: "Custom payroll for Malaysian SMEs — automated salary computation, EPF/SOCSO compliance, payslip generation, and leave management replacing error-prone spreadsheet HR.",
      techs: ["NestJS", "PostgreSQL", "PDF Gen", "TypeScript"],
      metrics: [{ val: "EPF/SOCSO", label: "Compliant", color: "#fb923c" }, { val: "Auto", label: "Payslips", color: "#10b981" }, { val: "Leave Mgmt", label: "Included", color: "#3b82f6" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#1a100a 0%,#2a1808 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#fb923c", marginBottom: 4 }}>Payroll — April 2026</div>
          <div>Employees ─────── <span style={{ color: "#fff" }}>48</span></div>
          <div>EPF Computed ── <span style={{ color: "#10b981" }}>✓ Done</span></div>
          <div>SOCSO Filed ─── <span style={{ color: "#10b981" }}>✓ Done</span></div>
          <div style={{ marginTop: 5, color: "#fb923c" }}>Payslips: 48/48 ready</div>
        </div>
      ),
    },
    {
      category: "automation",
      tag: "Automation",
      tagColor: "#4ade80",
      tagBg: "rgba(74,222,128,.12)",
      title: "WhatsApp Automation System",
      desc: "Integrated WhatsApp-based automation for customer engagement, order confirmations, appointment reminders, and support flows — built for the Malaysian market.",
      techs: ["WA Business API", "NestJS", "Webhooks"],
      metrics: [{ val: "1,200+", label: "Daily Msgs", color: "#4ade80" }, { val: "Triggered", label: "Workflows", color: "#3b82f6" }, { val: "0", label: "Manual Steps", color: "#10b981" }],
      status: "Live",
      screenBg: "linear-gradient(135deg,#0a1a0f 0%,#0d2a15 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#4ade80", marginBottom: 4 }}>WhatsApp Automation</div>
          <div style={{ background: "rgba(74,222,128,.1)", padding: "2px 6px", borderRadius: 4, margin: "2px 0" }}>Order #441 confirmed ✓</div>
          <div style={{ background: "rgba(74,222,128,.1)", padding: "2px 6px", borderRadius: 4, margin: "2px 0" }}>Appt reminder sent ✓</div>
          <div style={{ color: "#4b5563", marginTop: 5 }}>Messages today: 1,204</div>
        </div>
      ),
    },
    {
      category: "operations",
      tag: "Operations",
      tagColor: "#38bdf8",
      tagBg: "rgba(56,189,248,.12)",
      title: "Operations Dashboard (OPS)",
      desc: "Business-critical command centre aggregating real-time KPIs, operational metrics, and team performance data — giving leadership full visibility without chasing reports.",
      techs: ["Next.js", "Recharts", "NestJS", "PostgreSQL"],
      metrics: [{ val: "Real-time", label: "KPI Feed", color: "#06b6d4" }, { val: "Custom", label: "Dashboards", color: "#8b5cf6" }, { val: "Alerts", label: "Threshold", color: "#10b981" }],
      status: "Live",
      screenBg: "linear-gradient(135deg,#0a1520 0%,#0d1e35 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#38bdf8", marginBottom: 4 }}>OPS Dashboard — Live</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Revenue MTD</span><span style={{ color: "#10b981" }}>RM 124k</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Orders</span><span style={{ color: "#38bdf8" }}>1,847</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>NPS Score</span><span style={{ color: "#a78bfa" }}>94.2</span></div>
        </div>
      ),
    },
    {
      category: "commerce",
      tag: "Commerce",
      tagColor: "#c084fc",
      tagBg: "rgba(192,132,252,.12)",
      title: "E-Commerce Platform",
      desc: "Custom-engineered commerce infrastructure with full backend control — product management, order orchestration, payment integration, and analytics for businesses beyond Shopify.",
      techs: ["Next.js", "NestJS", "Stripe", "AWS S3"],
      metrics: [{ val: "Full Stack", label: "Ownership", color: "#a855f7" }, { val: "Multi-pay", label: "Gateways", color: "#10b981" }, { val: "Analytics", label: "Built-in", color: "#3b82f6" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#16091e 0%,#220d30 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#c084fc", marginBottom: 4 }}>Commerce Platform</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Orders Today</span><span style={{ color: "#10b981" }}>342</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>GMV</span><span style={{ color: "#c084fc" }}>RM 89,400</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Conversion</span><span style={{ color: "#f59e0b" }}>4.8%</span></div>
        </div>
      ),
    },
    {
      category: "automation",
      tag: "Automation",
      tagColor: "#fb923c",
      tagBg: "rgba(249,115,22,.12)",
      title: "Workflow Automation Tools",
      desc: "Custom internal automation engine replacing repetitive manual tasks with triggered, rule-based workflows — improving throughput and freeing teams for higher-value work.",
      techs: ["NestJS", "Bull Queues", "PostgreSQL", "Webhooks"],
      metrics: [{ val: "2,400+", label: "Daily Runs", color: "#f97316" }, { val: "Rule-based", label: "Logic", color: "#10b981" }, { val: "–90%", label: "Manual Tasks", color: "#3b82f6" }],
      status: "Live",
      screenBg: "linear-gradient(135deg,#1a0e08 0%,#281808 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#fb923c", marginBottom: 4 }}>Workflow Engine</div>
          <div>Trigger: Form Submit ── <span style={{ color: "#10b981" }}>●</span></div>
          <div>{"  → Notify Manager ─── "}<span style={{ color: "#10b981" }}>●</span></div>
          <div>{"  → Update CRM ──────── "}<span style={{ color: "#10b981" }}>●</span></div>
          <div style={{ color: "#4b5563", marginTop: 5 }}>Runs today: 2,491</div>
        </div>
      ),
    },
    {
      category: "web",
      tag: "Web",
      tagColor: "#60a5fa",
      tagBg: "rgba(59,130,246,.12)",
      title: "Corporate Website Development",
      desc: "Performance-optimised corporate and business websites built with modern architecture — SEO-ready, brand-first, and engineered to convert visitors into leads.",
      techs: ["Next.js", "Tailwind CSS", "Vercel", "Figma"],
      metrics: [{ val: "100", label: "Lighthouse", color: "#3b82f6" }, { val: "SEO", label: "Optimised", color: "#10b981" }, { val: "Mobile", label: "First", color: "#8b5cf6" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#0a0f1a 0%,#0d1630 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#60a5fa", marginBottom: 4 }}>aureanorg.com — Live</div>
          <div>Performance ────── <span style={{ color: "#10b981" }}>100</span></div>
          <div>Accessibility ────── <span style={{ color: "#10b981" }}>100</span></div>
          <div>SEO ──────────────── <span style={{ color: "#10b981" }}>100</span></div>
          <div style={{ marginTop: 5, color: "#60a5fa" }}>★ Lighthouse Perfect Score</div>
        </div>
      ),
    },
    {
      category: "web",
      tag: "Design",
      tagColor: "#f472b6",
      tagBg: "rgba(236,72,153,.12)",
      title: "UI/UX Design System",
      desc: "Interface design grounded in usability, brand clarity, and user flow — delivered as Figma component libraries ready for direct engineering handoff across all project types.",
      techs: ["Figma", "Design Tokens", "ShadCN/UI", "Radix UI"],
      metrics: [{ val: "Components", label: "Library", color: "#ec4899" }, { val: "Accessible", label: "WCAG AA", color: "#8b5cf6" }, { val: "Handoff", label: "Ready", color: "#3b82f6" }],
      status: "Delivered",
      screenBg: "linear-gradient(135deg,#1a0a18 0%,#200d28 100%)",
      screen: (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <div style={{ color: "#f472b6", marginBottom: 4 }}>Design System v1.0</div>
          <div>Components ────── <span style={{ color: "#f472b6" }}>142</span></div>
          <div>Tokens Defined ─── <span style={{ color: "#a78bfa" }}>86</span></div>
          <div>Variants ─────────── <span style={{ color: "#60a5fa" }}>400+</span></div>
          <div style={{ marginTop: 5, color: "#10b981" }}>✓ Handoff complete</div>
        </div>
      ),
    },
  ]

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  // Shared fade-up style driven by React state — no CSS class observer needed
  const fadeUp = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span style={fadeUp(headerVisible, 0)} className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 style={fadeUp(headerVisible, 80)} className="text-3xl md:text-5xl font-bold text-white mb-4">
            Project <span className="gradient-text">Portfolio</span>
          </h2>
          <p style={fadeUp(headerVisible, 160)} className="text-gray-400 max-w-2xl mx-auto">
            Production-grade systems engineered for SMEs — every card is a real operational problem solved with custom software.
          </p>
        </div>

        {/* Filter bar */}
        <div style={fadeUp(headerVisible, 220)} className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm border transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white"
                  : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white bg-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid — keyed by filter so cards re-mount and re-animate on every filter change */}
        <div key={activeFilter} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              style={fadeUp(cardsVisible, i * 60)}
              className="group rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 overflow-hidden transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Mock screen preview */}
              <div
                className="h-44 flex items-center justify-center px-6 relative overflow-hidden"
                style={{ background: project.screenBg }}
              >
                <div className="w-56 bg-black/60 border border-white/10 rounded-xl p-3">
                  {project.screen}
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: project.tagBg, color: project.tagColor }}
                  >
                    {project.tag}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: project.status === "Live" ? "#10b981" : "#3b82f6",
                        boxShadow: project.status === "Live" ? "0 0 6px #10b981" : "none",
                      }}
                    />
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techs.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400 text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex-1 text-center">
                      <div className="text-sm font-bold" style={{ color: m.color }}>{m.val}</div>
                      <div className="text-xs text-gray-600 mt-0.5 uppercase tracking-wide">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flagship strip */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span style={fadeUp(cardsVisible, 0)} className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-3">
              Flagship Products
            </span>
            <h3 style={fadeUp(cardsVisible, 80)} className="text-2xl md:text-3xl font-bold text-white">
              Proprietary <span className="gradient-text">Platform Systems</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01", emoji: "🛒", title: "E-Commerce Platform", color: "#3b82f6",
                desc: "Fully scalable commerce infrastructure — product management, order orchestration, payment processing, and analytics. Built for businesses that have outgrown Shopify.",
                techs: ["Next.js", "NestJS", "PostgreSQL", "AWS"],
              },
              {
                num: "02", emoji: "📄", title: "Invoice Generator System", color: "#8b5cf6",
                desc: "Multi-tenant billing platform built for scale. Complex invoicing logic, automated payment tracking, PDF generation, and client management — a complete financial operations system.",
                techs: ["Next.js", "Supabase", "PDF Engine", "Multi-tenant"],
              },
              {
                num: "03", emoji: "📊", title: "Operations Dashboard", color: "#06b6d4",
                desc: "Business-critical command and control system aggregating live data, surfacing actionable KPIs, and giving leadership real-time intelligence to manage at scale.",
                techs: ["Next.js", "Recharts", "NestJS", "Real-time"],
              },
            ].map((f, i) => (
              <div
                key={f.title}
                style={fadeUp(cardsVisible, 160 + i * 80)}
                className="group relative p-7 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-[border-color,transform] duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${f.color}15 0%, transparent 65%)` }}
                />
                <div className="absolute top-5 right-6 text-5xl font-bold font-mono opacity-[0.06] text-white leading-none select-none">
                  {f.num}
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl" style={{ background: `${f.color}18` }}>
                  {f.emoji}
                </div>
                <h4 className="font-semibold text-white mb-2">{f.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {f.techs.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400 text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
      <WhyAureanSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}