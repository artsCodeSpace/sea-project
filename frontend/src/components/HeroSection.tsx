'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  badge: string;
  bgImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, badge, bgImage }) => {
  return (
    <section 
      className="w-full relative h-[45vh] md:h-[55vh] mt-20 flex items-center justify-center bg-[#0A1628] overflow-hidden"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Premium dark navy overlay to ensure text contrast and brand alignment */}
      <div className="absolute inset-0 bg-primary/45 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-secondary text-xs font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 inline-block shadow-sm border border-secondary/10 select-none"
        >
          {badge}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-md"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-white/90 font-bold text-sm md:text-base max-w-xl mx-auto drop-shadow-md"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;