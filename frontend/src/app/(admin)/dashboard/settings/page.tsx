"use client";

import React, { useState } from "react";
import { useToast } from "@/app/(admin)/dashboard/layout";
import {
  Settings,
  Shield,
  Mail,
  Database,
  Save,
  CheckCircle,
  XCircle,
  Loader2,
  Lock,
  DownloadCloud,
} from "lucide-react";

type SettingsTab = "general" | "security" | "smtp" | "backup";

export default function SettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saving, setSaving] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Seatown Container Line",
    siteDescription: "Global Ocean Logistics Experience & Feeder Networks",
    primaryColor: "#2165ae",
    accentColor: "#C1933F",
    maintenanceMode: false,
    enable2FA: true,
  });

  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.mailgun.org",
    port: "587",
    username: "postmaster@seatown.in",
    password: "••••••••••••••••••••••••",
    fromName: "Seatown Dispatch",
    fromEmail: "no-reply@seatown.in",
  });

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("General and branding settings saved successfully.", "success");
    }, 1000);
  };

  const handleSaveSMTP = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("SMTP email configuration updated.", "success");
    }, 1000);
  };

  const handleTriggerBackup = () => {
    setBackupLoading(true);
    setTimeout(() => {
      setBackupLoading(false);
      showToast("Database backup successfully compiled and downloaded.", "success");
      
      // Simulate file download
      const link = document.createElement("a");
      link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ backup: "dummy data", timestamp: new Date() })));
      link.setAttribute("download", `seatown_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2500);
  };

  // RBAC Permission Matrix data
  const rbacMatrix = [
    {
      role: "Super Admin",
      permissions: {
        users: true,
        roles: true,
        website: true,
        blogs: true,
        delete: true,
      },
    },
    {
      role: "Administrator",
      permissions: {
        users: false,
        roles: false,
        website: true,
        blogs: true,
        delete: false,
      },
    },
    {
      role: "Editor",
      permissions: {
        users: false,
        roles: false,
        website: false,
        blogs: true,
        delete: false,
      },
    },
    {
      role: "Moderator",
      permissions: {
        users: false,
        roles: false,
        website: false,
        blogs: false,
        delete: false,
      },
    },
    {
      role: "Viewer",
      permissions: {
        users: false,
        roles: false,
        website: false,
        blogs: false,
        delete: false,
      },
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0B1F3A]">System Settings</h1>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          Configure site-wide parameters, security keys, SMTP servers, and review role permissions.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Navigation Tabs (1 col) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-1">
          {[
            { id: "general", label: "General & Branding", icon: Settings },
            { id: "security", label: "Role Matrix", icon: Shield },
            { id: "smtp", label: "SMTP Email Server", icon: Mail },
            { id: "backup", label: "Backup & Database", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-md shadow-accent/10"
                    : "text-gray-500 hover:text-primary hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Form Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* 1. GENERAL & BRANDING */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">
                  General & Branding Configuration
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    Website Name
                  </label>
                  <input
                    type="text"
                    required
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    Site Description Metadata
                  </label>
                  <input
                    type="text"
                    required
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Branding Colors */}
              <div className="space-y-3 pt-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                  Branding Themes & Styling Tokens
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-150">
                    <input
                      type="color"
                      value={generalSettings.primaryColor}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-primary">Primary Branding Color</p>
                      <p className="text-[10px] text-gray-400 font-bold font-mono uppercase">{generalSettings.primaryColor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-150">
                    <input
                      type="color"
                      value={generalSettings.accentColor}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, accentColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-primary">Accent Branding Color</p>
                      <p className="text-[10px] text-gray-400 font-bold font-mono uppercase">{generalSettings.accentColor}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle controls */}
              <div className="space-y-3 pt-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                  System Settings
                </label>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs font-extrabold text-primary">Maintenance Mode</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Temporarily block public website access
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={generalSettings.maintenanceMode}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMode: e.target.checked })}
                    className="w-4 h-4 text-accent accent-accent rounded border-gray-300 focus:ring-accent cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs font-extrabold text-primary">Enforce Two-Factor Authentication (2FA)</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Prompt administrators for authenticator codes on login
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={generalSettings.enable2FA}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, enable2FA: e.target.checked })}
                    className="w-4 h-4 text-accent accent-accent rounded border-gray-300 focus:ring-accent cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="h-11 px-5 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-accent/15 cursor-pointer"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save General Settings
              </button>
            </form>
          )}

          {/* 2. ROLE PERMISSION MATRIX */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">
                  Role Permission Matrix
                </h3>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/75 text-[10px] font-black uppercase tracking-wider text-gray-400">
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4 text-center">Manage Users</th>
                      <th className="px-6 py-4 text-center">Manage Roles</th>
                      <th className="px-6 py-4 text-center">Manage Website</th>
                      <th className="px-6 py-4 text-center">Manage Blogs</th>
                      <th className="px-6 py-4 text-center">Delete Anything</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                    {rbacMatrix.map((row) => (
                      <tr key={row.role} className="hover:bg-gray-50/20">
                        <td className="px-6 py-4">
                          <span className="text-primary font-extrabold">{row.role}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.permissions.users ? (
                            <CheckCircle size={16} className="text-green-600 mx-auto" />
                          ) : (
                            <XCircle size={16} className="text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.permissions.roles ? (
                            <CheckCircle size={16} className="text-green-600 mx-auto" />
                          ) : (
                            <XCircle size={16} className="text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.permissions.website ? (
                            <CheckCircle size={16} className="text-green-600 mx-auto" />
                          ) : (
                            <XCircle size={16} className="text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.permissions.blogs ? (
                            <CheckCircle size={16} className="text-green-600 mx-auto" />
                          ) : (
                            <XCircle size={16} className="text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.permissions.delete ? (
                            <CheckCircle size={16} className="text-green-600 mx-auto" />
                          ) : (
                            <XCircle size={16} className="text-gray-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex items-start gap-3">
                <Lock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-800 leading-relaxed font-semibold">
                  <p className="font-extrabold">Notice on RBAC Modifications</p>
                  <p className="mt-1 text-[11px] text-yellow-700/90">
                    System roles are strictly hardcoded in Next.js middleware and Express controllers to ensure compile-time type safety. Adjusting these requires code modification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. SMTP EMAIL CONFIG */}
          {activeTab === "smtp" && (
            <form onSubmit={handleSaveSMTP} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">
                  SMTP Email Server Settings
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    required
                    value={smtpSettings.host}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    required
                    value={smtpSettings.port}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, port: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    required
                    value={smtpSettings.username}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    required
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    required
                    value={smtpSettings.fromName}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, fromName: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    Sender Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={smtpSettings.fromEmail}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })}
                    className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="h-11 px-5 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-accent/15 cursor-pointer"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save SMTP Configuration
              </button>
            </form>
          )}

          {/* 4. BACKUP & DATABASE */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">
                  Backup & Database Health
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-gray-50 border border-gray-150 rounded-xl flex items-start gap-4">
                  <Database className="w-8 h-8 text-primary shrink-0" />
                  <div className="text-left space-y-1">
                    <p className="text-xs font-extrabold text-primary">Supabase Connection</p>
                    <p className="text-[10px] text-green-600 font-black uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> Online & Healthy
                    </p>
                    <p className="text-[9px] text-gray-400 font-semibold leading-relaxed">
                      Connected to PostgreSQL schema containing 6 active tables.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-gray-50 border border-gray-150 rounded-xl flex items-start gap-4">
                  <DownloadCloud className="w-8 h-8 text-accent shrink-0" />
                  <div className="text-left space-y-1.5">
                    <p className="text-xs font-extrabold text-primary">System Backups</p>
                    <button
                      onClick={handleTriggerBackup}
                      disabled={backupLoading}
                      className="h-8 px-3.5 bg-accent hover:brightness-110 text-white rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      {backupLoading ? (
                        <>
                          <Loader2 size={10} className="animate-spin" /> Backing up...
                        </>
                      ) : (
                        "Backup Database"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
