"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/app/(admin)/dashboard/layout";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Loader2,
  Eye,
  Trash2,
  X,
  Save,
  Download,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: "Open" | "In Progress" | "Resolved" | "Archived";
  reply_notes: string | null;
  created_at: string;
  updated_at: string;
}

export default function ContactManagement() {
  const { showToast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Detail Modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // Note form state
  const [noteStatus, setNoteStatus] = useState<"Open" | "In Progress" | "Resolved" | "Archived">("Open");
  const [replyNotes, setReplyNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        status: statusFilter,
        search,
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/proxy/contacts?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setContacts(data.contacts);
          setTotalPages(data.pagination.pages);
        }
      } else {
        showToast("Failed to fetch contact inquiries.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error fetching inquiries.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [statusFilter, search, page]);

  const handleOpenDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setNoteStatus(contact.status);
    setReplyNotes(contact.reply_notes || "");
    setShowDetailModal(true);
  };

  const handleUpdateInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/proxy/contacts/${selectedContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: noteStatus,
          reply_notes: replyNotes,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Inquiry status and notes saved.", "success");
        setShowDetailModal(false);
        fetchContacts();
      } else {
        showToast(data.message || "Failed to save inquiry notes.", "error");
      }
    } catch (err) {
      showToast("Server error saving notes.", "error");
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact inquiry?")) return;
    try {
      const res = await fetch(`/api/proxy/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Inquiry deleted successfully.", "success");
        fetchContacts();
      } else {
        showToast(data.message || "Failed to delete inquiry", "error");
      }
    } catch (err) {
      showToast("Server error deleting inquiry", "error");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (contacts.length === 0) {
      showToast("No data available to export.", "warning");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Service", "Message", "Status", "Resolution Notes", "Created At"];
    const rows = contacts.map((c) => [
      c.name,
      c.email,
      c.phone || "",
      c.service,
      c.message.replace(/"/g, '""'), // Escape quotes
      c.status,
      (c.reply_notes || "").replace(/"/g, '""'),
      new Date(c.created_at).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `seatown_contacts_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV file downloaded successfully.", "success");
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Contact Inquiries</h1>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            Manage slots booking inquiries, freight rate quotes, and general questions submitted by customers.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="h-11 px-5 border border-gray-200 hover:border-accent text-primary hover:text-accent bg-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Download size={16} />
          Export to CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search inquiries by name, email, or message contents..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-10 bg-gray-50 hover:bg-gray-100/50 focus:bg-white rounded-xl border border-gray-200 focus:border-accent pl-11 pr-4 outline-none text-xs text-primary font-semibold transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 px-4 bg-gray-50 hover:bg-gray-100/50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs text-primary font-semibold transition-all"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Loading inquiries...
            </p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            No contact inquiries found matching filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/75 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">Sender Info</th>
                  <th className="px-6 py-4">Interested Service</th>
                  <th className="px-6 py-4">Message Snippet</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-extrabold text-primary">{contact.name}</p>
                        <p className="text-gray-400 text-[10px] font-bold lowercase">{contact.email}</p>
                        {contact.phone && (
                          <p className="text-gray-400 text-[9px] font-semibold mt-0.5">{contact.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-accent/10 text-accent px-2.5 py-1 rounded-md">
                        {contact.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="truncate text-gray-500 font-medium">"{contact.message}"</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider border ${
                        contact.status === "Open"
                          ? "bg-blue-50 text-blue-700 border-blue-100"
                          : contact.status === "In Progress"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-100 animate-pulse"
                          : contact.status === "Resolved"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">
                      {new Date(contact.created_at).toLocaleDateString([], {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleOpenDetails(contact)}
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary cursor-pointer"
                          title="View Details & Notes"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
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
      </div>

      {/* Inquiry Detail Viewer Modal */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-100 p-6 text-left relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-black text-[#0B1F3A] mb-4 flex items-center gap-2">
              <Mail className="text-accent" /> Inquiry Details
            </h2>

            <div className="flex-1 overflow-y-auto space-y-5 pr-1">
              {/* Sender Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sender Name</p>
                  <p className="text-xs font-extrabold text-primary">{selectedContact.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                  <a href={`mailto:${selectedContact.email}`} className="text-xs font-extrabold text-accent hover:underline break-all">
                    {selectedContact.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone Line</p>
                  <p className="text-xs font-extrabold text-primary">{selectedContact.phone || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Requested Service</p>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded">
                      {selectedContact.service}
                    </span>
                  </div>
                </div>
              </div>

              {/* Inquiry Message */}
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <MessageSquare size={12} className="text-accent" /> Customer Message
                </p>
                <div className="bg-gray-50/40 border border-gray-100 rounded-2xl p-4 text-xs font-medium leading-relaxed text-gray-700 whitespace-pre-wrap italic">
                  "{selectedContact.message}"
                </div>
              </div>

              {/* Administration Follow-up Form */}
              <form onSubmit={handleUpdateInquiry} className="space-y-4 border-t border-gray-100 pt-4">
                <h3 className="font-extrabold text-xs text-primary uppercase tracking-wide">
                  Resolution & Follow-up Notes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      Inquiry Status
                    </label>
                    <select
                      value={noteStatus}
                      onChange={(e: any) => setNoteStatus(e.target.value)}
                      className="w-full h-10 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div className="flex items-end text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Submitted on: {new Date(selectedContact.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    Internal Resolution Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter dispatch notes, slot booking confirmation codes, or follow-up phone call records..."
                    value={replyNotes}
                    onChange={(e) => setReplyNotes(e.target.value)}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowDetailModal(false)}
                    className="h-10 px-4 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={savingNotes}
                    className="h-10 px-6 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-accent/15 cursor-pointer"
                  >
                    {savingNotes ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save Resolution
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
