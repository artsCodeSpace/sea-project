"use client";

import React, { useEffect, useState } from "react";
import { Clock, Globe } from "lucide-react";

interface Zone {
  name: string;
  tz: string;
  flag: string;
}

const zones: Zone[] = [
  { name: "India", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { name: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪" },
  { name: "China", tz: "Asia/Shanghai", flag: "🇨🇳" },
  { name: "United Kingdom", tz: "Europe/London", flag: "🇬🇧" },
  { name: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { name: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
];

export default function TimezoneTicker() {
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      zones.forEach((zone) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: zone.tz,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          newTimes[zone.name] = formatter.format(new Date());
        } catch (e) {
          newTimes[zone.name] = "--:-- --";
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Duplicate the array to create a seamless scrolling loop
  const tickerItems = [...zones, ...zones, ...zones];

  return (
    <div className="w-full bg-[#030d1b] text-gray-300 py-1.5 border-b border-white/5 overflow-hidden select-none z-50 fixed top-0 inset-x-0 h-[30px] flex items-center">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[10px] font-bold tracking-wider">
        {tickerItems.map((zone, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span>{zone.flag}</span>
            <span className="text-white uppercase">{zone.name}</span>
            <span className="text-accent flex items-center gap-1">
              <Clock className="w-3 h-3 text-secondary" />
              {times[zone.name] || "Loading..."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
