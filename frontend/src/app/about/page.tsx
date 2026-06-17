"use client";

import React, { useState, useEffect } from "react";
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
    { icon: Globe, value: "50+", label: "Countries Connected" },
    { icon: Ship, value: "10,000+", label: "Shipments Handled" },
    { icon: Users, value: "100+", label: "Business Partners" },
    { icon: Compass, value: "24/7", label: "Customer Support" },
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
          HERO — SPLIT SCREEN
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[540px] items-center py-16 lg:py-20">

            {/* LEFT: Text Content */}
            <div className="flex flex-col items-start pr-0 lg:pr-12 z-10">

              {/* Label */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span className="text-accent text-[11px] font-black uppercase tracking-[0.25em]">Who We Are</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-black text-primary leading-[1.07] mb-4">
                Charting Safe Ocean<br />
                Shipping Routes<br />
                <span className="text-secondary">Worldwide</span>
              </h1>

              {/* Orange underline */}
              <div className="w-12 h-[3px] bg-accent rounded-full mb-6" />

              {/* Paragraphs */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-md">
                Seatown Container Line Pvt Ltd is a trusted NVOCC and integrated logistics provider delivering reliable, efficient and tailor-made shipping solutions to businesses around the world.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md">
                With a strong global network, experienced team and commitment to excellence, we ensure your cargo moves safely, on time, every time.
              </p>

              {/* Inline Feature Pills */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
                {features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="p-1.5 bg-secondary/10 rounded-lg">
                      <feat.icon className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-xs font-bold text-primary">{feat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about#journey"
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-lg transition-all hover:-translate-y-0.5 group"
                >
                  Our Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* RIGHT: Ship Image + Floating Stats */}
            <div className="relative flex items-center justify-center mt-10 lg:mt-0 min-h-[420px]">

              {/* Ship image with clipped dark-navy blob shape */}
              <div
                className="relative w-full max-w-[520px] h-[380px] md:h-[440px] overflow-hidden shadow-2xl"
                style={{
                  borderRadius: "60% 40% 40% 60% / 50% 50% 50% 50%",
                  background: "#0B1F3A",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=85"
                  alt="Seatown container ship at port"
                  className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                  style={{ mixBlendMode: "normal" }}
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/60 via-transparent to-transparent" />
              </div>

              {/* Floating Stat Cards — stacked on the right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#0B1F3A] text-white rounded-2xl px-4 py-3 shadow-xl border border-white/10 min-w-[155px]"
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    <div className="p-2 bg-secondary/20 border border-secondary/20 rounded-xl shrink-0">
                      <stat.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-lg font-black leading-none text-white">{stat.value}</div>
                      <div className="text-[9px] font-bold uppercase text-gray-400 tracking-wide leading-tight mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: "radial-gradient(rgba(0,102,204,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════
          MISSION / VISION / VALUES / PROMISE — 4 CARDS
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Mission */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Ship className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-black text-primary text-sm">Our Mission</h3>
              </div>
              <div className="w-8 h-[2.5px] bg-accent rounded-full mb-3" />
              <p className="text-gray-500 text-[11.5px] font-semibold leading-relaxed">
                To deliver dependable logistics solutions through innovation, transparency and operational excellence.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Eye className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-black text-primary text-sm">Our Vision</h3>
              </div>
              <div className="w-8 h-[2.5px] bg-accent rounded-full mb-3" />
              <p className="text-gray-500 text-[11.5px] font-semibold leading-relaxed">
                To be a globally respected logistics partner recognized for reliability, integrity and customer success.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Gem className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-black text-primary text-sm">Our Values</h3>
              </div>
              <div className="w-8 h-[2.5px] bg-accent rounded-full mb-3" />
              <ul className="space-y-1.5">
                {["Integrity & Transparency", "Safety & Compliance", "Commitment & Reliability", "People & Partnerships"].map((v, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* Promise */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-secondary/10 border border-secondary/15 rounded-xl">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-black text-primary text-sm">Our Promise</h3>
              </div>
              <div className="w-8 h-[2.5px] bg-accent rounded-full mb-3" />
              <p className="text-gray-500 text-[11.5px] font-semibold leading-relaxed">
                We promise safe cargo, on-time delivery and long-term partnerships built on trust.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TIMELINE — OUR JOURNEY
      ═══════════════════════════════════════════════════ */}
      <section id="journey" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-primary mt-2">Seatown Expansion Timeline</h2>
            <p className="text-gray-500 text-xs font-semibold mt-1">Select a year to see how our operations scaled globally.</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-secondary -translate-y-1/2 hidden md:block transition-all duration-500"
              style={{ width: `${(activeTimeline / (timelineSteps.length - 1)) * 100}%` }}
            />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div
                  key={step.year}
                  onClick={() => setActiveTimeline(idx)}
                  className="cursor-pointer flex flex-col items-center text-center group"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                      activeTimeline === idx
                        ? "bg-secondary text-white border-secondary shadow-lg scale-110"
                        : "bg-white text-primary border-gray-300 hover:border-secondary hover:text-secondary"
                    }`}
                  >
                    {step.year}
                  </div>
                  <h3 className="font-extrabold text-primary text-sm mt-4 group-hover:text-secondary transition-colors">{step.title}</h3>
                  <p className="text-gray-500 text-[11px] font-semibold mt-2 max-w-[200px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LEADERSHIP TEAM
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-zinc-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Leadership</span>
          <h2 className="text-3xl font-extrabold text-primary mt-2 mb-12">The Seatown Command</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Capt. Rajesh Iyer", role: "Chief Executive Officer & Founder", initials: "RI" },
              { name: "Sarah Al-Mansoori", role: "Chief Operating Officer", initials: "SM" },
              { name: "Lin Jin-Wei", role: "Head of Global Container Fleet Operations", initials: "LW" },
            ].map((member, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center group relative overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
                  {member.initials}
                </div>
                <h3 className="font-bold text-primary text-sm mb-1">{member.name}</h3>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-6">{member.role}</p>
                <div className="flex gap-4 border-t border-gray-100 pt-4 w-full justify-center">
                  <a href="#" className="p-2 bg-gray-50 hover:bg-secondary hover:text-white rounded-lg text-gray-400 transition-colors" aria-label="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-gray-50 hover:bg-secondary hover:text-white rounded-lg text-gray-400 transition-colors" aria-label="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
