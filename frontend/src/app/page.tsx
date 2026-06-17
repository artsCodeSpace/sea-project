"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Ship,
  Globe,
  Clock,
  Users,
  Compass,
  ArrowRight,
  Anchor,
  Plane,
  FileCheck,
  Cpu,
  Truck,
  Box,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ExternalLink,
} from "lucide-react";
import OceanWaveDivider from "@/components/OceanWaveDivider";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";

// Custom Hook to trigger animation when scrolled into view
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting] as const;
}

export default function Home() {
  // Hero Stats Counter — auto-increments on page load
  const [heroStats, setHeroStats] = useState({ countries: 0, shipments: 0, partners: 0 });
  const [heroStarted, setHeroStarted] = useState(false);

  useEffect(() => {
    if (heroStarted) return;
    setHeroStarted(true);
    const duration = 2200;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3); // cubic ease-out

    const timer = setInterval(() => {
      step++;
      const progress = easeOut(step / steps);
      setHeroStats({
        countries: Math.floor(50 * progress),
        shipments: Math.floor(10000 * progress),
        partners: Math.floor(100 * progress),
      });
      if (step >= steps) {
        clearInterval(timer);
        setHeroStats({ countries: 50, shipments: 10000, partners: 100 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Selected Interactive 3D Container Model
  const [selectedContainer, setSelectedContainer] = useState("dry");

  // Testimonials Carousel
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "VP Supply Chain, TechCorp Asia",
      text: "Seatown restructured our oceanic route strategies. The NVOCC container operations saved us 12% on transshipment charges, and the shipping coordination was impeccable.",
      avatar: "MV",
    },
    {
      name: "Hiroshi Tanaka",
      role: "Logistics Director, Yokohama Auto Parts",
      text: "The container trading department supplied 100 high-spec reefer units at critical notice. Excellence in reliability, prompt customs clearances, and solid trust.",
      avatar: "HT",
    },
    {
      name: "Amara Al-Jamil",
      role: "Managing Director, Gulf Maritime Distributors",
      text: "Moving over-dimensional project machinery across oceans is stressful. Seatown handled the heavy crane charters and door delivery seamlessly. Highly recommended.",
      avatar: "AA",
    },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="w-full flex flex-col">
      {/* SECTION 1 - HERO BANNER */}
      {/* SECTION 1 - HERO BANNER & STATS BAR */}
      <section 
        className="relative min-h-[96vh] flex flex-col justify-between bg-[#030d1b] pt-32 pb-10 overflow-hidden text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #030d1b 0%, #030d1b 42%, rgba(3, 13, 27, 0.55) 70%, rgba(3, 13, 27, 0.15) 100%), url('/hero_cargo_ship.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Subtle grid layout overlay */}
        <div className="absolute inset-0 bg-[#030d1b]/20 pointer-events-none z-0" 
             style={{ 
               backgroundImage: "radial-gradient(rgba(0, 102, 204, 0.15) 1px, transparent 1px)", 
               backgroundSize: "32px 32px" 
             }} 
        />

        {/* Global Route SVG Background Overlay with labels (matching mock design) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Curved dashed lines representing connections */}
            <path d="M 50,40 Q 65,30 75,32" fill="none" stroke="#0066CC" strokeWidth="0.3" strokeDasharray="1, 3" className="animate-route-glow" />
            <path d="M 75,32 Q 85,50 90,65" fill="none" stroke="#0066CC" strokeWidth="0.3" strokeDasharray="1, 3" />
            <path d="M 50,40 Q 60,65 52,70" fill="none" stroke="#0066CC" strokeWidth="0.3" strokeDasharray="1, 3" />
            <path d="M 52,70 Q 70,80 90,65" fill="none" stroke="#0066CC" strokeWidth="0.3" strokeDasharray="1, 3" />
          </svg>

          {/* EUROPE */}
          <div className="absolute top-[30%] right-[25%] bg-[#0B1F3A]/85 border border-white/10 py-1 px-2.5 rounded-md text-[8.5px] font-black uppercase tracking-wider text-gray-300 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            EUROPE
          </div>

          {/* NORTH AMERICA */}
          <div className="absolute top-[38%] right-[48%] bg-[#0B1F3A]/85 border border-white/10 py-1 px-2.5 rounded-md text-[8.5px] font-black uppercase tracking-wider text-gray-300 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            NORTH AMERICA
          </div>

          {/* ASIA PACIFIC */}
          <div className="absolute top-[43%] right-[10%] bg-[#0B1F3A]/85 border border-white/10 py-1 px-2.5 rounded-md text-[8.5px] font-black uppercase tracking-wider text-gray-300 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            ASIA PACIFIC
          </div>

          {/* SOUTH AMERICA */}
          <div className="absolute top-[68%] right-[47%] bg-[#0B1F3A]/85 border border-white/10 py-1 px-2.5 rounded-md text-[8.5px] font-black uppercase tracking-wider text-gray-300 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            SOUTH AMERICA
          </div>

          {/* AUSTRALIA */}
          <div className="absolute top-[63%] right-[12%] bg-[#0B1F3A]/85 border border-white/10 py-1 px-2.5 rounded-md text-[8.5px] font-black uppercase tracking-wider text-gray-300 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            AUSTRALIA
          </div>
        </div>

        {/* Hero Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex-grow flex items-center mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
            <div className="lg:col-span-8 flex flex-col items-start text-left max-w-xl md:max-w-2xl">
              {/* NEXT GEN LABEL */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-secondary" />
                <span className="text-secondary font-black tracking-[0.2em] text-[10px] uppercase">
                  NEXT GEN MARITIME LOGISTICS
                </span>
              </div>

              {/* HEADING (matching mock layout) */}
              <h1 className="text-[38px] sm:text-[48px] lg:text-[58px] font-black leading-[1.08] mb-6 tracking-tight text-white">
                Connecting Global <br />
                Trade <span className="text-white">Across</span> <br />
                <span className="text-accent">Oceans & Borders</span>
              </h1>

              <p className="text-gray-300 font-semibold text-xs sm:text-sm mb-8 leading-relaxed max-w-lg">
                Seatown Container Line links major global markets with certified container shipping services, custom clearance networks, and premium cargo care.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?quote=1"
                  className="bg-gradient-to-r from-accent to-orange-500 hover:brightness-110 text-white pl-8 pr-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all flex items-center gap-2 group"
                >
                  Get Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="bg-transparent border border-white/20 hover:bg-white/5 text-white pl-8 pr-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all flex items-center gap-2"
                >
                  Explore Services
                  <Ship className="w-4 h-4 text-secondary" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING STATS BAR (matching bottom of the mockup) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 mt-8">
          <div className="bg-[#0B1F3A]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 shadow-2xl">
            {/* Stat 1 — Countries */}
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-secondary/15 text-secondary border border-secondary/20 rounded-2xl flex items-center justify-center shrink-0">
                <Globe className="w-5.5 h-5.5 text-secondary" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                  {heroStats.countries}<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Countries Connected</div>
              </div>
            </div>

            {/* Stat 2 — Shipments */}
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-secondary/15 text-secondary border border-secondary/20 rounded-2xl flex items-center justify-center shrink-0">
                <Ship className="w-5.5 h-5.5 text-secondary" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                  {heroStats.shipments.toLocaleString()}<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Shipments Handled</div>
              </div>
            </div>

            {/* Stat 3 — Partners */}
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-secondary/15 text-secondary border border-secondary/20 rounded-2xl flex items-center justify-center shrink-0">
                <Users className="w-5.5 h-5.5 text-secondary" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-white tabular-nums">
                  {heroStats.partners}<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Global Business Partners</div>
              </div>
            </div>

            {/* Stat 4 — 24/7 (static, no counter needed) */}
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-secondary/15 text-secondary border border-secondary/20 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-5.5 h-5.5 text-secondary" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-white">24/7</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - PREMIUM SPLIT-SCREEN ABOUT */}
      <section className="w-full flex flex-col lg:flex-row">

        {/* ── LEFT PANEL: Dark Navy Map ── */}
        <div className="lg:w-1/2 relative bg-[#040e1f] flex flex-col justify-between overflow-hidden p-8 md:p-10 min-h-[520px]">

          {/* Deep gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#040e1f] via-[#071628]/90 to-[#0b2042]/70 pointer-events-none" />
          {/* Subtle grid dots */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(0,102,204,0.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Top content */}
          <div className="relative z-10">
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-accent" />
              Global Trade Connections
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Strong Routes.<br />
              Stronger <span className="text-accent">Partnerships.</span>
            </h2>
            <p className="text-gray-400 text-xs font-semibold leading-relaxed max-w-xs">
              Connecting Chennai to key global ports with speed, reliability &amp; trust.
            </p>
          </div>

          {/* Ship icon top-right */}
          <div className="absolute top-8 right-8 z-10 p-3 bg-secondary/20 border border-secondary/30 rounded-2xl backdrop-blur-sm">
            <Ship className="w-6 h-6 text-secondary" />
          </div>

          {/* SVG World Route Map */}
          <div className="relative z-10 flex-grow flex items-center justify-center my-6">
            <svg viewBox="0 0 500 240" className="w-full" style={{ filter: 'drop-shadow(0 0 10px rgba(0,102,204,0.25))' }}>

              {/* Chennai origin */}
              <circle cx="295" cy="148" r="6" fill="#FF7A00" opacity="0.95" />
              <circle cx="295" cy="148" r="14" fill="#FF7A00" opacity="0.15">
                <animate attributeName="r" values="6;20;6" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="295" y="166" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800">CHENNAI</text>
              <text x="295" y="175" textAnchor="middle" fill="#9ca3af" fontSize="6">INDIA</text>

              {/* Europe – Rotterdam */}
              <path d="M295,148 Q210,55 118,72" fill="none" stroke="#0066CC" strokeWidth="1.3" strokeDasharray="5,3" opacity="0.85">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="2s" repeatCount="indefinite" />
              </path>
              <circle cx="118" cy="72" r="4.5" fill="#0066CC" opacity="0.9" />
              <text x="118" y="61" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">EUROPE</text>
              <text x="118" y="69" textAnchor="middle" fill="#9ca3af" fontSize="5.5">Rotterdam</text>

              {/* East Asia – Shanghai */}
              <path d="M295,148 Q358,80 415,66" fill="none" stroke="#0066CC" strokeWidth="1.3" strokeDasharray="5,3" opacity="0.85">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="2.4s" repeatCount="indefinite" />
              </path>
              <circle cx="415" cy="66" r="4.5" fill="#0066CC" opacity="0.9" />
              <text x="415" y="55" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">EAST ASIA</text>
              <text x="415" y="63" textAnchor="middle" fill="#9ca3af" fontSize="5.5">Shanghai</text>

              {/* Middle East – Jebel Ali */}
              <path d="M295,148 Q252,122 200,120" fill="none" stroke="#FF7A00" strokeWidth="1.3" strokeDasharray="5,3" opacity="0.78">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="1.8s" repeatCount="indefinite" />
              </path>
              <circle cx="200" cy="120" r="4.5" fill="#FF7A00" opacity="0.9" />
              <text x="185" y="109" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">MIDDLE EAST</text>
              <text x="185" y="117" textAnchor="middle" fill="#9ca3af" fontSize="5.5">Jebel Ali</text>

              {/* Southeast Asia – Singapore */}
              <path d="M295,148 Q350,150 392,152" fill="none" stroke="#0066CC" strokeWidth="1.3" strokeDasharray="5,3" opacity="0.85">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="2.2s" repeatCount="indefinite" />
              </path>
              <circle cx="392" cy="152" r="4.5" fill="#0066CC" opacity="0.9" />
              <text x="412" y="144" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">SOUTHEAST ASIA</text>
              <text x="412" y="152" textAnchor="middle" fill="#9ca3af" fontSize="5.5">Singapore</text>

              {/* Africa – Durban */}
              <path d="M295,148 Q228,168 175,205" fill="none" stroke="#FF7A00" strokeWidth="1.3" strokeDasharray="5,3" opacity="0.78">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="2.6s" repeatCount="indefinite" />
              </path>
              <circle cx="175" cy="205" r="4.5" fill="#FF7A00" opacity="0.9" />
              <text x="158" y="196" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">AFRICA</text>
              <text x="158" y="204" textAnchor="middle" fill="#9ca3af" fontSize="5.5">Durban</text>

              {/* Australia – Melbourne */}
              <path d="M295,148 Q375,195 420,218" fill="none" stroke="#0066CC" strokeWidth="1.3" strokeDasharray="5,3" opacity="0.85">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="3s" repeatCount="indefinite" />
              </path>
              <circle cx="420" cy="218" r="4.5" fill="#0066CC" opacity="0.9" />
              <text x="426" y="210" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">AUSTRALIA</text>
              <text x="426" y="218" textAnchor="middle" fill="#9ca3af" fontSize="5.5">Melbourne</text>
            </svg>
          </div>

          {/* Stats Bar */}
          <div className="relative z-10 grid grid-cols-4 gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-4 backdrop-blur-sm">
            {[
              { icon: Globe, value: '50+', label: 'Countries Connected' },
              { icon: Ship, value: '10,000+', label: 'Shipments Handled' },
              { icon: Users, value: '100+', label: 'Global Business Partners' },
              { icon: Clock, value: '24/7', label: 'Customer Support' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                <div className="p-2 bg-secondary/20 border border-secondary/20 rounded-xl">
                  <stat.icon className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-white font-black text-sm md:text-base leading-none">{stat.value}</div>
                <div className="text-gray-500 text-[8px] font-bold uppercase leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL: White About Content ── */}
        <div className="lg:w-1/2 bg-white flex flex-col justify-center px-8 md:px-12 lg:px-14 py-12">

          <span className="text-accent text-[10px] font-black uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-accent" />
            About Seatown Preview
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight mb-4">
            Your Trusted Logistics Partner<br />
            Across <span className="text-secondary">The Globe</span>
          </h2>

          <div className="w-10 h-[3px] bg-accent rounded-full mb-6" />

          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Seatown Container Line Pvt Ltd is a leading NVOCC and integrated logistics provider, delivering tailored shipping solutions that connect businesses to global markets.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            With a commitment to reliability, transparency, and operational excellence, we ensure your cargo reaches every destination—safely and on time.
          </p>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { icon: ShieldCheck, title: 'Reliable Operations', desc: 'Consistent schedules and dependable service you can trust.' },
              { icon: Globe, title: 'Global Network', desc: 'Strong connectivity across major ports worldwide.' },
              { icon: Box, title: 'Diverse Solutions', desc: 'From general cargo to project shipments, we handle it all.' },
              { icon: Users, title: 'Customer Focused', desc: 'Personalized support and 24/7 assistance at every step.' },
            ].map((feat, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-2 hover:border-secondary/30 hover:shadow-sm transition-all duration-300">
                <div className="p-2 bg-secondary/10 rounded-xl w-fit">
                  <feat.icon className="w-4 h-4 text-secondary" />
                </div>
                <div className="font-black text-xs text-primary leading-tight">{feat.title}</div>
                <p className="text-gray-500 text-[10px] font-semibold leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-md transition-all hover:-translate-y-0.5 group"
            >
              Discover More About Us
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 - SERVICES SHOWCASE */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Mockup Styled Header */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="w-6 h-[1.5px] bg-accent" />
            <span className="text-accent text-[11px] font-black uppercase tracking-[0.2em]">
              OUR SERVICES
            </span>
            <span className="w-6 h-[1.5px] bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mt-1 mb-3">
            Integrated Global <span className="text-secondary">Logistics Solutions</span>
          </h2>
          <p className="text-gray-500 text-xs font-semibold max-w-xl mx-auto mb-16 leading-relaxed">
            End-to-end logistics solutions designed to move your business forward. <br />
            Reliable. Efficient. Global.
          </p>

          {/* Row 1: 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Card 1: NVOCC */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=500&q=80" 
                  alt="NVOCC Operations" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <Anchor className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">01</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">NVOCC Operations</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Operating our own fleet and global network to provide reliable and cost-effective shipping solutions.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#nvocc" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Freight Forwarding */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80" 
                  alt="Freight Forwarding" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">02</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">Freight Forwarding</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Comprehensive door-to-door freight solutions across sea, air, rail, and land with global reach.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#freight-forwarding" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Air Freight */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80" 
                  alt="Air Freight Logistics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <Plane className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">03</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">Air Freight Logistics</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Fast, secure and reliable air freight services for time-sensitive cargo across the world.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#air-freight" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Customs Clearance */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=500&q=80" 
                  alt="Customs Clearance" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <FileCheck className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">04</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">Customs Clearance</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Expert handling of documentation, compliance, and clearance to ensure smooth cargo movement.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#customs-clearance" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: 3 Cards (Centered on large screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 5: Project Cargo */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=500&q=80" 
                  alt="Project Cargo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">05</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">Project Cargo</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Specialized solutions for heavy-lift, oversized, and complex project cargo with precision and care.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#project-cargo" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 6: Container Trading */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=500&q=80" 
                  alt="Container Trading" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <Box className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">06</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">Container Trading</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Sales, purchase, leasing & rental of all types of containers to meet your business needs.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#container-trading" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 7: Land Transportation */}
            <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
              <div className="h-[170px] w-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=500&q=80" 
                  alt="Land Transportation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-[14px] font-black tracking-widest">07</span>
                    <span className="w-6 h-0.5 bg-accent mt-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <h3 className="font-bold text-sm text-primary mb-2">Land Transportation</h3>
                  <p className="text-gray-500 text-[11px] font-semibold leading-relaxed mb-6">
                    Reliable trucking and haulage services ensuring safe and on-time delivery to any destination.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto w-full">
                  <div />
                  <Link href="/services#transportation" className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - CONTAINER TYPES */}
      <section className="py-20 bg-zinc-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">
              Asset Options
            </span>
            <h2 className="text-3xl font-extrabold text-primary mt-2">
              Interactive Container Fleet Specifications
            </h2>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Hover or tap on a container model to preview its structural characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Buttons list */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {[
                { id: "dry", label: "Dry Container (20' / 40')", desc: "Standard general cargo storage." },
                { id: "reefer", label: "Reefer Container", desc: "Climate and temperature controlled." },
                { id: "opentop", label: "Open Top Container", desc: "Easy overhead loading for high cargo." },
                { id: "flatrack", label: "Flat Rack", desc: "Heavy machinery and wide structures." },
                { id: "tank", label: "Tank Container", desc: "Certified liquid chemicals and foodstuff." },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedContainer(type.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                    selectedContainer === type.id
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-white text-primary hover:bg-blue-50/20 border-gray-200"
                  }`}
                >
                  <div className="font-bold text-sm">{type.label}</div>
                  <div className={`text-[11px] font-medium mt-1 ${selectedContainer === type.id ? 'text-gray-300' : 'text-gray-500'}`}>{type.desc}</div>
                </button>
              ))}
            </div>

            {/* 3D Visual Box Renderer */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center bg-white border border-gray-200/80 p-8 rounded-3xl h-[360px] relative overflow-hidden group shadow-sm">
              
              {/* CSS 3D Box model */}
              <div 
                className="w-48 h-28 relative transition-transform duration-700 select-none cursor-grab active:cursor-grabbing"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "800px",
                  transform: "rotateX(-18deg) rotateY(45deg)",
                }}
              >
                {/* Front Face */}
                <div 
                  className={`absolute inset-0 border-2 flex items-center justify-center font-bold text-white text-xs select-none transition-colors duration-500 ${
                    selectedContainer === "dry" ? "bg-primary border-primary-hover" :
                    selectedContainer === "reefer" ? "bg-blue-500 border-blue-600" :
                    selectedContainer === "opentop" ? "bg-orange-600 border-orange-700" :
                    selectedContainer === "flatrack" ? "bg-zinc-600 border-zinc-700" : "bg-emerald-600 border-emerald-700"
                  }`}
                  style={{ transform: "translateZ(30px)", backfaceVisibility: "hidden" }}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[9px] opacity-70">SEATOWN</span>
                    <span className="text-[10px]">CONTAINER</span>
                  </div>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 bg-primary/80 border-2 border-primary-hover flex items-center justify-center font-bold text-white text-xs"
                  style={{ transform: "rotateY(180deg) translateZ(30px)", backfaceVisibility: "hidden" }}
                >
                  LOCK
                </div>

                {/* Left Face */}
                <div 
                  className="absolute top-0 bottom-0 left-0 w-[60px] bg-primary/90 border-2 border-primary-hover"
                  style={{ transform: "rotateY(-90deg) translateZ(30px)", backfaceVisibility: "hidden" }}
                />

                {/* Right Face */}
                <div 
                  className="absolute top-0 bottom-0 right-0 w-[60px] bg-primary/95 border-2 border-primary-hover"
                  style={{ transform: "rotateY(90deg) translateZ(30px)", backfaceVisibility: "hidden" }}
                />

                {/* Top Face */}
                <div 
                  className={`absolute left-0 right-0 top-0 h-[60px] border-2 ${
                    selectedContainer === "opentop" ? "bg-transparent border-dashed border-primary" : "bg-primary/90 border-primary"
                  }`}
                  style={{ transform: "rotateX(90deg) translateZ(30px)", backfaceVisibility: "hidden" }}
                />

                {/* Bottom Face */}
                <div 
                  className="absolute left-0 right-0 bottom-0 h-[60px] bg-primary/85 border-2 border-primary"
                  style={{ transform: "rotateX(-90deg) translateZ(30px)", backfaceVisibility: "hidden" }}
                />
              </div>

              {/* Hover rotation info */}
              <div className="absolute bottom-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 animate-spin" /> 3D Rendering (CSS 3D Engine)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - WHY CHOOSE US */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            Corporate Trust
          </span>
          <h2 className="text-3xl font-extrabold text-primary mt-2 mb-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 leading-tight">
            Why Select
            <img
              src="/logo.png"
              alt="Seatown"
              className="h-8 w-auto object-contain inline-block"
            />
            For Ocean Logistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Global Reach", desc: "Access to 50+ countries via direct cargo shipping contracts.", icon: Globe },
              { title: "Secure Cargo", desc: "Comprehensive monitoring and ISO container seal protocols.", icon: ShieldCheck },
              { title: "Fast Delivery", desc: "Optimized route dispatching and minimal transshipment delays.", icon: TrendingUp },
              { title: "Professional Team", desc: "Maritime veterans, customs specialists, and 24/7 client dispatchers.", icon: Users },
              { title: "Competitive Pricing", desc: "Transparent, optimized contracts suited for SME and Enterprise.", icon: Anchor },
              { title: "Real-Time Support", desc: "Direct customer service coordinates with global agent networks.", icon: Clock },
            ].map((feature, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex items-start gap-4 text-left group">
                <div className="p-3 bg-secondary/5 text-secondary rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5.5 h-5.5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1.5">{feature.title}</h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - GLOBAL NETWORK */}
      <section className="py-20 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">
              Live Network
            </span>
            <h2 className="text-3xl font-extrabold text-primary mt-2">
              Seatown Global Service Map
            </h2>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Hover over or select port hubs to trace active container corridors.
            </p>
          </div>

          <InteractiveWorldMap />
        </div>
      </section>

      {/* SECTION — COUNTRIES WE ARE SERVING */}
      <section className="py-20 bg-[#040e1f] relative overflow-hidden">

        {/* Subtle grid dots background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(rgba(0,102,204,0.25) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* Gradient fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#040e1f] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#040e1f] to-transparent z-10 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-12 relative z-10 px-4">
          <span className="inline-flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-[0.25em] mb-4">
            <span className="w-6 h-[1.5px] bg-accent" />
            Global Presence
            <span className="w-6 h-[1.5px] bg-accent" />
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Countries We Are <span className="text-secondary">Serving</span>
          </h2>
          <p className="text-gray-400 text-sm font-semibold max-w-xl mx-auto">
            Connecting The World with Reliable Logistics Solutions
          </p>
        </div>

        {/* ROW 1 — scrolls LEFT */}
        {(() => {
          const row1 = [
            { code: "in", name: "India" },
            { code: "my", name: "Malaysia" },
            { code: "vn", name: "Vietnam" },
            { code: "sg", name: "Singapore" },
            { code: "th", name: "Thailand" },
            { code: "ru", name: "Russia" },
            { code: "us", name: "United States" },
          ];
          const items = [...row1, ...row1, ...row1, ...row1];
          return (
            <div className="overflow-hidden mb-4 relative z-0">
              <div className="animate-marquee" style={{ display: "flex", gap: "16px" }}>
                {items.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 shrink-0 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-9 h-6 rounded-md overflow-hidden border border-white/20 shadow-md shrink-0">
                      <img
                        src={`https://flagcdn.com/w80/${c.code}.png`}
                        alt={c.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap group-hover:text-secondary transition-colors">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ROW 2 — scrolls RIGHT (reverse) */}
        {(() => {
          const row2 = [
            { code: "gb", name: "United Kingdom" },
            { code: "lk", name: "Sri Lanka" },
            { code: "ae", name: "UAE" },
            { code: "bd", name: "Bangladesh" },
            { code: "id", name: "Indonesia" },
            { code: "hk", name: "Hong Kong" },
            { code: "cn", name: "China" },
          ];
          const items = [...row2, ...row2, ...row2, ...row2];
          return (
            <div className="overflow-hidden relative z-0">
              <div className="animate-marquee-reverse" style={{ display: "flex", gap: "16px" }}>
                {items.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 shrink-0 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-9 h-6 rounded-md overflow-hidden border border-white/20 shadow-md shrink-0">
                      <img
                        src={`https://flagcdn.com/w80/${c.code}.png`}
                        alt={c.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap group-hover:text-accent transition-colors">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Bottom stat strip */}
        <div className="text-center mt-10 relative z-10">
          <span className="inline-flex items-center gap-2 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Active operations across 14+ nations
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          </span>
        </div>
      </section>

      {/* SECTION 8 - TESTIMONIALS */}
      <section className="py-20 bg-white relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">
            Client Success
          </span>
          <h2 className="text-3xl font-extrabold text-primary mt-2 mb-12">
            Testimonials From Global Shippers
          </h2>

          <div className="bg-gradient-to-br from-blue-50/50 to-sky-50/30 border border-blue-200/20 p-8 md:p-12 rounded-3xl shadow-sm relative">
            {/* Quote icon mark */}
            <div className="absolute -top-6 left-10 text-accent text-6xl font-serif select-none pointer-events-none opacity-40">
              “
            </div>

            {/* Testimonial slider */}
            <p className="text-primary/95 text-base md:text-lg italic font-semibold leading-relaxed mb-6">
              {testimonials[currentTestimonial].text}
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-extrabold font-mono shadow-sm">
                {testimonials[currentTestimonial].avatar}
              </div>
              <div className="text-left">
                <div className="font-extrabold text-sm text-primary">{testimonials[currentTestimonial].name}</div>
                <div className="text-[11px] font-semibold text-gray-500">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-2 bg-white hover:bg-secondary hover:text-white border border-gray-200 rounded-xl transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-2 bg-white hover:bg-secondary hover:text-white border border-gray-200 rounded-xl transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
