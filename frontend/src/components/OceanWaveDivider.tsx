"use client";

interface OceanWaveProps {
  direction?: "up" | "down";
  fill?: string;
  bgFill?: string;
}

export default function OceanWaveDivider({
  direction = "down",
  fill = "fill-zinc-50",
  bgFill = "bg-white",
}: OceanWaveProps) {
  return (
    <div className={`relative w-full h-[35px] overflow-hidden ${bgFill} select-none pointer-events-none`}>
      <div
        className={`absolute w-full h-full left-0 bottom-0 ${
          direction === "up" ? "transform rotate-180" : ""
        }`}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`absolute bottom-0 w-[200%] h-full opacity-65 ${fill} animate-waveFlow`}
          style={{
            animation: "waveFlow 16s linear infinite",
          }}
        >
          <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 C1650,100 1850,20 2000,60 L2000,120 L0,120 Z" />
        </svg>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`absolute bottom-0 w-[200%] h-full left-[-100%] ${fill} opacity-90`}
          style={{
            animation: "waveFlowReverse 22s linear infinite",
          }}
        >
          <path d="M0,50 C150,10 300,90 450,50 C600,10 750,90 900,50 C1050,10 1200,90 1350,50 C1500,10 1650,90 1800,50 L1800,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
