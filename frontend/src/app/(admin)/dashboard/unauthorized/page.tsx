"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center mb-6 border border-red-100 shadow-xl shadow-red-500/5">
        <ShieldAlert className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-black text-[#0B1F3A] tracking-tight">
        Access Denied
      </h1>
      
      <p className="text-gray-500 max-w-md mt-3 mb-8 text-sm leading-relaxed font-semibold">
        You do not have the required permissions to view this section. If you believe this is an error, please contact your Super Admin.
      </p>

      <Link
        href="/dashboard"
        className="h-12 px-6 rounded-xl bg-primary hover:brightness-110 text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-lg shadow-primary/15 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Overview
      </Link>
    </div>
  );
}
