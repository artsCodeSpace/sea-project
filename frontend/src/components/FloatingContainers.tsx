"use client";

import React from "react";

export default function FloatingContainers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.03]">
      <div className="absolute top-[20%] left-[10%] w-32 h-16 border-2 border-primary bg-primary/10 rounded transform rotate-12 animate-pulse" style={{ animationDuration: '6s' }}>
        <div className="flex justify-between h-full px-2 items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1.5 h-full bg-primary/40" />
          ))}
        </div>
      </div>
      <div className="absolute top-[60%] right-[15%] w-40 h-20 border-2 border-primary bg-primary/10 rounded transform -rotate-12 animate-pulse" style={{ animationDuration: '8s' }}>
        <div className="flex justify-between h-full px-2 items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1.5 h-full bg-primary/40" />
          ))}
        </div>
      </div>
      <div className="absolute top-[40%] left-[80%] w-24 h-12 border-2 border-primary bg-primary/10 rounded transform rotate-45 animate-pulse" style={{ animationDuration: '7s' }}>
        <div className="flex justify-between h-full px-1.5 items-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-full bg-primary/40" />
          ))}
        </div>
      </div>
    </div>
  );
}
