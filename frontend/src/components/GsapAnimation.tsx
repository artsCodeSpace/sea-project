"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GsapAnimationProps {
  targetId: string;
}

export default function GsapAnimation({
  targetId,
}: GsapAnimationProps) {
  useGSAP(() => {
    gsap.to(`#${targetId}`, {
      
    });
  });

  return null;
}