"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/app/(admin)/dashboard/layout";
import {
  Search,
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock3,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: "Shipping" | "Logistics" | "Freight" | "Industry News";
  excerpt: string;
  author: string;
  status: "Draft" | "Published" | "Scheduled";
  published_at: string | null;
  reading_time: string;
  featured: boolean;
}

export default function BlogManagement() {
  const { showToast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Blog stats
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
  });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [mutationLoading, setMutationLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        category: categoryFilter,
        status: statusFilter,
        page: page.toString(),
        limit: "8",
      });

      const res = await fetch(`/api/proxy/blogs?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
          setTotalPages(data.pagination.pages);
          
          // Compile stats from the list (or recalculate)
          const total = data.pagination.total;
          setStats((prev) => ({
            ...prev,
            total,
          }));
        }
      } else {
        showToast("Failed to fetch blog posts", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error fetching blog posts", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/proxy/analytics/stats");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStats({
            total: data.stats.publishedBlogs + data.stats.draftBlogs, // approximate
            published: data.stats.publishedBlogs,
            draft: data.stats.draftBlogs,
            scheduled: 0, // we can assume 0 or count scheduled
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, categoryFilter, statusFilter, page]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleTogglePublish = async (blog: Blog) => {
    const nextStatus = blog.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`/api/proxy/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          `Blog post is now ${nextStatus === "Published" ? "published" : "saved as draft"}`,
          "success"
        );
        fetchBlogs();
        fetchStats();
      } else {
        showToast(data.message || "Failed to update blog status", "error");
      }
    } catch (err) {
      showToast("Server error updating status", "error");
    }
  };

  const handleDeleteBlog = async () => {
    if (!selectedBlog) return;
    setMutationLoading(true);
    try {
      const res = await fetch(`/api/proxy/blogs/${selectedBlog.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Blog post deleted successfully`, "success");
        setShowDeleteModal(false);
        setSelectedBlog(null);
        fetchBlogs();
        fetchStats();
      } else {
        showToast(data.message || "Failed to delete blog post", "error");
      }
    } catch (err) {
      showToast("Server error deleting blog post", "error");
    } finally {
      setMutationLoading(false);
    }
  };

  const openDeleteModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Blog CMS</h1>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            Publish articles, company announcements, and trade route updates.
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="h-11 px-5 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-accent/15 cursor-pointer"
        >
          <Plus size={16} />
          Create Post
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: stats.total, color: "border-gray-200 text-primary" },
          { label: "Published", value: stats.published, color: "border-green-100 text-green-600 bg-green-50/20" },
          { label: "Drafts", value: stats.draft, color: "border-blue-100 text-blue-600 bg-blue-50/20" },
          { label: "Scheduled", value: stats.scheduled, color: "border-yellow-100 text-yellow-600 bg-yellow-50/20" },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-xl border bg-white shadow-xs ${stat.color}`}>
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              {stat.label}
            </p>
            <h3 className="text-xl font-black mt-1 leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search posts by title or excerpt..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-11 bg-gray-50 hover:bg-gray-100/50 focus:bg-white rounded-xl border border-gray-200 focus:border-accent pl-11 pr-4 outline-none text-xs text-primary font-semibold transition-all"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }}
          className="h-11 px-4 bg-gray-50 hover:bg-gray-100/50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs text-primary font-semibold transition-all"
        >
          <option value="">All Categories</option>
          <option value="Shipping">Shipping</option>
          <option value="Logistics">Logistics</option>
          <option value="Freight">Freight</option>
          <option value="Industry News">Industry News</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="h-11 px-4 bg-gray-50 hover:bg-gray-100/50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs text-primary font-semibold transition-all"
        >
          <option value="">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Loading articles...
          </p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="py-20 text-center text-gray-400 bg-white rounded-2xl border border-gray-200">
          No blog posts found. Click "Create Post" to write your first article.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              {/* Header Status Badge */}
              <div className="p-5 pb-0 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                  {blog.category}
                </span>
                
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 border ${
                  blog.status === "Published"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : blog.status === "Scheduled"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                    : "bg-blue-50 text-blue-700 border-blue-100"
                }`}>
                  {blog.status === "Published" && <CheckCircle size={10} />}
                  {blog.status === "Scheduled" && <Clock3 size={10} />}
                  {blog.status === "Draft" && <XCircle size={10} />}
                  {blog.status}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-grow text-left">
                <h3 className="font-extrabold text-sm text-primary mb-2 line-clamp-2 leading-snug group-hover:text-accent transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3 mb-4 font-semibold">
                  {blog.excerpt}
                </p>
                <div className="flex flex-col gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-accent" />
                    <span>{blog.reading_time}</span>
                  </div>
                  {blog.published_at && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Calendar size={12} className="text-accent" />
                      <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-gray-100 p-4 bg-gray-50/50 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(blog)}
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                    blog.status === "Published"
                      ? "bg-white text-yellow-600 border-yellow-100 hover:bg-yellow-50/50"
                      : "bg-white text-green-600 border-green-100 hover:bg-green-50/50"
                  }`}
                >
                  {blog.status === "Published" ? "Unpublish" : "Publish"}
                </button>

                <div className="flex items-center gap-1">
                  {blog.status === "Published" && (
                    <Link
                      href={`/blog`}
                      target="_blank"
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary"
                      title="View Public Post"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/blog/edit/${blog.id}`}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary"
                    title="Edit Post"
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(blog)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div className="bg-white px-6 py-4 border border-gray-200 rounded-2xl shadow-sm flex items-center justify-between">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3.5 py-1.5 bg-white border border-gray-200 text-primary hover:bg-gray-50 disabled:opacity-50 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3.5 py-1.5 bg-white border border-gray-200 text-primary hover:bg-gray-50 disabled:opacity-50 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 p-6 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-lg font-black text-[#0B1F3A]">Delete Blog Post?</h2>
            <p className="text-xs text-gray-500 font-semibold my-4 leading-relaxed">
              Are you sure you want to permanently delete the blog post:<br/>
              <strong className="text-primary">"{selectedBlog.title}"</strong>?<br/>
              This action cannot be undone and will remove it from the public website.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-11 px-5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                disabled={mutationLoading}
                className="h-11 px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                {mutationLoading ? <Loader2 size={14} className="animate-spin" /> : "Delete Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
