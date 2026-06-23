"use client";

import React, { useState } from "react";
import { Ship, Radio, MapPin } from "lucide-react";

interface Port {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
}

const ports: Port[] = [
  { id: "dubai", name: "Dubai (UAE)", x: 20, y: 35, description: "Jebel Ali Port - Mid-East Hub" },
  { id: "chennai", name: "Chennai (India)", x: 45, y: 60, description: "Chennai Port - South India Gateway" },
  { id: "colombo", name: "Colombo (Sri Lanka)", x: 46, y: 76, description: "Port of Colombo - Indian Ocean Transshipment Hub" },
  { id: "chittagong", name: "Chittagong (Bangladesh)", x: 60, y: 48, description: "Port of Chittagong - Bengal Gateway" },
  { id: "malaysia", name: "Port Klang (Malaysia)", x: 62, y: 78, description: "Port Klang - Southeast Asia Center" },
  { id: "singapore", name: "Singapore", x: 64, y: 86, description: "Port of Singapore - Global Maritime Hub" },
  { id: "china", name: "Shanghai (China)", x: 85, y: 28, description: "Port of Shanghai - World's Busiest Container Port" },
];

const routes = [
  { from: "chennai", to: "dubai" },
  { from: "chennai", to: "colombo" },
  { from: "colombo", to: "singapore" },
  { from: "singapore", to: "malaysia" },
  { from: "singapore", to: "china" },
  { from: "chennai", to: "chittagong" },
  { from: "chittagong", to: "china" },
];

export default function InteractiveWorldMap() {
  const [activePort, setActivePort] = useState<Port | null>(ports[1]); // Default to Chennai

  return (
    <div className="relative w-full max-w-5xl mx-auto glass-panel rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl">
      {/* Dynamic Time/Header info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200/50">
        <div>
          <span className="text-accent text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            Live Vessel Operations Network
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-primary mt-1">
            Global Oceanic Sea Routes
          </h3>
        </div>
        
        {/* Selected Port Card */}
        {activePort && (
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-secondary/20 py-2 px-4 rounded-xl shadow-sm transition-all duration-300">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Selected Hub</div>
              <div className="font-bold text-primary text-sm">{activePort.name}</div>
              <div className="text-[11px] text-gray-600">{activePort.description}</div>
            </div>
          </div>
        )}
      </div>

      {/* Map Area */}
      <div className="relative w-full aspect-video bg-linear-to-b from-slate-50 to-blue-50/50 border border-gray-200/60 rounded-2xl overflow-hidden">
        {/* High-tech grid background */}
        <div className="absolute inset-0 opacity-[0.08]" 
             style={{ 
               backgroundImage: "radial-gradient(#0066CC 1px, transparent 1px)", 
               backgroundSize: "24px 24px" 
             }} 
        />

        {/* Global sea contour visualization (minimal abstract dots/paths) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Chennai-centered radar rings */}
          {activePort && (
            <circle 
              cx={activePort.x} 
              cy={activePort.y} 
              r="8" 
              fill="none" 
              stroke="#0066CC" 
              strokeWidth="0.15" 
              className="animate-ping" 
              style={{ transformOrigin: `${activePort.x}% ${activePort.y}%`, animationDuration: '3s' }} 
            />
          )}

          {/* Dotted outlines representing landmass silhouettes */}
          <path 
            d="M 5,10 Q 15,20 18,30 T 30,35 T 45,35 T 50,20 T 40,5 Z" 
            fill="none" 
            stroke="#0B1F3A" 
            strokeWidth="0.1" 
            strokeDasharray="0.5 0.5" 
            className="opacity-25" 
          />
          <path 
            d="M 50,45 Q 40,55 45,65 T 50,85 T 60,95 T 70,80 T 80,60 T 95,40 T 90,20 T 70,10 Z" 
            fill="none" 
            stroke="#0B1F3A" 
            strokeWidth="0.1" 
            strokeDasharray="0.5 0.5" 
            className="opacity-25" 
          />

          {/* Routes */}
          {routes.map((route, idx) => {
            const start = ports.find(p => p.id === route.from);
            const end = ports.find(p => p.id === route.to);
            if (!start || !end) return null;

            // Generate control point for curved path
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2 - 8; // Arc curvature upward

            return (
              <g key={idx}>
                {/* Background Route Guide */}
                <path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="rgba(0, 102, 204, 0.15)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                />
                {/* Active Animated Route */}
                <path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth="0.5"
                  strokeDasharray="2, 6"
                  strokeLinecap="round"
                  className="animate-route-glow"
                  style={{
                    strokeDashoffset: idx % 2 === 0 ? "20" : "-20",
                    animation: "route-glow 2.5s linear infinite",
                  }}
                />
              </g>
            );
          })}

          {/* Ports Interactive Nodes */}
          {ports.map((port) => {
            const isActive = activePort?.id === port.id;
            return (
              <g 
                key={port.id} 
                className="cursor-pointer group"
                onClick={() => setActivePort(port)}
              >
                {/* Outer Glow Ring */}
                <circle
                  cx={port.x}
                  cy={port.y}
                  r={isActive ? 2.2 : 1.4}
                  className="fill-white stroke-secondary transition-all duration-300 group-hover:scale-125"
                  strokeWidth={isActive ? 0.8 : 0.4}
                  style={{ transformOrigin: `${port.x}% ${port.y}%` }}
                />
                {/* Core Dot */}
                <circle
                  cx={port.x}
                  cy={port.y}
                  r={isActive ? 0.9 : 0.6}
                  className={`${isActive ? "fill-accent animate-pulse" : "fill-primary group-hover:fill-secondary"}`}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Labels for Desktop */}
        {ports.map((port) => (
          <button
            key={port.id}
            onClick={() => setActivePort(port)}
            className={`absolute -translate-x-1/2 -translate-y-6 text-[10px] md:text-xs font-bold py-0.5 px-2 rounded-full transition-all duration-300 ${
              activePort?.id === port.id
                ? "bg-primary text-white scale-110 shadow-md border border-accent/40"
                : "bg-white/90 text-primary hover:bg-secondary hover:text-white border border-gray-200/50 shadow-sm"
            }`}
            style={{ left: `${port.x}%`, top: `${port.y}%` }}
          >
            {port.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Network details ticker */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/50 py-3 px-4 rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Active Vessels</div>
          <div className="text-lg font-extrabold text-primary flex items-center justify-center gap-1.5 mt-0.5">
            <Ship className="w-4 h-4 text-accent" /> 24 Vessels
          </div>
        </div>
        <div className="bg-white/50 py-3 px-4 rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Standard Route Latency</div>
          <div className="text-lg font-extrabold text-primary flex items-center justify-center gap-1.5 mt-0.5">
            <Radio className="w-4 h-4 text-secondary" /> Realtime Link
          </div>
        </div>
        <div className="bg-white/50 py-3 px-4 rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Primary Transit Nodes</div>
          <div className="text-lg font-extrabold text-primary mt-0.5">7 Hub Ports</div>
        </div>
        <div className="bg-white/50 py-3 px-4 rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Container Volume Capacity</div>
          <div className="text-lg font-extrabold text-primary mt-0.5">2.4M TEUs</div>
        </div>
      </div>
    </div>
  );
}
