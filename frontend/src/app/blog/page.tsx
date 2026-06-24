"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
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
  {
    id: 6,
    title: "Understanding Container Freight Station (CFS) Functions",
    category: "Logistics",
    date: "June 24, 2026",
    readTime: "6 min read",
    author: "James Collins",
    excerpt: "A comprehensive guide to CFS stuffing, de-stuffing, and cargo consolidation procedures for import-export logistics.",
    avatar: "JC",
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Shipping", "Logistics", "Freight", "Industry News"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full flex flex-col bg-white">
      <HeroSection 
        badge="Publications"
        title="Seatown Industry Insights & Logistics Blog"
        subtitle="Stay updated with global trade trends, customs brokerage guidelines, and maritime route analyses."
        bgImage="/blog.png"
      />

      {/* BLOG CONTENT SECTION */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent text-white border-accent shadow-sm scale-[1.02]"
                    : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                {/* Header Category Stripe */}
                <div className="p-6 pb-0 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-md">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg lg:text-xl text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Author & Date */}
                  <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/5">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-primary">{post.author}</div>
                        <div className="text-[10px] font-semibold text-gray-400">{post.date}</div>
                      </div>
                    </div>
                    
                    <span className="text-accent hover:text-accent-hover font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 group/link cursor-pointer">
                      Read More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
