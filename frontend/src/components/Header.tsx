"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Send } from "lucide-react";
import SeatownLogo from "./SeatownLogo";

const services = [
  { name: "NVOCC", path: "/services#nvocc" },
  { name: "Freight Forwarding", path: "/services#freight-forwarding" },
  { name: "Air Freight", path: "/services#air-freight" },
  { name: "Customs Clearance", path: "/services#customs-clearance" },
  { name: "Project Cargo", path: "/services#project-cargo" },
  { name: "Container Trading", path: "/services#container-trading" },
  { name: "Transportation", path: "/services#transportation" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-[30px] inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3.5 bg-primary/90 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "py-5 bg-gradient-to-b from-primary/80 to-transparent backdrop-blur-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo — white pill so PNG is visible on dark header */}
          <Link href="/" className="flex items-center group">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm">
              <SeatownLogo height={32} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9">
            <Link
              href="/"
              className={`text-[13px] font-bold uppercase tracking-wider relative transition-colors ${
                isActive("/") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute left-0 right-0 -bottom-2 h-[2.5px] bg-accent rounded-full animate-pulse" />
              )}
            </Link>

            <Link
              href="/about"
              className={`text-[13px] font-bold uppercase tracking-wider relative transition-colors ${
                isActive("/about") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              About Us
              {isActive("/about") && (
                <span className="absolute left-0 right-0 -bottom-2 h-[2.5px] bg-accent rounded-full" />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`text-[13px] font-bold uppercase tracking-wider relative transition-colors flex items-center gap-1 ${
                  isActive("/services") ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                Services
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                {isActive("/services") && (
                  <span className="absolute left-0 right-0 -bottom-2 h-[2.5px] bg-accent rounded-full" />
                )}
              </Link>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-3 w-60 bg-primary/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 py-3 transition-all duration-300 origin-top-left ${
                  servicesDropdownOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.path}
                    className="block px-5 py-2.5 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              className={`text-[13px] font-bold uppercase tracking-wider relative transition-colors ${
                isActive("/blog") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Blog
              {isActive("/blog") && (
                <span className="absolute left-0 right-0 -bottom-2 h-[2.5px] bg-accent rounded-full" />
              )}
            </Link>

            <Link
              href="/contact"
              className={`text-[13px] font-bold uppercase tracking-wider relative transition-colors ${
                isActive("/contact") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Contact
              {isActive("/contact") && (
                <span className="absolute left-0 right-0 -bottom-2 h-[2.5px] bg-accent rounded-full" />
              )}
            </Link>
          </nav>

          {/* Quick CTA Actions */}
          <div className="hidden md:flex items-center">
            {/* Premium Orange Get Quote CTA */}
            <Link
              href="/contact?quote=1"
              className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-accent to-orange-500 text-white pl-6 pr-5 py-3 rounded-xl hover:brightness-110 shadow-lg transition-all flex items-center gap-2 group"
            >
              Get Quote
              <Send className="w-3.5 h-3.5 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-accent rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Styled dark to match the header) */}
      <div
        className={`fixed inset-0 top-[70px] z-30 bg-primary/98 backdrop-blur-xl border-t border-white/10 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-bold uppercase tracking-wider ${isActive("/") ? "text-accent" : "text-white"}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-bold uppercase tracking-wider ${isActive("/about") ? "text-accent" : "text-white"}`}
          >
            About Us
          </Link>
          <div className="flex flex-col gap-2">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-bold uppercase tracking-wider ${isActive("/services") ? "text-accent" : "text-white"}`}
            >
              Services
            </Link>
            <div className="pl-4 border-l border-white/10 flex flex-col gap-3.5 mt-2">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-gray-400 hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-bold uppercase tracking-wider ${isActive("/blog") ? "text-accent" : "text-white"}`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-base font-bold uppercase tracking-wider ${isActive("/contact") ? "text-accent" : "text-white"}`}
          >
            Contact
          </Link>

          <div className="mt-8 border-t border-white/10 pt-6">
            <Link
              href="/contact?quote=1"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block bg-gradient-to-r from-accent to-orange-500 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
