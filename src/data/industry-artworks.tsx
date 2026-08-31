import React from "react";

// ── Custom Bespoke Vector SVG Artworks for Each Industry ──────────────────────
export const industryArtworks: Record<string, React.ReactNode> = {
  "retail-ecommerce": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Storefront / Shopping Bag Frame */}
      <rect
        x="60"
        y="70"
        width="120"
        height="110"
        rx="16"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <path
        d="M92 70V54c0-15.464 12.536-28 28-28s28 12.536 28 28v16"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect
        x="74"
        y="96"
        width="92"
        height="64"
        rx="10"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      {/* Barcode & Price Nodes */}
      <g stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round">
        <line x1="88" y1="112" x2="88" y2="144" />
        <line x1="96" y1="112" x2="96" y2="144" strokeWidth="3.5" />
        <line x1="106" y1="112" x2="106" y2="144" />
        <line x1="114" y1="112" x2="114" y2="144" strokeWidth="2.8" />
        <line x1="124" y1="112" x2="124" y2="144" />
        <line x1="134" y1="112" x2="134" y2="144" strokeWidth="3" />
        <line x1="144" y1="112" x2="144" y2="144" />
      </g>
      {/* Floating Discount & Cart Tag */}
      <g className="float-slow">
        <rect
          x="152"
          y="42"
          width="48"
          height="32"
          rx="8"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="176"
          y="62"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="12"
          fill="#FFFFFF"
        >
          -30%
        </text>
        <circle cx="160" cy="58" r="2" fill="#FFFFFF" />
      </g>
      {/* Floating Micro Nodes */}
      <g fill="var(--fc)" opacity=".6">
        <circle cx="48" cy="116" r="3" />
        <circle cx="196" cy="160" r="3.5" />
        <path d="M46 58l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
      </g>
    </svg>
  ),

  "finance": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Vault / Ledger Foundation */}
      <rect
        x="56"
        y="58"
        width="128"
        height="128"
        rx="22"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <circle
        cx="120"
        cy="122"
        r="40"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <circle
        cx="120"
        cy="122"
        r="24"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <circle cx="120" cy="122" r="8" fill="var(--fc)" />
      {/* Vault Wheel Spokes */}
      <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
        <line x1="120" y1="88" x2="120" y2="100" />
        <line x1="120" y1="144" x2="120" y2="156" />
        <line x1="86" y1="122" x2="98" y2="122" />
        <line x1="142" y1="122" x2="154" y2="122" />
      </g>
      {/* Floating Yield Badge */}
      <g className="float-slow">
        <rect
          x="150"
          y="42"
          width="54"
          height="34"
          rx="10"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="177"
          y="64"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="13"
          fill="#FFFFFF"
        >
          +48%
        </text>
      </g>
      {/* Trend line */}
      <g stroke="var(--fc)" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M46 168l24-18 20 12 36-32" />
        <path d="M126 130h10v10" />
      </g>
    </svg>
  ),

  "healthcare": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Health Shield / Tablet */}
      <rect
        x="62"
        y="52"
        width="116"
        height="136"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="72"
        y="62"
        width="96"
        height="116"
        rx="12"
        fill="var(--fc-dark)"
      />
      {/* Medical Cross in Core */}
      <path
        d="M106 82h28v20h20v28h-20v20h-28v-20H86v-28h20V82z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      {/* Pulse / EKG Wave */}
      <path
        d="M78 122h18l8-14 12 28 10-18 8 10 16-6"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Floating HIPAA / Pulse Badge */}
      <g className="float-slow">
        <circle
          cx="174"
          cy="66"
          r="18"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <path
          d="M168 66l4 4 8-8"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="48" cy="80" r="3" />
        <circle cx="194" cy="154" r="2.5" />
      </g>
    </svg>
  ),

  "manufacturing-logistics": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Factory / Warehouse Hub */}
      <rect
        x="54"
        y="80"
        width="132"
        height="104"
        rx="14"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Conveyor / Process Nodes */}
      <path
        d="M54 134h132M84 80v54M156 80v54"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <rect
        x="68"
        y="92"
        width="34"
        height="28"
        rx="6"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      <rect
        x="138"
        y="92"
        width="34"
        height="28"
        rx="6"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      {/* Industrial Gear */}
      <g className="float">
        <circle
          cx="120"
          cy="74"
          r="26"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <circle
          cx="120"
          cy="74"
          r="12"
          fill="var(--fc-light)"
          stroke="#0F172A"
          strokeWidth="1.4"
        />
        <g stroke="#0F172A" strokeWidth="3" strokeLinecap="round">
          <line x1="120" y1="42" x2="120" y2="48" />
          <line x1="120" y1="100" x2="120" y2="106" />
          <line x1="88" y1="74" x2="94" y2="74" />
          <line x1="146" y1="74" x2="152" y2="74" />
        </g>
      </g>
      {/* IoT Telemetry Node */}
      <g className="float-slow">
        <rect
          x="162"
          y="136"
          width="44"
          height="28"
          rx="6"
          fill="var(--fc-dark)"
          stroke="#0F172A"
          strokeWidth="1.4"
        />
        <text
          x="184"
          y="154"
          textAnchor="middle"
          fontFamily="monospace"
          fontWeight="700"
          fontSize="10"
          fill="var(--fc)"
        >
          IOT
        </text>
      </g>
    </svg>
  ),

  "saas-subscription": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Cloud & Platform Layer */}
      <rect
        x="60"
        y="60"
        width="120"
        height="40"
        rx="10"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="60"
        y="110"
        width="120"
        height="40"
        rx="10"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="60"
        y="160"
        width="120"
        height="26"
        rx="8"
        fill="#0F172A"
      />
      {/* Sync / Loop dots */}
      <circle cx="82" cy="80" r="5" fill="var(--fc)" />
      <circle cx="98" cy="80" r="5" fill="#0F172A" />
      <circle cx="82" cy="130" r="5" fill="#0F172A" />
      <circle cx="98" cy="130" r="5" fill="var(--fc)" />
      {/* Floating 99.9% Retention Chip */}
      <g className="float-slow">
        <rect
          x="154"
          y="36"
          width="52"
          height="32"
          rx="10"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="180"
          y="56"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          99.9%
        </text>
      </g>
    </svg>
  ),

  "professional-services": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Portfolio / Briefcase */}
      <rect
        x="54"
        y="76"
        width="132"
        height="108"
        rx="16"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <path
        d="M92 76V62a12 12 0 0112-12h32a12 12 0 0112 12v14"
        stroke="#0F172A"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="66"
        y="92"
        width="108"
        height="76"
        rx="10"
        fill="var(--fc-dark)"
      />
      {/* Gantt / Project Milestones */}
      <g stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
        <line x1="80" y1="110" x2="130" y2="110" stroke="var(--fc)" strokeWidth="4" />
        <line x1="96" y1="126" x2="160" y2="126" stroke="#0F172A" strokeWidth="4" />
        <line x1="80" y1="142" x2="120" y2="142" stroke="var(--fc)" strokeWidth="4" />
      </g>
      {/* Floating SLA / B2B Chip */}
      <g className="float-slow">
        <rect
          x="158"
          y="48"
          width="48"
          height="30"
          rx="8"
          fill="var(--fc-light)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="182"
          y="68"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="var(--fc)"
        >
          B2B
        </text>
      </g>
    </svg>
  ),

  "legal": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Balance Scales & Pillar */}
      <rect
        x="64"
        y="58"
        width="112"
        height="136"
        rx="14"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <line x1="120" y1="74" x2="120" y2="164" stroke="#0F172A" strokeWidth="2.5" />
      <line x1="86" y1="92" x2="154" y2="92" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Scale Pans */}
      <path d="M86 92l-14 26h28L86 92z" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.4" />
      <path d="M154 92l-14 26h28L154 92z" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.4" />
      {/* Floating Compliance Verified Seal */}
      <g className="float-slow">
        <circle
          cx="174"
          cy="60"
          r="18"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <path
          d="M168 60l4 4 8-8"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  ),

  "education": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Open Book / Digital Syllabus */}
      <rect
        x="58"
        y="80"
        width="124"
        height="100"
        rx="14"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <path
        d="M68 156c20-8 36-4 52 4 16-8 32-12 52-4v-56c-20-8-36-4-52 4-16-8-32-12-52-4v56z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <line x1="120" y1="104" x2="120" y2="160" stroke="#0F172A" strokeWidth="2" />
      {/* Mortarboard / Grad Cap */}
      <g className="float">
        <polygon
          points="120,44 164,62 120,80 76,62"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.8"
        />
        <path
          d="M92 70v16c0 15 28 15 28 15s28 0 28-15V70"
          fill="none"
          stroke="#0F172A"
          strokeWidth="2"
        />
        <line x1="158" y1="64" x2="166" y2="88" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  ),

  "real-estate": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Architectural Towers */}
      <rect
        x="68"
        y="78"
        width="48"
        height="110"
        rx="8"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="124"
        y="50"
        width="48"
        height="138"
        rx="8"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Windows Grid */}
      <g fill="#0F172A" opacity=".7">
        <rect x="78" y="92" width="10" height="12" rx="2" />
        <rect x="96" y="92" width="10" height="12" rx="2" />
        <rect x="78" y="114" width="10" height="12" rx="2" />
        <rect x="96" y="114" width="10" height="12" rx="2" />
        <rect x="78" y="136" width="10" height="12" rx="2" />
        <rect x="96" y="136" width="10" height="12" rx="2" />
        {/* Right Tower */}
        <rect x="134" y="66" width="10" height="12" rx="2" fill="var(--fc)" />
        <rect x="152" y="66" width="10" height="12" rx="2" fill="var(--fc)" />
        <rect x="134" y="88" width="10" height="12" rx="2" fill="var(--fc)" />
        <rect x="152" y="88" width="10" height="12" rx="2" fill="var(--fc)" />
        <rect x="134" y="110" width="10" height="12" rx="2" fill="var(--fc)" />
        <rect x="152" y="110" width="10" height="12" rx="2" fill="var(--fc)" />
      </g>
      {/* Location Pin */}
      <g className="float-slow">
        <circle
          cx="60"
          cy="60"
          r="16"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <circle cx="60" cy="58" r="5" fill="#FFFFFF" />
      </g>
    </svg>
  ),

  "hospitality": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Service Platter / Cloche */}
      <rect
        x="62"
        y="154"
        width="116"
        height="18"
        rx="6"
        fill="#0F172A"
      />
      <path
        d="M68 154c0-38 23-56 52-56s52 18 52 56H68z"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <circle
        cx="120"
        cy="92"
        r="8"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      {/* 5-Star Experience Badge */}
      <g className="float-slow">
        <rect
          x="148"
          y="46"
          width="54"
          height="32"
          rx="10"
          fill="var(--fc-light)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="175"
          y="67"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="12"
          fill="var(--fc)"
        >
          ★ 5.0
        </text>
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="48" cy="110" r="3" />
        <circle cx="196" cy="130" r="2.5" />
      </g>
    </svg>
  ),

  "sales-crm": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Pipeline Funnel & Stages */}
      <polygon
        points="60,60 180,60 144,124 144,178 96,178 96,124"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="74"
        y="72"
        width="92"
        height="22"
        rx="4"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.2"
      />
      <rect
        x="88"
        y="102"
        width="64"
        height="22"
        rx="4"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.2"
      />
      {/* Floating Lead Score */}
      <g className="float-slow">
        <rect
          x="154"
          y="126"
          width="48"
          height="32"
          rx="8"
          fill="#0F172A"
        />
        <text
          x="178"
          y="146"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="var(--fc-light)"
        >
          CRM
        </text>
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="46" cy="74" r="3" />
        <circle cx="196" cy="80" r="2.5" />
      </g>
    </svg>
  ),

  "hr-recruitment": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Talent Card & Matching Node */}
      <rect
        x="64"
        y="56"
        width="112"
        height="136"
        rx="16"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <circle
        cx="120"
        cy="96"
        r="22"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <path
        d="M92 152c0-15.464 12.536-28 28-28s28 12.536 28 28"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      {/* Floating Match Score */}
      <g className="float-slow">
        <rect
          x="150"
          y="42"
          width="54"
          height="32"
          rx="10"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="177"
          y="62"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="12"
          fill="#FFFFFF"
        >
          98%
        </text>
      </g>
    </svg>
  ),

  "fitness": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Activity Tracker / Concentric biometric rings */}
      <circle
        cx="120"
        cy="120"
        r="64"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <circle
        cx="120"
        cy="120"
        r="48"
        fill="none"
        stroke="var(--fc-light)"
        strokeWidth="8"
      />
      <circle
        cx="120"
        cy="120"
        r="34"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="7"
        strokeDasharray="160 50"
      />
      <circle
        cx="120"
        cy="120"
        r="18"
        fill="#0F172A"
      />
      {/* Floating Heartbeat Badge */}
      <g className="float-slow">
        <rect
          x="154"
          y="48"
          width="48"
          height="30"
          rx="8"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="178"
          y="68"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          BPM
        </text>
      </g>
    </svg>
  ),

  "content-media": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Publishing Feed & Media Screen */}
      <rect
        x="56"
        y="60"
        width="128"
        height="128"
        rx="16"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="68"
        y="72"
        width="104"
        height="56"
        rx="8"
        fill="var(--fc-dark)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      {/* Playhead */}
      <polygon
        points="114,90 134,100 114,110"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      {/* Audio Waveform lines */}
      <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
        <line x1="74" y1="152" x2="74" y2="164" />
        <line x1="84" y1="144" x2="84" y2="172" stroke="var(--fc)" />
        <line x1="94" y1="148" x2="94" y2="168" />
        <line x1="104" y1="138" x2="104" y2="178" stroke="var(--fc)" />
        <line x1="114" y1="150" x2="114" y2="166" />
        <line x1="124" y1="142" x2="124" y2="174" stroke="var(--fc)" />
        <line x1="134" y1="154" x2="134" y2="162" />
        <line x1="144" y1="146" x2="144" y2="170" />
        <line x1="154" y1="150" x2="154" y2="166" />
        <line x1="164" y1="154" x2="164" y2="162" />
      </g>
    </svg>
  ),

  "customer-support": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Headset & Communication Bubble */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <circle
        cx="120"
        cy="114"
        r="32"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
      {/* Speech Chat Bubbles */}
      <path
        d="M106 108h28M106 120h18"
        stroke="#0F172A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Floating 24/7 SLA Chip */}
      <g className="float-slow">
        <rect
          x="154"
          y="42"
          width="48"
          height="30"
          rx="8"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="178"
          y="62"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          24/7
        </text>
      </g>
    </svg>
  ),
  "telecom-iot": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Base Station Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Antenna Tower & Transmission Grid */}
      <path
        d="M120 86v68M104 154l16-68 16 68M96 132h48M100 112h40"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wireless Signal Waves */}
      <path
        d="M92 90a36 36 0 0156 0M80 78a54 54 0 0180 0"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="120" cy="86" r="6" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.8" />
      {/* Floating 5G IoT Node Chip */}
      <g className="float-slow">
        <rect
          x="148"
          y="38"
          width="54"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="175"
          y="59"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          5G·IoT
        </text>
      </g>
    </svg>
  ),
  "cybersecurity": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Security Vault Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Security Shield */}
      <path
        d="M120 84l32 12v26c0 22-14 36-32 44-18-8-32-22-32-44V96l32-12z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Keyhole / Biometric Core */}
      <circle cx="120" cy="116" r="7" fill="#0F172A" />
      <path d="M117 122l-2 14h10l-2-14" fill="#0F172A" />
      {/* Floating Zero-Trust Lock Badge */}
      <g className="float-slow">
        <rect
          x="146"
          y="40"
          width="56"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="174"
          y="61"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="10.5"
          fill="#FFFFFF"
        >
          ZERO·T
        </text>
      </g>
    </svg>
  ),
  "govtech": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Public Civic Portal Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Classical Portico Pediment & Columns */}
      <path
        d="M80 102l40-20 40 20v6H80v-6z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="2"
      />
      <g stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round">
        <line x1="90" y1="108" x2="90" y2="148" />
        <line x1="105" y1="108" x2="105" y2="148" />
        <line x1="120" y1="108" x2="120" y2="148" />
        <line x1="135" y1="108" x2="135" y2="148" />
        <line x1="150" y1="108" x2="150" y2="148" />
        <line x1="76" y1="148" x2="164" y2="148" strokeWidth="3" />
        <line x1="72" y1="154" x2="168" y2="154" strokeWidth="3" />
      </g>
      {/* Floating Citizen AAA Badge */}
      <g className="float-slow">
        <rect
          x="148"
          y="38"
          width="54"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="175"
          y="59"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          WCAG·3A
        </text>
      </g>
    </svg>
  ),
  "energy-utilities": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Smart Grid Utility Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Smart Grid Transmission Lines & Meter Dial */}
      <circle cx="120" cy="120" r="32" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.8" />
      {/* High-Voltage Lightning Surge */}
      <path
        d="M123 98l-14 24h12l-6 24 20-28h-14l8-20h-6z"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Floating Smart Grid / VPP Tag */}
      <g className="float-slow">
        <rect
          x="148"
          y="40"
          width="54"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="175"
          y="61"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          SMART·G
        </text>
      </g>
    </svg>
  ),
  "biotech-pharma": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Laboratory Specimen Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Erlenmeyer Chemical Flask with Solution */}
      <path
        d="M112 86h16v18l24 38c3 5-1 12-7 12H95c-6 0-10-7-7-12l24-38V86z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Solution Fill & Bubble Nodes */}
      <path
        d="M100 134c8-3 18 3 26-1 8-4 14 0 14 0l5 9c2 4-1 9-6 9H95c-5 0-8-5-6-9l11-8z"
        fill="var(--fc)"
      />
      <circle cx="114" cy="120" r="3.5" fill="#0F172A" />
      <circle cx="128" cy="112" r="2.5" fill="#0F172A" />
      <circle cx="122" cy="136" r="3" fill="#FFFFFF" />
      {/* Floating FDA 21-CFR Tag */}
      <g className="float-slow">
        <rect
          x="146"
          y="38"
          width="56"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="174"
          y="59"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="10"
          fill="#FFFFFF"
        >
          21·CFR·11
        </text>
      </g>
    </svg>
  ),
  "automotive-mobility": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Connected Vehicle Chassis Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Aerodynamic Car Body Profile */}
      <path
        d="M80 138l12-24h46l18 12 12 12H80z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="96" cy="144" r="11" fill="var(--fc)" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="96" cy="144" r="4" fill="#FFFFFF" />
      <circle cx="146" cy="144" r="11" fill="var(--fc)" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="146" cy="144" r="4" fill="#FFFFFF" />
      {/* EV Wireless Telemetry Waves */}
      <path
        d="M120 90a18 18 0 0114 6M120 82a28 28 0 0122 10"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Floating EV Telematics Tag */}
      <g className="float-slow">
        <rect
          x="146"
          y="40"
          width="54"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="173"
          y="61"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          EV·FLEET
        </text>
      </g>
    </svg>
  ),
  "construction-engineering": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Engineering Blueprint Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Tower Crane & Structural Steel Truss */}
      <path
        d="M92 154V88l48 18M116 97v57M92 98l48 18M92 120l48 18M92 142l48 18"
        fill="none"
        stroke="#0F172A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Suspended I-Beam Girder */}
      <path
        d="M84 128h58"
        stroke="var(--fc)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line x1="140" y1="106" x2="140" y2="128" stroke="#0F172A" strokeWidth="1.6" strokeDasharray="3 3" />
      {/* Floating BIM CAD Badge */}
      <g className="float-slow">
        <rect
          x="148"
          y="38"
          width="52"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="174"
          y="59"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#FFFFFF"
        >
          BIM·3D
        </text>
      </g>
    </svg>
  ),
  "nonprofit-impact": (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      {/* Impact Foundation Frame */}
      <rect
        x="60"
        y="68"
        width="120"
        height="110"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      {/* Giving Hands Cradling Heart & Growth Sprout */}
      <circle cx="120" cy="120" r="30" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.6" />
      <path
        d="M120 106c-4-6-12-6-16 0-4 6 0 14 16 22 16-8 20-16 16-22-4-6-12-6-16 0z"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M106 142c10-2 18 2 28-2M100 148c14-2 26 2 40-2"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Floating Philanthropy Impact Tag */}
      <g className="float-slow">
        <rect
          x="146"
          y="40"
          width="56"
          height="32"
          rx="9"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <text
          x="174"
          y="61"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="10"
          fill="#FFFFFF"
        >
          IMPACT
        </text>
      </g>
    </svg>
  ),
};

