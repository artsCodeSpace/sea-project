"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
}

export default function SeatownLogo({ className = "", height = 36 }: LogoProps) {
  // Width is calculated proportionally — logo aspect ratio is roughly 5.8:1
  const width = Math.round(height * 5.8);

  return (
    <div className={`flex items-center select-none ${className}`} style={{ height: `${height}px` }}>
      <Image
        src="/logo.png"
        alt="Seatown Container Line"
        width={width}
        height={height}
        priority
        style={{ height: `${height}px`, width: "auto", objectFit: "contain" }}
      />
    </div>
  );
}
