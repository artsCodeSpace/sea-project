"use client";

import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/app/(admin)/dashboard/layout";
import {
  UploadCloud,
  Search,
  Copy,
  Trash2,
  Image as ImageIcon,
  Loader2,
  X,
  Clock,
  HardDrive,
} from "lucide-react";

interface MediaFile {
  name: string;
  id: string;
  size: number;
  mimeType: string;
  createdAt: string;
  url: string;
}

export default function MediaLibrary() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Uploading state
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/proxy/media");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setFiles(data.media || []);
        }
      } else {
        showToast("Failed to load media files.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error loading media.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    // Check size limit (5MB)
    if (uploadedFile.size > 5 * 1024 * 1024) {
      showToast("File is too large. Maximum size is 5MB.", "error");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch("/api/proxy/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`File "${uploadedFile.name}" uploaded successfully!`, "success");
        fetchFiles();
      } else {
        showToast(data.message || "Failed to upload file.", "error");
      }
    } catch (err) {
      showToast("Server error uploading file.", "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async () => {
    if (!selectedFile) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/proxy/media/${selectedFile.name}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`File deleted successfully.`, "success");
        setShowDeleteModal(false);
        setSelectedFile(null);
        fetchFiles();
      } else {
        showToast(data.message || "Failed to delete file.", "error");
      }
    } catch (err) {
      showToast("Server error deleting file.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("Public URL copied to clipboard!", "info");
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0B1F3A]">Media Library</h1>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          Upload images, company logos, and banners to be used across blog posts and website content.
        </p>
      </div>

      {/* Upload and Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Upload Box (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-primary pb-3 border-b border-gray-100">
            Upload Assets
          </h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 hover:border-accent hover:bg-gray-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[180px]"
          >
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-accent animate-spin mb-3" />
                <p className="text-xs font-black uppercase tracking-wider text-accent">
                  Uploading File...
                </p>
              </>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-xs font-black uppercase tracking-wider text-primary">
                  Drag & Drop Image
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                  or click to browse files
                </p>
                <p className="text-[9px] text-gray-400 font-semibold mt-3">
                  JPG, PNG, GIF, WEBP up to 5MB
                </p>
              </>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Media Grid & Search (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search files by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 bg-gray-50 hover:bg-gray-100/50 focus:bg-white rounded-xl border border-gray-200 focus:border-accent pl-11 pr-4 outline-none text-xs text-primary font-semibold transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider shrink-0">
              <HardDrive size={14} className="text-accent" />
              <span>{files.length} Files</span>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Retrieving media assets...
              </p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-20 text-center text-gray-400">
              No media files found. Upload some assets to get started.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <div
                  key={file.name}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  {/* Thumbnail */}
                  <div className="h-32 bg-gray-50 border-b border-gray-100 overflow-hidden relative flex items-center justify-center">
                    {file.mimeType.startsWith("image/") ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-300" />
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-3.5 text-left">
                    <p
                      className="text-xs font-extrabold text-primary truncate"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1.5">
                      <span className="flex items-center gap-0.5">
                        <Clock size={10} />
                        {new Date(file.createdAt).toLocaleDateString()}
                      </span>
                      <span>{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>

                  {/* Hover Actions overlay */}
                  <div className="border-t border-gray-100 p-2 bg-gray-50/50 flex items-center justify-end gap-1">
                    <button
                      onClick={() => copyToClipboard(file.url)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-primary cursor-pointer"
                      title="Copy Public URL"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFile(file);
                        setShowDeleteModal(true);
                      }}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Delete Asset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 p-6 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h2 className="text-lg font-black text-[#0B1F3A]">Delete Media Asset?</h2>
            <p className="text-xs text-gray-500 font-semibold my-4 leading-relaxed">
              Are you sure you want to permanently delete the asset:<br/>
              <strong className="text-primary">"{selectedFile.name}"</strong>?<br/>
              This will break any blog posts or website sections currently using this image.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-11 px-5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFile}
                disabled={deleting}
                className="h-11 px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : "Delete Asset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
