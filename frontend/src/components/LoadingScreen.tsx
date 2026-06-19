"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center text-center px-4 max-w-md">
        {/* Styled Official Logo */}
        <Image 
          src="/Logo.png" 
          alt="Seatown Logo" 
          width={400} 
          height={160} 
          className="h-20 md:h-28 w-auto object-contain mb-8" 
          priority 
        />

        {/* Animated subtle loader dots */}
        <div className="flex space-x-1.5 items-center justify-center text-gray-400 text-xs font-semibold uppercase tracking-widest mt-4">
          <span>Connecting Global Trade</span>
          <span className="flex space-x-1 ml-1.5">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
}
