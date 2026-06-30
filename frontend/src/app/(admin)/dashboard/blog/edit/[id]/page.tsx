"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/(admin)/dashboard/layout";
import BlogForm from "@/components/admin/BlogForm";
import { Loader2 } from "lucide-react";

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { showToast } = useToast();
  const { id } = use(params);
  
  const [blog, setBlog] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/proxy/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setBlog(data.blog);
          } else {
            showToast("Failed to find blog post.", "error");
            router.push("/dashboard/blog");
          }
        } else {
          showToast("Failed to fetch blog post details.", "error");
          router.push("/dashboard/blog");
        }
      } catch (err) {
        console.error(err);
        showToast("Server error fetching blog details.", "error");
        router.push("/dashboard/blog");
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (blogData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/proxy/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Blog post "${blogData.title}" updated successfully!`, "success");
        router.push("/dashboard/blog");
      } else {
        showToast(data.message || "Failed to update blog post.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error updating blog post.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Loading Article Details...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0B1F3A] text-left">Edit Blog Post</h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 text-left">
          Modify and update your published article or draft.
        </p>
      </div>

      <BlogForm initialData={blog} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
