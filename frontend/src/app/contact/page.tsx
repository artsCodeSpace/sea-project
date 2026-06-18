"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Ship, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "NVOCC",
    message: "",
  });

  // Check query string for get quote
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("quote") === "1") {
        setFormData(prev => ({ ...prev, message: "Requesting immediate freight rate inquiry." }));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "NVOCC", message: "" });
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* HERO: Animated vector map representation */}
      <section className="relative h-[45vh] flex items-center justify-center bg-gradient-to-b from-blue-900/10 via-sky-50/20 to-white overflow-hidden text-center select-none">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: "radial-gradient(#0B1F3A 1.5px, transparent 1.5px)", 
               backgroundSize: "30px 30px" 
             }} 
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest bg-secondary/10 px-4 py-1.5 rounded-full mb-4 inline-block">
            Connect
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
            Contact Seatown Ports
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base max-w-xl mx-auto">
            Get instant assistance for cargo booking slots, container sales, or custom clearance tracking.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS & FORM */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Info Cards & Interactive Pins */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <h2 className="text-2xl font-black text-primary mb-2">Corporate Headquarters</h2>
              
              {/* Card 1: India */}
              <div className="bg-white border border-gray-200/80 p-8 rounded-3xl flex flex-col items-start gap-6 hover:border-secondary hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4 w-full border-b border-gray-100 pb-4">
                  <div className="p-4 bg-secondary/10 text-secondary rounded-2xl group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-primary">Chennai Head Office</h3>
                    <span className="text-accent text-[10px] font-black uppercase tracking-widest">Global Operations Center</span>
                  </div>
                </div>
                
                <div className="w-full flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Registered Address</p>
                    <p className="text-gray-600 text-sm font-semibold leading-relaxed">
                      New No. 345 (Old No. 139), Second Floor,<br/>Paper Mills Road, Peravallur,<br/>Chennai 600 082.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Direct Line</p>
                      <p className="text-sm font-bold text-gray-700">+91 44 35103752</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Desk</p>
                      <p className="text-sm font-bold text-gray-700">info@seatown.in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form (Glassmorphism) */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 rounded-3xl border border-gray-200/80 shadow-lg text-left">
                <h2 className="text-2xl font-black text-primary mb-2">Inquiry Form</h2>
                <p className="text-gray-500 text-xs font-semibold mb-6">
                  Submit cargo requirements to receive immediate scheduling solutions.
                </p>

                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-600 mb-3 animate-bounce" />
                    <h3 className="text-base font-extrabold text-green-800">Message Transmitted</h3>
                    <p className="text-green-700 text-xs font-semibold mt-1">Our dispatch team will connect with booking confirmations shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-1.5">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-1.5">Interested Service</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                        >
                          <option value="NVOCC">NVOCC Shipping</option>
                          <option value="Freight">Freight Forwarding</option>
                          <option value="Air">Air Freight</option>
                          <option value="Customs">Customs Clearance</option>
                          <option value="Project">Project Cargo</option>
                          <option value="Trading">Container Trading</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-1.5">Inquiry Details</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-secondary transition-colors resize-none"
                        placeholder="State origin port, destination port, cargo volume, or container fleet sales requests..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary-hover text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      Transmit Message
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OFFICE LOCATION MAP */}
      <section className="py-16 bg-zinc-50 border-t border-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-primary mb-8">Visit Our Headquarters</h2>
          
          <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200 rounded-3xl overflow-hidden flex items-center justify-center shadow-lg border border-gray-200/80">
            <iframe
              src="https://maps.google.com/maps?q=New+No.+345,+Old+No.+139,+Paper+Mills+Road,+Peravallur,+Chennai+600082&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT FLOATING TRIGGERS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 select-none pointer-events-auto">
        <a 
          href="https://wa.me/914435103752" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
          title="WhatsApp Operations"
        >
          <MessageSquare className="w-5.5 h-5.5" />
        </a>
        <a 
          href="mailto:info@seatown.in" 
          className="p-3 bg-secondary hover:bg-secondary-hover text-white rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
          title="Email Operations"
        >
          <Mail className="w-5.5 h-5.5" />
        </a>
      </div>
    </div>
  );
}
