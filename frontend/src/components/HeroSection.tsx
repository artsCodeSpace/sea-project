"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  badge: string;
  bgImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  badge,
  bgImage,
}) => {
  // Highlight the last word in the accent (gold) color
  const words = title.split(" ");
  const lastWord = words.pop() ?? "";
  const mainTitle = words.join(" ");

  return (
    <section
      className="relative w-full mt-20 overflow-hidden select-none isolate
                 min-h-[260px] sm:min-h-[320px] md:min-h-[560px] lg:min-h-[640px]
                 flex items-end md:items-center bg-primary"
      aria-label={title}
    >
      {/* Background image — rendered with Next.js Image for optimization */}
      <Image
        src={bgImage}
        alt="banner image"
        aria-hidden="true"
        loading="eager"
        priority
        fill
        className="absolute inset-0 h-full w-full object-cover md:object-cover object-center md:object-right
                   pointer-events-none -z-10"
        draggable={false}
      />

      {/* Mobile scrim: dark bottom → transparent top, keeps text legible on any image */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none -z-10
                   bg-gradient-to-t from-secondary/20 via-secondary/10"
      />

      {/* Desktop scrim: dark left → transparent right */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none -z-10
                   bg-gradient-to-r from-secondary/20 via-secondary/10"
      />

      {/* Subtle top/bottom vignette for premium framing */}
      <div
        className="absolute inset-0 pointer-events-none -z-10
                   bg-gradient-to-b from-secondary/20 via-secondary/10"
      />

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8
                   py-10 md:py-16 flex flex-col items-start
                   text-left "
      >
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 inline-flex items-center rounded-full
           border border-accent
           bg-accent
           px-3 py-1
           text-[10px] sm:text-xs font-black uppercase
           tracking-[0.18em]
           text-white
           shadow-lg shadow-accent/40"
          /* className="mb-5 inline-flex items-center rounded-full
           border border-accent/60
           bg-black/30 backdrop-blur-md
           px-4 py-1.5
           text-[11px] sm:text-xs font-black uppercase
           tracking-[0.18em]
           text-white
           shadow-lg shadow-black/20" */
        >
          {badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mb-4 max-w-xl lg:max-w-3xl text-balance
                     text-2xl sm:text-3xl md:text-5xl lg:text-6xl
                     font-black leading-[1.1] tracking-tight
                     text-primary-foreground
                    "
        > 
          <span className="text-(--primary)">
            {mainTitle}
          </span>
          {lastWord && (
            <>
              {mainTitle ? " " : ""}
              <span className="text-accent">{lastWord}</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="max-w-xl text-pretty text-xs sm:text-sm md:text-lg
                     font-medium leading-relaxed
                     text-primary-foreground/85"
                     
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;