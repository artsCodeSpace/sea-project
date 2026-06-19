"use client";

import React, { useState, useEffect, useRef } from "react";

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

function AnimatedCounter({ end, suffix, className }: { end: number; suffix: string; className?: string }) {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      let startTime: number;
      const duration = 2000; // 2 seconds

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isIntersecting, end]);

  return (
    <div ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}
import Link from "next/link";
import {
  Globe,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  Ship,
  Eye,
  Gem,
  Award,
  CheckCircle,
  Compass,
  Mail,
  Clock,
} from "lucide-react";

export default function AboutUs() {
  // Timeline Active Step
  const [activeTimeline, setActiveTimeline] = useState(0);
  const timelineSteps = [
    { year: "2012", title: "Founded", desc: "Seatown Container Line was established in Chennai, India with 2 local vessel arrangements." },
    { year: "2016", title: "Corridor Growth", desc: "Acquired first dry container fleet inventory and established the UAE corridor." },
    { year: "2020", title: "Global Expansion", desc: "Incorporated NVOCC operations in Singapore, Malaysia, and ports across China." },
    { year: "2024", title: "Digital Operations", desc: "Implemented integrated container tracking and consolidated project cargo services." },
    { year: "2026", title: "Future Vision", desc: "Targeting carbon-offset logistics and expanding regional feeder logistics routes." },
  ];

  // Rotating Compass
  const [compassAngle, setCompassAngle] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCompassAngle((p) => (p + 90) % 360), 4000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Globe, num: 50, suffix: "+", label: "Countries Connected" },
    { icon: Ship, num: 10000, suffix: "+", label: "Shipments Handled" },
    { icon: Users, num: 100, suffix: "+", label: "Business Partners" },
    { icon: Clock, num: 24, suffix: "/7", label: "Customer Support" },
  ];

  const features = [
    { icon: Globe, label: "Global Network" },
    { icon: Shield, label: "Reliable Operations" },
    { icon: Users, label: "Customer Focused" },
    { icon: TrendingUp, label: "Proven Expertise" },
  ];

  return (
    <div className="w-full flex flex-col">

      {/* ═══════════════════════════════════════════════════
          HERO — FULL VIEW BANNER
      ═══════════════════════════════════════════════════ */}
      <section 
        className="w-full relative h-[45vh] md:h-[55vh] mt-20 flex items-center justify-center bg-white"
        style={{
          backgroundImage: "url('/banners/aboutus.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Text Overlay directly on the un-tinted image */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 inline-block shadow-sm border border-secondary/10">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight drop-shadow-md">
            About Seatown Container Line
          </h1>
          <p className="text-primary font-bold text-sm md:text-base max-w-xl mx-auto drop-shadow-md">
            Charting Safe Ocean Shipping Routes Worldwide
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT CONTENT & STATS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-black text-primary mb-6">Our Story</h2>
              <div className="w-12 h-[3px] bg-accent rounded-full mb-8" />
              
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-5">
                <strong className="text-primary font-black">SEATOWN CONTAINER LINE</strong> is one of the fastest-growing shipping and logistics companies, specializing in NVOCC, freight forwarding, air cargo, container trading, customs brokerage, and transportation services across India. Established in 2025, our head office is in Chennai, with planned branches in Mundra, Nhava Sheva, and Tuticorin, as well as ICD locations across India.
              </p>
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-5">
                Since our inception, we have rapidly expanded and are now a regular container carrier serving the Middle East, Far East, Indian Subcontinent (ISC), Southeast Asia, Red Sea Ports, Africa, Russia, Europe, the USA, and the UK.
              </p>
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-5">
                We are committed to creating value for our clients through innovative partnerships and cutting-edge technology. Our motto, &quot;Customer Satisfaction,&quot; drives our dedicated team to provide reliable, efficient, and cost-effective services. Our professionally trained staff ensures quality shipping solutions at all times.
              </p>
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-10">
                At SEATOWN CONTAINER LINE, we continue to explore, expand, and grow in the cargo transportation and logistics industry by delivering high-quality services. Our goal is to make global trade seamless and accessible for our clients through our shipping and logistics expertise.
              </p>

              {/* Inline Feature Pills */}
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <feat.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-sm md:text-[15px] font-bold text-primary">{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-4 bg-[#0B1F3A] text-white rounded-3xl p-8 md:p-10 shadow-xl border border-white/10 text-center hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="p-3 bg-secondary/20 border border-secondary/20 rounded-2xl">
                      <stat.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <AnimatedCounter end={stat.num} suffix={stat.suffix} className="text-4xl md:text-5xl font-black leading-none text-white mb-3" />
                      <div className="text-xs md:text-sm font-bold uppercase text-gray-400 tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MISSION / VISION / VALUES / PROMISE — 4 CARDS
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Mission */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Ship className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary">Our Mission</h3>
              </div>
              <div className="w-10 h-[3px] bg-accent rounded-full mb-4" />
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-medium">
                &quot;To provide reliable, efficient, and sustainable shipping solutions that connect businesses and communities worldwide. We are committed to delivering excellence through innovation, safety, and environmental responsibility while ensuring customer satisfaction and operational efficiency.&quot;
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary">Our Vision</h3>
              </div>
              <div className="w-10 h-[3px] bg-accent rounded-full mb-4" />
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-medium">
                &quot;To be the world&apos;s leading shipping company, pioneering eco-friendly logistics, enhancing global trade, and redefining maritime transportation with cutting-edge technology and exceptional service.&quot;
              </p>
            </div>

            {/* What We Do */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary">What We Do</h3>
              </div>
              <div className="w-10 h-[3px] bg-accent rounded-full mb-4" />
              <ul className="space-y-3 text-gray-600 text-sm md:text-[15px] leading-relaxed font-medium mb-4">
                <li><strong className="text-primary font-bold">Get Set Go</strong> &ndash; Swift shipping solutions.</li>
                <li><strong className="text-primary font-bold">Consider It Done</strong> &ndash; Customized multimodal transport.</li>
                <li><strong className="text-primary font-bold">Professionally Yours</strong> &ndash; Top-tier global network.</li>
              </ul>
              <p className="text-gray-500 text-xs md:text-sm font-semibold leading-relaxed border-t border-gray-100 pt-4">
                With in-depth industry knowledge and a strong network, we deliver exceptional service.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Gem className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary">Our Core Values</h3>
              </div>
              <div className="w-10 h-[3px] bg-accent rounded-full mb-4" />
              <ul className="space-y-4 text-gray-600 text-sm md:text-[15px] leading-relaxed font-medium">
                <li><strong className="text-primary font-bold block mb-1">Be Safe, Not Sorry</strong> Safety is our top priority. Prevention is better than regret.</li>
                <li><strong className="text-primary font-bold block mb-1">Customers Always in Mind</strong> We listen, learn, and anticipate needs because their success is ours.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}
