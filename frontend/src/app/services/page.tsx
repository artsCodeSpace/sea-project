"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Anchor, Globe, Plane, FileCheck, Cpu, Box, Truck, Compass, BookOpen, Clock, Shield } from "lucide-react";

export default function Services() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto transition process timeline steps for effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: "1. Digital Booking", desc: "Validate container availability and lock freight rates." },
    { title: "2. Documentation", desc: "Submit bills of lading, packing lists, and export forms." },
    { title: "3. Vessel Loading", desc: "Vessel container stuffing and customs clearances locked." },
    { title: "4. Cargo Delivery", desc: "Safe transshipment and final local trucking delivery." },
  ];

  return (
    <div className="w-full flex flex-col bg-white">
      {/* HERO: Cargo Vessel Animation */}
      <section className="relative h-[55vh] flex items-center justify-center bg-gradient-to-b from-blue-900/10 via-sky-50/20 to-white overflow-hidden text-center">
        {/* Sky Parallax clouds */}
        <div className="absolute inset-x-0 top-12 h-20 opacity-20 pointer-events-none">
          <div className="absolute top-4 left-[20%] w-32 h-8 bg-white rounded-full blur-md animate-pulse" />
          <div className="absolute top-8 left-[65%] w-48 h-12 bg-white rounded-full blur-lg animate-pulse" />
        </div>

        {/* Large Vessel sailing */}
        <div className="absolute inset-x-0 bottom-0 h-48 opacity-30 select-none pointer-events-none">
          <svg viewBox="0 0 1000 200" className="w-full h-full fill-primary">
            {/* Sea wave paths */}
            <path d="M 0,160 Q 250,140 500,160 T 1000,160 L 1000,200 L 0,200 Z" fill="#0066CC" opacity="0.3" />
            <path d="M 0,175 Q 250,160 500,175 T 1000,175 L 1000,200 L 0,200 Z" fill="#0B1F3A" opacity="0.5" />
            
            {/* Cargo Vessel */}
            <g className="animate-pulse" style={{ animationDuration: '7s' }}>
              <path d="M 150,165 L 850,165 L 820,185 L 180,185 Z" fill="#0B1F3A" />
              <rect x="250" y="140" width="450" height="25" fill="#FF7A00" rx="2" />
              <rect x="700" y="130" width="30" height="35" fill="#E2E8F0" />
            </g>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest bg-secondary/10 px-4 py-1.5 rounded-full mb-4 inline-block">
            Our Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
            Integrated Ocean & Air Transport
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base max-w-xl mx-auto">
            Providing custom logistics operations from Chennai, Dubai, and Singapore hubs.
          </p>
        </div>
      </section>

      {/* SERVICE DETAILS BLOCKS */}

      {/* 1. NVOCC */}
      <section id="nvocc" className="py-20 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">01 / Carrier Operations</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">NVOCC Services</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Seatown Container Line acts as a certified Non-Vessel Operating Common Carrier (NVOCC). We maintain slot charter contracts with major shipping lines while operating our own fleet of dry van and special ISO container equipment, guaranteeing priority bookings on busy regional lanes.
              </p>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-500">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Slot charter options on mainline carriers
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> High frequency schedules in Middle East and Southeast Asia
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Full Container Load (FCL) bookings
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-6 bg-zinc-50 border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden relative">
              {/* Vessel animated silhouette */}
              <div className="w-[80%] h-24 relative select-none pointer-events-none">
                <svg viewBox="0 0 200 80" className="w-full h-full fill-primary">
                  <path d="M 20,60 L 180,60 L 170,70 L 30,70 Z" />
                  <rect x="50" y="45" width="80" height="15" fill="#0066CC" />
                  {/* Floating waves */}
                  <path d="M0,68 C30,64 60,72 90,68 C120,64 150,72 180,68" fill="none" stroke="#FF7A00" strokeWidth="1" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Freight Forwarding */}
      <section id="freight-forwarding" className="py-20 border-b border-gray-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">02 / Route Consolidation</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Ocean Freight Forwarding</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Through our trusted network of global logistics partners, we organize multi-modal transport lines spanning water barge, feeder routes, and transshipment terminals to deliver cargo directly from manufacturers to end warehouses.
              </p>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-500">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> LCL consolidation routes for small consignments
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Multimodal barge and rail tracking integration
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Door-to-door (DDU/DDP) fulfillment structures
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-6 lg:order-1 bg-white border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden">
              {/* Dynamic route dots */}
              <svg className="w-[80%] h-full max-h-[160px]" viewBox="0 0 100 50">
                <line x1="10" y1="25" x2="90" y2="25" stroke="#ccc" strokeWidth="0.5" strokeDasharray="1 2" />
                <circle cx="10" cy="25" r="4" fill="#0B1F3A" />
                <circle cx="50" cy="25" r="4" fill="#0066CC" />
                <circle cx="90" cy="25" r="4" fill="#FF7A00" />
                {/* Flow indicator */}
                <circle cx="10" cy="25" r="1.5" fill="white" className="animate-ping" style={{ transformOrigin: "10px 25px" }} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Air Freight */}
      <section id="air-freight" className="py-20 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">03 / Rapid Transit</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Air Freight</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                When shipping latency is the critical parameter, our air freight division schedules immediate space allocations on primary international cargo airlines. We organize fast handling for electronics, parts, pharmaceutical, and high-value trade shipments.
              </p>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-500">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Express customs arrival dispatch
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Part-charters for special large shipments
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Direct integrations at Chennai & Dubai airports
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-6 bg-zinc-50 border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden relative group">
              {/* Aircraft crossing visual with cloud parallax */}
              <div className="absolute inset-0 bg-sky-100/35 pointer-events-none" />
              <div className="absolute top-12 left-10 text-sky-950/20 group-hover:translate-x-12 transition-transform duration-[4000ms]">
                <Plane className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Customs Clearance */}
      <section id="customs-clearance" className="py-20 border-b border-gray-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">04 / Cargo Compliance</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Customs Clearance & Brokerage</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Our in-house customs agents manage paperwork filing, HS code classifications, cargo physical inspections, duty validations, and release coordination, preventing detention penalties at high-volume port terminals.
              </p>
            </div>
            
            <div className="lg:col-span-6 lg:order-1 bg-white border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden relative">
              <div className="border border-secondary/20 p-6 rounded-2xl bg-slate-50/50 max-w-xs text-center flex flex-col items-center">
                <FileCheck className="w-8 h-8 text-secondary mb-3" />
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Documentation check</div>
                <div className="bg-emerald-600 text-white font-bold text-xs py-1 px-4 rounded transform rotate-[-12deg] shadow-sm animate-stamp">
                  APPROVED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Project Cargo */}
      <section id="project-cargo" className="py-20 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">05 / Heavy Lift Logistics</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Project Cargo</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Over-dimensional, heavy, and complex machinery moves require precision design engineering. Seatown coordinates crane rentals, site inspections, and specialized vessel charters for infrastructure turbines, rigs, and industrial equipment.
              </p>
            </div>
            
            <div className="lg:col-span-6 bg-zinc-50 border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden">
              {/* Heavy crane hoist representation */}
              <svg className="w-32 h-32 fill-primary">
                {/* Simple crane body */}
                <line x1="20" y1="120" x2="80" y2="20" stroke="#0B1F3A" strokeWidth="4" />
                <line x1="80" y1="20" x2="110" y2="20" stroke="#0066CC" strokeWidth="3" />
                {/* Cargo */}
                <rect x="80" y="45" width="24" height="16" fill="#FF7A00" className="animate-bounce" style={{ animationDuration: '4s' }} rx="1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Container Trading */}
      <section id="container-trading" className="py-20 border-b border-gray-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">06 / Asset Management</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Container Trading & Sales</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                We supply new and used cargo-worthy ISO containers (20', 40' Dry, Reefers, Open Tops) for global trading, storage, or custom structural builds, with direct delivery to site yards.
              </p>
            </div>
            
            <div className="lg:col-span-6 lg:order-1 bg-white border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden relative">
              <div className="grid grid-cols-3 gap-3">
                <div className="w-14 h-8 bg-secondary rounded border border-secondary/20 shadow-sm" />
                <div className="w-14 h-8 bg-primary rounded border border-primary/20 shadow-sm animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="w-14 h-8 bg-accent rounded border border-accent/20 shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Transportation */}
      <section id="transportation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">07 / Multi-Modal Link</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Land Transportation & Haulage</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Providing seamless container trucking hookups directly from port vessel discharges to inland logistics depots and customer store fronts.
              </p>
            </div>
            
            <div className="lg:col-span-6 bg-zinc-50 border border-gray-200/80 p-8 rounded-3xl h-[280px] flex items-center justify-center overflow-hidden relative group">
              <div className="text-secondary/20 group-hover:text-secondary group-hover:translate-x-28 transition-transform duration-[3500ms]">
                <Truck className="w-20 h-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-zinc-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">
              Schedules
            </span>
            <h2 className="text-3xl font-extrabold text-primary mt-2">
              Our Standard Booking Process
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 hidden md:block transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {/* Steps Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, idx) => (
                <div 
                  key={step.title} 
                  onClick={() => setActiveStep(idx)}
                  className="cursor-pointer flex flex-col items-center text-center group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:border-secondary transition-all"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-accent text-white border-accent shadow-md scale-110"
                        : "bg-white text-primary border-gray-300 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="font-extrabold text-primary text-xs mt-4 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-[10px] font-semibold mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
