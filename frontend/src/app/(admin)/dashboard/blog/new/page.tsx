"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/(admin)/dashboard/layout";
import BlogForm from "@/components/admin/BlogForm";

type BlogPostData = {
  title: string;
  content?: string;
  [key: string]: unknown;
};

export default function NewBlogPost() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (blogData: BlogPostData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/proxy/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Blog post "${blogData.title}" created successfully!`, "success");
        router.push("/dashboard/blog");
      } else {
        showToast(data.message || "Failed to create blog post.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error creating blog post.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0B1F3A] text-left">New Blog Post</h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 text-left">
          Draft and publish articles to the Seatown Insights feed.
        </p>
      </div>

      <BlogForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
