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
import { motion, AnimatePresence } from "framer-motion";
import TestimonialSection from "@/components/TestimonialSection";

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

const CONTAINER_OPTIONS = [
  {
    id: "dry",
    title: "Dry Containers - 20’ & 40’",
    desc: "Dry containers are available in standard sizes of 10, 20, and 40 feet. They are designed for transporting general cargo and are the most commonly used type of shipping container worldwide. View a visual size comparison to better understand the dimensions of this popular container type.",
    img: "/dry_containers.png"
  },
  {
    id: "opentop",
    title: "Open Top Containers - 20’ & 40’",
    desc: "Open Top containers have a fully removable or convertible roof, allowing easy access to cargo from the top. They are primarily used for transporting over-height or bulky items that cannot be loaded through standard doors.",
    img: "/open_top_containers.png"
  },
  {
    id: "flatrack",
    title: "Flat Rack Containers - 20’ & 40’",
    desc: "Flat Rack containers feature collapsible sides, making them ideal for transporting heavy loads, oversized cargo, construction equipment, building materials, and large machinery.",
    img: "/flat_rack_containers.png"
  },
  {
    id: "reefer",
    title: "Refrigerated ISO Containers (Reefer Containers) – 20’ & 40’",
    desc: "Refrigerated ISO containers, commonly known as reefer containers, are designed to regulate temperature and preserve temperature-sensitive goods such as fresh produce, seafood, and pharmaceuticals. Please note that in the case of temperature-sensitive shipments, spoilage is typically only covered if it results from a mechanical failure of the container sustained over an extended period.",
    img: "/refrigerated_iso_containers.png"
  },
  {
    id: "tank",
    title: "Tank Containers – 20’",
    desc: "Tank containers are specifically designed for the transportation of liquid materials and are widely used across the shipping industry. They are typically constructed from strong, anti-corrosive materials such as stainless steel, ensuring durability, longevity, and protection of the cargo during transit.",
    img: "/tank_ontainers.png"
  }
];

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

  // Auto-change container type
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedContainer((prev) => {
        const currentIndex = CONTAINER_OPTIONS.findIndex(c => c.id === prev);
        const nextIndex = (currentIndex + 1) % CONTAINER_OPTIONS.length;
        return CONTAINER_OPTIONS[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [selectedContainer]);

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
                <span className="text-secondary text-sm md:text-base font-black tracking-[0.2em] uppercase">
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
            <span className="text-accent text-sm md:text-base font-black uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-accent" />
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

          <span className="text-accent text-sm md:text-base font-black uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-accent" />
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
            <span className="text-accent text-sm md:text-base font-black uppercase tracking-[0.2em]">
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

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                id: "01",
                title: "NVOCC Operations",
                desc: "Operating our own fleet and global network to provide reliable and cost-effective shipping solutions.",
                img: "/services/NVOCCO.png",
                icon: Anchor,
                link: "/services#nvocc"
              },
              {
                id: "02",
                title: "Freight Forwarding",
                desc: "Comprehensive door-to-door freight solutions across sea, air, rail, and land with global reach.",
                img: "/services/Freight_Forwarding.png",
                icon: Globe,
                link: "/services#freight-forwarding"
              },
              {
                id: "03",
                title: "Air Freight Logistics",
                desc: "Fast, secure and reliable air freight services for time-sensitive cargo across the world.",
                img: "/services/Air_Freight_Forwarding.png",
                icon: Plane,
                link: "/services#air-freight"
              },
              {
                id: "04",
                title: "Customs Brokerage",
                desc: "Expert handling of documentation, compliance, and clearance to ensure smooth cargo movement.",
                img: "/services/Customs_Brokerage.png",
                icon: FileCheck,
                link: "/services#customs-clearance"
              },
              {
                id: "05",
                title: "Project Cargo Handling",
                desc: "Specialized solutions for heavy-lift, oversized, and complex project cargo with precision and care.",
                img: "/services/DC_Project_Cargo_Handling.png",
                icon: Cpu,
                link: "/services#project-cargo"
              },
              {
                id: "06",
                title: "Container Trading",
                desc: "Sales, purchase, leasing & rental of all types of containers to meet your business needs.",
                img: "/services/Container_Trading.png",
                icon: Box,
                link: "/services#container-trading"
              },
              {
                id: "07",
                title: "Transportation Services",
                desc: "Reliable trucking and haulage services ensuring safe and on-time delivery to any destination.",
                img: "/services/Transportation_Services.png",
                icon: Truck,
                link: "/services#transportation"
              },
              {
                id: "08",
                title: "Liner Agency",
                desc: "Representing principal carriers and managing shipping lines with robust local agency services.",
                img: "/services/Liner Agency.png",
                icon: Ship,
                link: "/services#liner-agency"
              }
            ].map((svc) => (
              <div key={svc.id} className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
                <div className="h-[200px] w-full relative overflow-hidden bg-gray-50">
                  <img 
                    src={svc.img} 
                    alt={svc.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-white border-2 border-white/20 rounded-full p-2.5 shadow-md z-10 flex items-center justify-center">
                    <svc.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-end justify-between">
                    <div className="flex flex-col items-start">
                      <span className="text-white font-mono text-[14px] font-black tracking-widest">{svc.id}</span>
                      <span className="w-6 h-0.5 bg-accent mt-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between text-left">
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-2">{svc.title}</h3>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto w-full">
                    <div />
                    <Link href={svc.link} className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - CONTAINER TYPES */}
      <section className="py-20 bg-zinc-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm md:text-base font-bold uppercase tracking-widest">
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
            {/* Left Pane: Options */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {CONTAINER_OPTIONS.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedContainer(type.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    selectedContainer === type.id
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-white text-primary hover:bg-blue-50/20 border-gray-200"
                  }`}
                >
                  <div className="font-bold text-sm">{type.title.split(' - ')[0].split(' (')[0]}</div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedContainer === type.id ? 'translate-x-1 text-white' : 'text-gray-400 group-hover:translate-x-1 group-hover:text-primary'}`} />
                </button>
              ))}
            </div>

            {/* Right Pane: Display */}
            <div className="lg:col-span-8 flex flex-col bg-white border border-gray-200/80 p-8 md:p-12 rounded-3xl min-h-[460px] md:min-h-[480px] relative overflow-hidden shadow-sm">
              {(() => {
                const active = CONTAINER_OPTIONS.find(c => c.id === selectedContainer) || CONTAINER_OPTIONS[0];
                return (
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={active.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col h-full"
                    >
                      <div className="flex-1 flex items-center justify-center mb-8 relative w-full min-h-[240px]">
                        <img src={active.img} alt={active.title} className="max-w-full max-h-[300px] object-contain drop-shadow-xl" />
                      </div>
                      <div className="mt-auto border-t border-gray-100 pt-8">
                        <h3 className="text-2xl md:text-3xl font-black text-primary mb-4">{active.title}</h3>
                        <p className="text-gray-700 text-base md:text-lg leading-loose font-medium">{active.desc}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - WHY CHOOSE US */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-secondary text-sm md:text-base font-bold uppercase tracking-widest">
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
          <span className="inline-flex items-center gap-2 text-accent text-sm md:text-base font-black uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-[2px] bg-accent" />
            Global Presence
            <span className="w-8 h-[2px] bg-accent" />
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
      <TestimonialSection />


    </div>
  );
}
