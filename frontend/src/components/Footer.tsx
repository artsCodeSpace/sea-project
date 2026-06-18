"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import SeatownLogo from "./SeatownLogo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 relative overflow-hidden border-t-4 border-accent select-none">
      {/* Decorative background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief */}
          <div>
            <div className="flex items-center mb-6 bg-white px-4 py-3 rounded-2xl max-w-[260px] shadow-sm">
              <SeatownLogo height={30} />
            </div>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-6">
              Empowering global trade routes since 2012. Providing premium maritime logistics, NVOCC cargo shipping, and end-to-end container tracking solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-accent rounded-full transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-accent rounded-full transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-accent rounded-full transition-all" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">
              Explore Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">
              Primary Office
            </h4>
            <ul className="space-y-3.5 text-sm font-semibold text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                <span>
                  New No. 345 (Old No. 139), Second Floor,<br />
                  Paper Mills Road, Peravallur,<br />
                  Chennai 600 082.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <a href="tel:+914435103752" className="hover:text-white transition-colors">+91 44 35103752</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <a href="mailto:info@seatown.in" className="hover:text-white transition-colors">info@seatown.in</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Tracking */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">
              Cargo Advisory
            </h4>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-4">
              Subscribe to recieve global port congestion advisories, schedules, and custom clearance updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
              />
              <button className="bg-secondary hover:bg-secondary-hover px-4 rounded-xl text-sm font-bold transition-all uppercase tracking-wider">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-sm font-semibold text-gray-500">
            &copy; 2026 All rights reserved | by{" "}
            <a
              href="https://devspectra.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-white transition-colors font-bold"
            >
              DevSpectra
            </a>
          </p>
          <div className="flex gap-6 text-[11px] font-semibold text-gray-500">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-accent rounded-xl transition-all shadow-md group"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-gray-300 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
