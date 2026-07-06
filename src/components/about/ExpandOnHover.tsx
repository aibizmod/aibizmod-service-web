"use client";

import { useState } from "react";

const team = [
  { name: "aibizmod editorial team",    role: "Editorial team",              initials: "", specialty: "Product Strategy · Business Growth",      grad: "linear-gradient(135deg,#06B6D4,#3B82F6)" },
  { name: "Sarah Chen",      role: "CTO & Co-Founder",              initials: "SC", specialty: "Software Architecture · Engineering",       grad: "linear-gradient(135deg,#8B5CF6,#06B6D4)" },
  { name: "Priya Patel",     role: "Head of Digital Marketing",     initials: "PP", specialty: "SEO · Paid Media · Growth",                 grad: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { name: "Marcus Williams", role: "Lead Engineer",                  initials: "MW", specialty: "Full-Stack · Automation",                   grad: "linear-gradient(135deg,#10B981,#3B82F6)" },
  { name: "David Kim",       role: "Head of Cloud & Infrastructure", initials: "DK", specialty: "AWS · DevOps · SRE",                        grad: "linear-gradient(135deg,#F59E0B,#8B5CF6)" },
  { name: "Aisha Okonkwo",   role: "Client Experience Lead",        initials: "AO", specialty: "CX Strategy · Client Relations",            grad: "linear-gradient(135deg,#EF4444,#F59E0B)" },
];

export default function ExpandOnHover() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="py-20 px-6 bg-tint border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "black", border: "none" }}>The People Behind the Work</span>
          <h2 className="mt-6 font-display font-bold" style={{ fontSize: "clamp(26px,3.5vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E7490" }}>Meet the Team</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontSize: 16 }}>
            Small by design, senior by default. Every member has shipped production software and worked directly with clients.
          </p>
        </div>

        {/* ── Mobile grid (2 columns, always expanded) ── */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-[#E0F2FE] bg-white flex flex-col items-center justify-center p-5 text-center"
              style={{ boxShadow: "0 4px 16px rgba(6,182,212,0.12)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                style={{ background: member.grad, boxShadow: "0 4px 14px rgba(6,182,212,0.20)" }}
              >
                <span className="text-white font-bold text-lg select-none">{member.initials}</span>
              </div>
              <h3 className="font-display font-bold text-ink text-sm leading-snug">{member.name}</h3>
              <p className="text-xs font-semibold mt-1" style={{ color: "#06B6D4" }}>{member.role}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{member.specialty}</p>
            </div>
          ))}
        </div>

        {/* ── Desktop expand-on-hover row ── */}
        <div className="hidden md:flex w-full items-stretch justify-center gap-2 overflow-hidden">
          {team.map((member, idx) => {
            const isExpanded = expanded === idx;
            return (
              <div
                key={member.name}
                onMouseEnter={() => setExpanded(idx)}
                className="relative overflow-hidden rounded-3xl cursor-pointer flex-shrink-0"
                style={{
                  width: isExpanded ? "320px" : "72px",
                  height: "360px",
                  transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                  background: isExpanded ? "white" : member.grad,
                  boxShadow: isExpanded ? "0 8px 32px rgba(6,182,212,0.18)" : "0 2px 8px rgba(0,0,0,0.08)",
                  border: isExpanded ? "1.5px solid #E0F2FE" : "none",
                }}
              >
                {/* Collapsed — vertical initials */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: isExpanded ? 0 : 1, transition: "opacity 0.3s ease", pointerEvents: isExpanded ? "none" : "auto" }}
                >
                  <span style={{ color: "white", fontWeight: 800, fontSize: 22, letterSpacing: "0.05em", writingMode: "vertical-rl", textOrientation: "mixed", userSelect: "none" }}>
                    {member.initials}
                  </span>
                </div>

                {/* Expanded — profile card */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-7 text-center"
                  style={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.35s ease 0.1s", pointerEvents: isExpanded ? "auto" : "none", minWidth: 280 }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ background: member.grad, boxShadow: "0 4px 20px rgba(6,182,212,0.25)" }}
                  >
                    <span className="text-white font-bold text-2xl select-none">{member.initials}</span>
                  </div>
                  <h3 className="font-display font-bold text-ink text-base leading-snug">{member.name}</h3>
                  <p className="text-xs font-semibold mt-1" style={{ color: "#06B6D4" }}>{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{member.specialty}</p>
                  <a
                    href="https://linkedin.com/company/aibizmod"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-royal-deep transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
