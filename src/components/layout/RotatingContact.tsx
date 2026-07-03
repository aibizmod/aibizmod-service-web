import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { countries } from "@/lib/countries";

export default function RotatingContact() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  // Cycle through countries every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCountry(prev => {
        const idx = countries.findIndex(c => c.code === prev.code);
        return countries[(idx + 1) % countries.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative" ref={contactRef}>
      <button
        type="button"
        onClick={() => setContactOpen(p => !p)}
        className="flex items-center gap-2 px-4 py-[8.5px] text-[13px] font-semibold text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-full transition-all focus-visible:outline-none select-none cursor-pointer"
      >
        <span className="text-[15px] select-none">{selectedCountry.flag}</span>
        <span className="tracking-tight text-white/95">{selectedCountry.code}</span>
        <span className="text-white/60 font-mono text-[12px]">{selectedCountry.phone}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 text-white/60 ${contactOpen ? "rotate-180" : ""}`} />
      </button>
      {contactOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[90vw] max-w-[400px] max-h-[70vh] overflow-y-auto rounded-2xl bg-white border border-slate-200/80 shadow-2xl p-4 space-y-4 text-left whitespace-normal">
          {countries.map(country => (
            <div
              key={country.code}
              onClick={() => {
                setSelectedCountry(country);
                setContactOpen(false);
              }}
              className="flex items-start gap-3.5 p-3 rounded-xl cursor-pointer hover:bg-white hover:border-slate-200 hover:shadow-sm"
            >
              <span className="text-[20px] select-none mt-0.5">{country.flag}</span>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <a href={`tel:${country.phone.replace(/\s+/g, "")}`} className="font-bold text-[13.5px] text-slate-800 hover:text-cyan-500 transition-colors tracking-tight">
                    {country.phone}
                  </a>
                  <a href={`tel:${country.phone.replace(/\s+/g, "")}`} className="text-cyan-500 hover:text-cyan-600 p-1.5 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center border border-slate-100" aria-label={`Call ${country.code} office`}> 
                    <Phone size={13} />
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal font-sans pt-0.5" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{country.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
