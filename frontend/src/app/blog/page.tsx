"use client";

import React, { useState } from "react";
import { BookOpen, Calendar, Clock, User, ArrowRight, Anchor, Globe, Ship } from "lucide-react";

interface Post {
  id: number;
  title: string;
  category: "Shipping" | "Logistics" | "Freight" | "Industry News";
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  avatar: string;
}

const blogPosts: Post[] = [
  {
    id: 1,
    title: "Navigating Ocean Route Congestion in 2026",
    category: "Shipping",
    date: "June 12, 2026",
    readTime: "5 min read",
    author: "Capt. Rajesh Iyer",
    excerpt: "An in-depth analysis of major trade hub choke points and how feeder routes can circumvent port detention delays.",
    avatar: "RI",
  },
  {
    id: 2,
    title: "Understanding NVOCC Slot Charters & FCL Commitments",
    category: "Logistics",
    date: "May 28, 2026",
    readTime: "7 min read",
    author: "Sarah Al-Mansoori",
    excerpt: "How freight brokers can secure container slot allocations during high peak seasons using private NVOCC cargo networks.",
    avatar: "SM",
  },
  {
    id: 3,
    title: "The Rise of Eco-Friendly Bio-Fuels in Maritime Shipping",
    category: "Industry News",
    date: "May 15, 2026",
    readTime: "6 min read",
    author: "Lin Jin-Wei",
    excerpt: "Inspecting carbon offset initiatives and the transition of regional feeder vessels toward sustainable power modules.",
    avatar: "LW",
  },
  {
    id: 4,
    title: "Optimizing Multi-Modal Trucking from Dock to Warehouse",
    category: "Freight",
    date: "April 30, 2026",
    readTime: "4 min read",
    author: "Alex Vance",
    excerpt: "Practical metrics for reducing final mile delivery latency using automated trailer chassis allocation systems.",
    avatar: "AV",
  },
  {
    id: 5,
    title: "Customs Tariff Classification Guide for SME Shippers",
    category: "Logistics",
    date: "April 18, 2026",
    readTime: "8 min read",
    author: "Dinesh Kumar",
    excerpt: "Avoid expensive customs clearance audit penalties by understanding HS code structures and duty validations.",
    avatar: "DK",
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Shipping", "Logistics", "Freight", "Industry News"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(p => p.category === selectedCategory);

  return (
    <div id="blog_bg" className="w-full flex flex-col bg-white">
      {/* HERO: Floating Logistics Icons */}
      <section className="relative py-20 bg-gradient-to-b from-blue-900/10 via-sky-50/20 to-white overflow-hidden text-center">
        {/* Floating logistics icon background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-10">
          <div className="absolute top-[20%] left-[12%] animate-bounce text-primary" style={{ animationDuration: '6s' }}>
            <Anchor className="w-10 h-10" />
          </div>
          <div className="absolute top-[50%] right-[15%] animate-bounce text-secondary" style={{ animationDuration: '8s' }}>
            <Ship className="w-12 h-12" />
          </div>
          <div className="absolute top-[30%] left-[80%] animate-pulse text-accent">
            <Globe className="w-8 h-8" />
          </div>
        </div>

        <section className="relative py-20 overflow-hidden text-center">


        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

          <span className="text-secondary text-xs font-bold uppercase tracking-widest bg-secondary/10 px-4 py-1.5 rounded-full mb-4 inline-block">
            Publications
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
            Seatown Industry Insights & Logistics Blog
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base max-w-xl mx-auto">
            Stay updated with global trade trends, custom brokerage guidelines, and maritime route analyses.
          </p>
        </div>
        </section>
      </section>
      
    </div>
  );
}
