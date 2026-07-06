"use client";

import React from "react";
import CapabilityShowcase from "@/components/sections/CapabilityShowcase";

export default function AIAutomationHero() {
  return (
    <div 
      id="ai-section" 
      className="relative w-full text-slate-900"
      style={{
        background: "linear-gradient(180deg, #F8FEFF 0%, #F5FAFB 100%)",
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(60% 60% at 50% 25%, rgba(8, 145, 178, 0.09) 0%, rgba(8, 145, 178, 0.02) 60%, transparent 100%)",
        }}
      />
      <CapabilityShowcase />
    </div>
  );
}