// Fallback artwork generator for custom/new industries
export function getIndustryArtwork(slug: string): React.ReactNode {
  if (industryArtworks[slug]) {
    return industryArtworks[slug];
  }
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      <rect
        x="64"
        y="60"
        width="112"
        height="128"
        rx="16"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="76"
        y="74"
        width="88"
        height="100"
        rx="10"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      <circle cx="120" cy="120" r="22" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.5" />
      <g className="float-slow">
        <circle cx="170" cy="66" r="16" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.4" />
        <path d="M164 66l4 4 8-8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

// Color variant theme mapping matching /services
export const industryCardVariants: Record<string, string> = {
  "retail-ecommerce": "card orange",
  "finance": "card green",
  "healthcare": "card pink",
  "manufacturing-logistics": "card orange",
  "saas-subscription": "card indigo",
  "professional-services": "card blue",
  "legal": "card gold",
  "education": "card purple",
  "real-estate": "card green",
  "hospitality": "card pink",
  "sales-crm": "card indigo",
  "hr-recruitment": "card purple",
  "fitness": "card pink",
  "content-media": "card purple",
  "customer-support": "card",
  "telecom-iot": "card blue",
  "cybersecurity": "card indigo",
  "govtech": "card gold",
  "energy-utilities": "card green",
  "biotech-pharma": "card pink",
  "automotive-mobility": "card orange",
  "construction-engineering": "card orange",
  "nonprofit-impact": "card green",
};

// Sector definitions for intuitive categorization (23 total industries)
export const SECTORS = [
  { id: "all", label: "All Industries" },
  { id: "tech", label: "Technology & Cloud", slugs: ["saas-subscription", "sales-crm", "content-media", "customer-support", "telecom-iot", "cybersecurity"] },
  { id: "finance-legal", label: "Finance, Legal & Gov", slugs: ["finance", "legal", "govtech"] },
  { id: "health-lifesciences", label: "Health & Life Sciences", slugs: ["healthcare", "biotech-pharma", "fitness"] },
  { id: "commerce-hospitality", label: "Commerce & Hospitality", slugs: ["retail-ecommerce", "hospitality", "real-estate", "nonprofit-impact"] },
  { id: "industrial-energy", label: "Industrial, Energy & Fleet", slugs: ["manufacturing-logistics", "energy-utilities", "automotive-mobility", "construction-engineering", "professional-services", "hr-recruitment", "education"] },
];
