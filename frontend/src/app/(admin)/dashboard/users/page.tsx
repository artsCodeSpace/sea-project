"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/app/(admin)/dashboard/layout";
import {
  Search,
  Plus,
  UserPlus,
  Edit2,
  Trash2,
  ShieldAlert,
  Key,
  Ban,
  CheckCircle,
  Loader2,
  X,
  UserCheck,
} from "lucide-react";

interface User {
  id: string;
  username: string;
  fullname: string;
  role: "Super Admin" | "Administrator" | "Editor" | "Moderator" | "Viewer";
  status: "Active" | "Suspended";
  last_login: string | null;
  created_at: string;
}

export default function UserManagement() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  
  // Selected user state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    role: "Viewer",
  });
  const [newPassword, setNewPassword] = useState("");
  const [mutationLoading, setMutationLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        role: roleFilter,
        status: statusFilter,
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/proxy/users?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
          setTotalPages(data.pagination.pages);
        }
      } else {
        showToast("Failed to fetch users", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error fetching users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter, page]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMutationLoading(true);
    try {
      const res = await fetch("/api/proxy/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`User "${formData.username}" created successfully`, "success");
        setShowAddModal(false);
        setFormData({ username: "", password: "", fullname: "", role: "Viewer" });
        fetchUsers();
      } else {
        showToast(data.message || "Failed to create user", "error");
      }
    } catch (err) {
      showToast("Server error creating user", "error");
    } finally {
      setMutationLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setMutationLoading(true);
    try {
      const res = await fetch(`/api/proxy/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`User "${selectedUser.username}" updated successfully`, "success");
        setShowEditModal(false);
        setSelectedUser(null);
        setFormData({ username: "", password: "", fullname: "", role: "Viewer" });
        fetchUsers();
      } else {
        showToast(data.message || "Failed to update user", "error");
      }
    } catch (err) {
      showToast("Server error updating user", "error");
    } finally {
      setMutationLoading(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const nextStatus = user.status === "Active" ? "Suspended" : "Active";
    try {
      const res = await fetch(`/api/proxy/users/${user.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`User "${user.username}" is now ${nextStatus}`, "success");
        fetchUsers();
      } else {
        showToast(data.message || "Failed to update user status", "error");
      }
    } catch (err) {
      showToast("Server error updating status", "error");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setMutationLoading(true);
    try {
      const res = await fetch(`/api/proxy/users/${selectedUser.id}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Password reset for "${selectedUser.username}" successfully`, "success");
        setShowResetModal(false);
        setNewPassword("");
        setSelectedUser(null);
      } else {
        showToast(data.message || "Failed to reset password", "error");
      }
    } catch (err) {
      showToast("Server error resetting password", "error");
    } finally {
      setMutationLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setMutationLoading(true);
    try {
      const res = await fetch(`/api/proxy/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`User "${selectedUser.username}" deleted successfully`, "success");
        setShowDeleteModal(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        showToast(data.message || "Failed to delete user", "error");
      }
    } catch (err) {
      showToast("Server error deleting user", "error");
    } finally {
      setMutationLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      password: "",
      fullname: user.fullname,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const openResetModal = (user: User) => {
    setSelectedUser(user);
    setNewPassword("");
    setShowResetModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">User Management</h1>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            Manage administrative user accounts, assign roles, and audit access.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({ username: "", password: "", fullname: "", role: "Viewer" });
            setShowAddModal(true);
          }}
          className="h-11 px-5 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-accent/15 cursor-pointer"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by username or name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full h-11 bg-gray-50 hover:bg-gray-100/50 focus:bg-white rounded-xl border border-gray-200 focus:border-accent pl-11 pr-4 outline-none text-xs text-primary font-semibold transition-all"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="h-11 px-4 bg-gray-50 hover:bg-gray-100/50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs text-primary font-semibold transition-all"
        >
          <option value="">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Administrator">Administrator</option>
          <option value="Editor">Editor</option>
          <option value="Moderator">Moderator</option>
          <option value="Viewer">Viewer</option>
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
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Loading administrators...
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            No users found matching the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/75 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">System Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Login</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-center justify-center font-black">
                          {user.fullname.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-extrabold text-primary">{user.fullname}</p>
                          <p className="text-gray-400 text-[10px] font-bold">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-wide text-[9px] ${
                        user.role === "Super Admin"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : user.role === "Administrator"
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : user.role === "Editor"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : user.role === "Moderator"
                          ? "bg-purple-50 text-purple-700 border border-purple-100"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`px-2 py-0.5 rounded-full font-black uppercase tracking-wider text-[9px] cursor-pointer flex items-center gap-1 ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700 hover:bg-green-100/70 border border-green-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100/70 border border-red-100"
                        }`}
                        title={user.status === "Active" ? "Click to suspend" : "Click to activate"}
                      >
                        {user.status === "Active" ? <UserCheck size={10} /> : <Ban size={10} />}
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Never logged in"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">
                      {new Date(user.created_at).toLocaleDateString([], {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openResetModal(user)}
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary cursor-pointer"
                          title="Reset Password"
                        >
                          <Key size={14} />
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary cursor-pointer"
                          title="Edit User"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
                          title="Delete User"
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

        {/* Pagination Footer */}
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 p-6 text-left relative overflow-hidden">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-black text-[#0B1F3A] mb-4 flex items-center gap-2">
              <UserPlus className="text-accent" /> Add Administrator
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah Al-Mansoori"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., sarah.m"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 4 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  System Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Editor">Editor</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={mutationLoading}
                className="w-full h-12 bg-accent hover:brightness-110 text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-accent/15 cursor-pointer"
              >
                {mutationLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 p-6 text-left relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-black text-[#0B1F3A] mb-4">Edit User Permissions</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  Username (read-only)
                </label>
                <input
                  type="text"
                  disabled
                  value={selectedUser.username}
                  className="w-full h-11 px-4 bg-gray-100 text-gray-400 rounded-xl border border-gray-200 outline-none text-xs font-semibold cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  System Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Editor">Editor</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={mutationLoading}
                className="w-full h-12 bg-accent hover:brightness-110 text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-accent/15 cursor-pointer"
              >
                {mutationLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 p-6 text-left relative">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-black text-[#0B1F3A] mb-4">Reset Password</h2>
            <p className="text-xs text-gray-500 font-semibold mb-4 leading-relaxed">
              Enter a new password for <strong>{selectedUser.fullname}</strong> (@{selectedUser.username}).
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 4 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                />
              </div>
              <button
                type="submit"
                disabled={mutationLoading}
                className="w-full h-12 bg-accent hover:brightness-110 text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-accent/15 cursor-pointer"
              >
                {mutationLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 p-6 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-lg font-black text-[#0B1F3A]">Delete User Account?</h2>
            <p className="text-xs text-gray-500 font-semibold my-4 leading-relaxed">
              Are you sure you want to permanently delete the account of <strong>{selectedUser.fullname}</strong> (@{selectedUser.username})?<br/>
              This action cannot be undone and will revoke all access.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-11 px-5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={mutationLoading}
                className="h-11 px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                {mutationLoading ? <Loader2 size={14} className="animate-spin" /> : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
