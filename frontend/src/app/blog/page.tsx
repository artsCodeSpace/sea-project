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
    <div className="w-full flex flex-col bg-white">
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

      {/* FILTER TABS */}
      <section className="py-8 bg-zinc-50 border-y border-gray-100 sticky top-[70px] z-30 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center overflow-x-auto">
          <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="glass-card flex flex-col justify-between overflow-hidden rounded-2xl group border border-gray-200/50 shadow-sm">
                
                {/* Visual Category Badge */}
                <div className="p-6 pb-4 flex flex-col flex-grow text-left">
                  <span className="text-[10px] font-black uppercase text-accent tracking-wider mb-3 block">
                    {post.category}
                  </span>
                  
                  <h3 className="text-base font-black text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Metadata line */}
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-6 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="bg-zinc-50/80 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center font-mono">
                      {post.avatar}
                    </div>
                    <span className="text-[11px] font-bold text-primary">{post.author}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-secondary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-primary">No articles found</h3>
              <p className="text-gray-400 text-xs mt-1">Please try another filter category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
