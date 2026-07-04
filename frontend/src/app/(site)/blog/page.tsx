"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { Clock, ArrowRight, Loader2 } from "lucide-react";

interface Post {
  id: string | number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  avatar: string;
  slug: string;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);

        if (!res.ok) {
          console.error("Blog API failed:", res.status);
          setAllPosts([]);
          return;
        }

        const data = await res.json();

        const blogs = Array.isArray(data?.blogs) ? data.blogs : [];

        const mapped: Post[] = blogs.map((b: any) => ({
          id: b.id,
          title: b.title || "Untitled",
          category: b.category || "Industry News",
          date: new Date(b.published_at || b.created_at || Date.now()).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          ),
          readTime: `${b.reading_time_minutes ?? 5} min read`,
          author: b.author_name || b.author || "Seatown Insights",
          excerpt: b.excerpt || b.meta_description || "",
          avatar: (b.author_name || b.author || "S")
            .split(" ")
            .map((n: string) => n[0])
            .join(""),
          slug: b.slug || String(b.id),
        }));

        setAllPosts(mapped);
      } catch (err) {
        console.error("Blog fetch error:", err);
        setAllPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const categories = [
    "All",
    ...Array.from(new Set(allPosts.map((p) => p.category))),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full flex flex-col bg-white">
      <HeroSection
        badge="Publications"
        title="Seatown Industry Insights & Logistics Blog"
        subtitle="Stay updated with global trade trends, customs brokerage guidelines, and maritime route analyses."
        bgImage="/blog.png"
      />

      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background SVG (fixed namespace) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg
            viewBox="0 0 1000 800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#0B1F3A"
            strokeWidth="12"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] max-w-3xl opacity-[0.03]"
          >
            <circle cx="500" cy="400" r="330" />
            <ellipse cx="500" cy="400" rx="330" ry="110" />
            <ellipse cx="500" cy="400" rx="280" ry="90" />
            <ellipse cx="500" cy="400" rx="165" ry="55" />
            <ellipse cx="500" cy="250" rx="230" ry="75" />
            <ellipse cx="500" cy="550" rx="230" ry="75" />
            <line x1="500" y1="70" x2="500" y2="730" />
            <ellipse cx="500" cy="400" rx="165" ry="330" />
            <ellipse cx="500" cy="400" rx="90" ry="330" />
            <path
              d="M200 320 Q400 180 680 280 Q820 320 870 400"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="200" cy="320" r="20" fill="#0B1F3A" />
            <circle cx="870" cy="400" r="20" fill="#0B1F3A" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase border transition ${
                  selectedCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              No posts available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="p-6 pb-0 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-accent bg-accent/10 px-3 py-1 rounded-md">
                      {post.category}
                    </span>

                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-primary mb-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-between items-center border-t pt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                          {post.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">
                            {post.author}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {post.date}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-accent text-[10px] font-bold uppercase flex items-center gap-1"
                      >
                        Read <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}