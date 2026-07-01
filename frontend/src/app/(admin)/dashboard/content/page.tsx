"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/app/(admin)/dashboard/layout";
import {
  Globe,
  Home,
  Info,
  Mail,
  Share2,
  Loader2,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

type ContentSection = "hero" | "about" | "contact" | "footer";

export default function ContentManagement() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<ContentSection>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states for each section
  const [heroData, setHeroData] = useState({
    badge: "Premium Ocean Feeder Networks",
    title: "Connecting Regional Trade to Global Markets",
    subtitle: "Seatown Container Line delivers state-of-the-art container logistics and NVOCC fleet operations across major trade routes.",
    primaryBtnText: "Book Slot Allocation",
    primaryBtnLink: "/contact?quote=1",
    secondaryBtnText: "Explore Services",
    secondaryBtnLink: "/services",
    bgImage: "/hero-sea.jpg",
  });

  const [aboutData, setAboutData] = useState({
    badge: "Chartering Horizons",
    title: "Maritime Leadership Built on Logistics Excellence",
    text: "At Seatown Container Line, we bridge the gap between continental hubs and regional ports with modern NVOCC operations and FCL allocations. Our team delivers white-glove shipping solutions for all cargo types, ensuring precision, security, and tracking at every waypoint.",
    stats: [
      { id: "1", label: "Years Experience", value: "15", suffix: "+" },
      { id: "2", label: "Ports Connected", value: "45", suffix: "+" },
      { id: "3", label: "Vessels Chartered", value: "120", suffix: "+" },
    ],
  });

  const [contactData, setContactData] = useState({
    title: "Corporate Headquarters",
    companyName: "SEATOWN CONTAINER LINE PVT LTD",
    address: "New No.89 (Old No.45), Marine Tower, 4th Floor Room No-8, Thambu Chetty Street, Chennai – 600 001",
    phones: ["+91 93846 22560", "+91 98404 56693", "044-4646 3747"],
    email: "James@seatown.in",
    hours: "Mon - Sat: 9:00 AM - 6:00 PM",
  });

  const [footerData, setFooterData] = useState({
    bio: "Experience premium international shipping, maritime container logistics, NVOCC cargo networks, and modern real-time ocean trade connectivity.",
    copyright: "© 2026 Seatown Container Line. All rights reserved.",
    socials: {
      linkedin: "https://linkedin.com/company/seatown",
      twitter: "https://twitter.com/seatown",
      facebook: "https://facebook.com/seatown",
    },
  });

  const fetchSectionData = async (section: ContentSection) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/proxy/content/${section}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          if (section === "hero") setHeroData(data.content);
          else if (section === "about") setAboutData(data.content);
          else if (section === "contact") setContactData(data.content);
          else if (section === "footer") setFooterData(data.content);
        }
      }
    } catch (err) {
      console.error(err);
      showToast(`Failed to load ${section} content.`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData(activeTab);
  }, [activeTab]);

  const handleSave = async (section: ContentSection, value: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/proxy/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Website content for "${section}" updated successfully.`, "success");
      } else {
        showToast(data.message || "Failed to save content.", "error");
      }
    } catch (err) {
      showToast("Server error saving content.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Helper to update array fields in about stats
  const handleStatChange = (id: string, field: string, val: string) => {
    const updatedStats = aboutData.stats.map((stat) => {
      if (stat.id === id) {
        return { ...stat, [field]: val };
      }
      return stat;
    });
    setAboutData({ ...aboutData, stats: updatedStats });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0B1F3A]">Website CMS</h1>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          Customize content copy displayed on the public landing page.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Navigation Tabs (1 col) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-1">
          {[
            { id: "contact", label: "Contact Details", icon: Mail },
            { id: "footer", label: "Footer & Socials", icon: Share2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ContentSection)}
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

        {/* Edit Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Loading content settings...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* TAB 1: CONTACT */}
              {activeTab === "contact" && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">
                      Contact Information CMS
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        Office Title
                      </label>
                      <input
                        type="text"
                        value={contactData.title}
                        onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={contactData.companyName}
                        onChange={(e) => setContactData({ ...contactData, companyName: e.target.value })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      Full Address
                    </label>
                    <textarea
                      rows={2}
                      value={contactData.address}
                      onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        Corporate Email Address
                      </label>
                      <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        Office Hours
                      </label>
                      <input
                        type="text"
                        value={contactData.hours}
                        onChange={(e) => setContactData({ ...contactData, hours: e.target.value })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                      />
                    </div>
                  </div>

                  {/* Phone numbers list */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Office Telephone / Mobile Numbers
                    </label>
                    {contactData.phones.map((phone, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => {
                            const updatedPhones = [...contactData.phones];
                            updatedPhones[idx] = e.target.value;
                            setContactData({ ...contactData, phones: updatedPhones });
                          }}
                          className="flex-1 h-10 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedPhones = contactData.phones.filter((_, i) => i !== idx);
                            setContactData({ ...contactData, phones: updatedPhones });
                          }}
                          disabled={contactData.phones.length === 1}
                          className="w-10 h-10 rounded-xl border border-red-100 hover:bg-red-50 text-red-500 flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setContactData({ ...contactData, phones: [...contactData.phones, ""] })}
                      className="text-[10px] font-black text-accent hover:text-accent-hover uppercase tracking-wider flex items-center gap-1.5 mt-2.5 cursor-pointer"
                    >
                      <Plus size={12} /> Add Telephone Line
                    </button>
                  </div>

                  <button
                    onClick={() => handleSave("contact", contactData)}
                    disabled={saving}
                    className="h-11 px-5 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-accent/15 mt-6 cursor-pointer"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save Contact Details
                  </button>
                </div>
              )}

              {/* TAB 2: FOOTER & BRANDING */}
              {activeTab === "footer" && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">
                      Footer & Branding CMS
                    </h3>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      Footer Biography Summary
                    </label>
                    <textarea
                      rows={3}
                      value={footerData.bio}
                      onChange={(e) => setFooterData({ ...footerData, bio: e.target.value })}
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={footerData.copyright}
                      onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
                      className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        LinkedIn Profile Link
                      </label>
                      <input
                        type="text"
                        value={footerData.socials.linkedin}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socials: { ...footerData.socials, linkedin: e.target.value }
                        })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        Twitter Profile Link
                      </label>
                      <input
                        type="text"
                        value={footerData.socials.twitter}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socials: { ...footerData.socials, twitter: e.target.value }
                        })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                        Facebook Profile Link
                      </label>
                      <input
                        type="text"
                        value={footerData.socials.facebook}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          socials: { ...footerData.socials, facebook: e.target.value }
                        })}
                        className="w-full h-11 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent outline-none text-xs font-semibold font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave("footer", footerData)}
                    disabled={saving}
                    className="h-11 px-5 bg-accent hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-accent/15 mt-6 cursor-pointer"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save Footer Details
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
