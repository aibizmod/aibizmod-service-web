"use client";

import React, { useState, useEffect } from "react";
import { Clock, ShieldCheck, MapPin } from "lucide-react";

interface LocationItem {
  id: string;
  name: string;
  tz: string;
  lat: number; // For visualization positioning
  lng: number;
  status: string;
  metrics: string;
}

const locations: LocationItem[] = [
  { id: "nyc", name: "New York", tz: "America/New_York", lat: 35, lng: 25, status: "Active", metrics: "99.9% SLA" },
  { id: "ldn", name: "London", tz: "Europe/London", lat: 25, lng: 48, status: "Active", metrics: "Avg Response < 10m" },
  { id: "blr", name: "Bengaluru", tz: "Asia/Kolkata", lat: 55, lng: 70, status: "Active", metrics: "24/7 Operations Hub" },
  { id: "sgp", name: "Singapore", tz: "Asia/Singapore", lat: 62, lng: 78, status: "Active", metrics: "99.9% Uptime" },
  { id: "syd", name: "Sydney", tz: "Australia/Sydney", lat: 80, lng: 90, status: "Active", metrics: "On-Call Engineers" }
];

export default function GlobalPresenceLovable() {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [activeLoc, setActiveLoc] = useState<string>("blr");

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      locations.forEach((loc) => {
        try {
          newTimes[loc.id] = new Intl.DateTimeFormat("en-US", {
            timeZone: loc.tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date());
        } catch {
          newTimes[loc.id] = "--:--:--";
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Left Column: Heading and Stats */}
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-500">
              Where We Work
            </span>
            
            <h2 className="mt-3 font-display font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight">
              Support That Travels Across Time Zones.
            </h2>
            
            <p className="mt-5 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              <span className="font-semibold text-slate-900 dark:text-white">ai</span>
              <span className="font-semibold text-cyan-500">biz</span>
              <span className="font-semibold text-slate-900 dark:text-white">mod</span> is connected with clients and partners around the world. See how we bring strategy, engineering, and support together across regions.
            </p>

            {/* Stat Cards Grid */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 text-center shadow-sm">
                <p className="text-4xl font-display font-bold text-slate-900 dark:text-white">5+</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">Main Markets Supported</p>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 text-center shadow-sm">
                <p className="text-4xl font-display font-bold text-slate-900 dark:text-white">24/7</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">Support Across Time Zones</p>
              </div>
            </div>

            {/* Interactive Location HUD Card */}
            <div className="mt-8 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-cyan-500" />
                <span className="font-bold text-slate-850 dark:text-white text-lg">
                  {locations.find(l => l.id === activeLoc)?.name} Office
                </span>
                <span className="ml-auto text-xs px-2.5 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full font-semibold">
                  {locations.find(l => l.id === activeLoc)?.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Local Time</p>
                  <p className="text-md font-mono font-bold text-slate-700 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {times[activeLoc] || "Loading..."}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Network Health</p>
                  <p className="text-md font-bold text-slate-700 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    {locations.find(l => l.id === activeLoc)?.metrics}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Globe Map Visualization */}
          <div className="relative flex items-center justify-center p-4">
            <div className="relative w-full max-w-[500px] aspect-square rounded-[32px] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 p-6 flex items-center justify-center shadow-lg">
              
              {/* Graphic Sphere Grid/Background */}
              <div className="absolute inset-0 m-6 rounded-full border border-slate-200/60 dark:border-slate-850/60 border-dashed animate-spin duration-[60s]" />
              <div className="absolute inset-8 rounded-full border border-slate-200/30 dark:border-slate-850/30" />
              
              {/* Decorative axis lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200/50 dark:bg-slate-800/50" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200/50 dark:bg-slate-800/50" />

              {/* World Map SVG Layout */}
              <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 select-none">
                {/* Simulated World Continent Polygons (Stylized minimal) */}
                <path 
                  d="M10,25 Q15,20 22,28 T35,22 T50,30 T60,20 T75,25 T90,20 L90,35 Q85,45 80,40 T70,55 T55,50 T40,65 T20,55 Z" 
                  fill="currentColor" 
                  className="text-slate-100 dark:text-slate-900/50 transition-colors"
                />
                
                <path 
                  d="M15,65 Q25,75 35,70 T55,85 T75,75 T85,80 L88,90 T70,95 T45,90 T25,85 Z" 
                  fill="currentColor" 
                  className="text-slate-100 dark:text-slate-900/50 transition-colors"
                />

                {/* Connection lines between points */}
                {locations.map((loc) => {
                  const blr = locations.find(l => l.id === "blr")!;
                  if (loc.id === "blr") return null;
                  return (
                    <line
                      key={`line-${loc.id}`}
                      x1={blr.lng}
                      y1={blr.lat}
                      x2={loc.lng}
                      y2={loc.lat}
                      stroke={activeLoc === loc.id ? "#22d3ee" : "currentColor"}
                      strokeDasharray="2,2"
                      strokeWidth={activeLoc === loc.id ? "0.6" : "0.3"}
                      className="text-slate-300 dark:text-slate-700 transition-all duration-300"
                    />
                  );
                })}

                {/* City Pulse Dots */}
                {locations.map((loc) => {
                  const isActive = activeLoc === loc.id;
                  return (
                    <g 
                      key={loc.id} 
                      onClick={() => setActiveLoc(loc.id)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse Circle */}
                      <circle 
                        cx={loc.lng} 
                        cy={loc.lat} 
                        r={isActive ? 4 : 2} 
                        fill="#22d3ee" 
                        className={`transition-all duration-300 ${isActive ? "opacity-35 animate-ping" : "opacity-0 group-hover:opacity-20"}`}
                      />
                      
                      {/* Core Dot */}
                      <circle 
                        cx={loc.lng} 
                        cy={loc.lat} 
                        r={isActive ? 1.8 : 1.2} 
                        fill={isActive ? "#22d3ee" : "#64748b"} 
                        className="transition-colors duration-300"
                      />
                      
                      {/* Tiny city initials text */}
                      <text 
                        x={loc.lng} 
                        y={loc.lat - 3} 
                        textAnchor="middle" 
                        fontSize="2.5" 
                        fontWeight={isActive ? "bold" : "normal"}
                        fill={isActive ? "#22d3ee" : "#94a3b8"}
                        className="font-mono transition-all duration-300"
                      >
                        {loc.name.substring(0, 3).toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Grid Label overlays */}
              <div className="absolute top-4 left-6 font-mono text-[9px] text-slate-400">
                LAT_LNC_COORD: GRID_MODE
              </div>
              <div className="absolute bottom-4 right-6 font-mono text-[9px] text-cyan-500">
                WORLDWIDE_COVERAGE
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
