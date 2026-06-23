"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GsapAnimation from "@/components/GsapAnimation";
import HeroSection from '@/components/HeroSection';

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
    <>
      {/* HERO: Cargo Vessel Animation */}
      <HeroSection 
        badge="Schedules & Operations"
        title="Our Services"
        subtitle="End-to-end logistics solutions designed to move your business forward."
        bgImage="/services/heropage.jpeg"
      />
      <GsapAnimation targetId="ani-img" />

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
            
            <div id="ani-img" className="lg:col-span-6 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/container-ship-sailing.png"
                alt="Container Ship Sailing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
            
            <div id="ani-img" className="lg:col-span-6 lg:order-1 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/oceanfreight.avif"
                alt="Ocean Freight Forwarding"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
            
            <div id="ani-img" className="lg:col-span-6 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/airfreight.avif"
                alt="Air Freight"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
            
            <div id="ani-img" className="lg:col-span-6 lg:order-1 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/custombrokerage.jpeg"
                alt="Customs Brokerage"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
            
            <div id="ani-img" className="lg:col-span-6 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/projectcargo.avif"
                alt="Project Cargo Logistics"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
            
            <div id="ani-img" className="lg:col-span-6 lg:order-1 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/containertrading.jpeg"
                alt="Container Trading & Sales"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
            
            <div id="ani-img" className="lg:col-span-6 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/landtransport.avif"
                alt="Land Transportation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Linear Agency */}
      <section id="linear-agency" className="py-20 border-b border-gray-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 text-left">
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">08 / Strategic Agency Network</span>
              <h2 className="text-2xl md:text-3xl font-black text-primary mt-2 mb-6">Linear Agency</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Acting as a trusted representative for principals, we coordinate with local authorities, terminal operators, and logistics partners to streamline operations and deliver exceptional stakeholder satisfaction.</p>
            </div>
            
            <div id="ani-img" className="lg:col-span-6 lg:order-1 relative h-[320px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src="/services/linearagency.png"
                alt="Container Trading & Sales"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
    </>
  );
}
