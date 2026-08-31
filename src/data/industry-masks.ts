import React from 'react';

export interface IndustryMaskConfig {
  eyebrow: string;
  maskSvgUri: string;
  watermarkText: string;
  title: string;
  subtitle: string | React.ReactNode;
  outroTitle: string | React.ReactNode;
  outroSubtitle: string | React.ReactNode;
  videoSrc: string;
  fallbackVideoSrc?: string;
  posterSrc: string;
  accentColor: string;
}

// Utility to encode SVG into standard CSS mask data URI
export function createSvgMask(svgContent: string, viewBox = '0 0 100 100'): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="%23000000">${svgContent}</svg>`;
}

// ── Curated Industry-Specific Videos, Solid Silhouettes & Domain Copy ──────────
export const INDUSTRY_MASKS: Record<string, IndustryMaskConfig> = {
  // 1. Retail & E-Commerce (Shopping, Storefront, Consumer Checkout)
  'retail-ecommerce': {
    eyebrow: 'Omnichannel Architecture',
    maskSvgUri: createSvgMask(
      `<path d="M10 16h16l14 44h42l12-34H26L10 16zm26 56a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm38 0a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'COMMERCE',
    title: 'Next-Gen Commerce Systems',
    subtitle: 'Unified headless storefronts, sub-second product catalogue queries, and AI-driven inventory forecasting built to scale through peak seasonal demand.',
    outroTitle: 'High-Conversion Infrastructure',
    outroSubtitle: 'Engineered for sub-100ms checkout latency, dynamic multi-currency payments, and continuous automated supply chain synchronization.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-clothes-in-a-fashion-store-5221/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#0891B2',
  },

  // 2. Finance & Banking (Financial District, Data Analytics, Institutional Ledgers)
  'finance': {
    eyebrow: 'Institutional FinTech',
    maskSvgUri: createSvgMask(
      `<path d="M50 6L14 22v32c0 25 15 40 36 46 21-6 36-21 36-46V22L50 6z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'FINANCE',
    title: 'Autonomous Ledgers & Risk Engines',
    subtitle: 'Bank-grade microservices, real-time transaction reconciliation, and automated regulatory reporting engineered for zero data loss.',
    outroTitle: 'Institutional Reliability',
    outroSubtitle: 'SOC 2 and FCA compliant infrastructures capable of parsing high-frequency transaction streams with cryptographic auditability.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-financial-district-with-tall-buildings-5645/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#059669',
  },

  // 3. Healthcare & Health Tech (Clinical Diagnostics, Medical Tech)
  'healthcare': {
    eyebrow: 'Clinical Systems & HealthTech',
    maskSvgUri: createSvgMask(
      `<path d="M35 10h30v25h25v30H65v25H35V65H10V35h25V10z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'HEALTH',
    title: 'Interoperable Clinical Ecosystems',
    subtitle: 'HL7 FHIR integrations, automated medical transcription, and low-latency remote monitoring pipelines engineered to return critical time to caregivers.',
    outroTitle: 'Patient-Centric Precision',
    outroSubtitle: 'HIPAA and NHS Digital compliant architectures delivering end-to-end data privacy, real-time care team alerts, and reliable telehealth access.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-a-doctor-looking-at-a-screen-5178/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#0891B2',
  },

  // 4. Manufacturing & Logistics (Warehouse Robotics, Smart Factory)
  'manufacturing-logistics': {
    eyebrow: 'Industrial IoT & Supply Chain',
    maskSvgUri: createSvgMask(
      `<path d="M8 84V38l28 18V38l28 18V18h28v66H8z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'LOGISTICS',
    title: 'Intelligent Factory Telemetry',
    subtitle: 'Real-time SCADA and edge sensor aggregation, automated warehouse orchestration, and predictive maintenance algorithms that eliminate unplanned downtime.',
    outroTitle: 'Resilient Supply Networks',
    outroSubtitle: 'Synchronizing multi-site production schedules, raw material inventory buffers, and fleet logistics in a single operational view.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-automated-warehouse-robot-5182/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#D97706',
  },

  // 5. SaaS & Subscription (Server Room, Cloud Infrastructure)
  'saas-subscription': {
    eyebrow: 'Cloud Architecture & B2B SaaS',
    maskSvgUri: createSvgMask(
      `<path d="M74 38a22 22 0 0 0-41-10 18 18 0 0 0-17 18 18 18 0 0 0 4 10h58a16 16 0 0 0 16-16c0-6-5-11-10-12M12 62h76v12H12zm0 16h76v10H12z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'PLATFORM',
    title: 'Multi-Tenant Platform Engineering',
    subtitle: 'Scalable tenant isolation, metered event billing engines, and predictive churn telemetry designed to power product-led growth.',
    outroTitle: 'Engineered for Retention',
    outroSubtitle: 'High-concurrency microservices, automated user activation pathways, and granular feature usage analytics built for high-velocity teams.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-server-room-with-blinking-lights-5136/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#4F46E5',
  },

  // 6. Professional Services (Corporate Consulting Boardroom)
  'professional-services': {
    eyebrow: 'Practice Operations & Delivery',
    maskSvgUri: createSvgMask(
      `<path d="M34 22V14a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v8h22a6 6 0 0 1 6 6v56a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6h22zm8-6v6h16v-6H42z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'SERVICES',
    title: 'Practice Intelligence & Automation',
    subtitle: 'Live margin visibility per engagement, automated template-driven SOW generation, and integrated capacity planning platforms.',
    outroTitle: 'Maximize Utilization',
    outroSubtitle: 'Consolidating timesheet telemetry, client milestone deliverables, and automated billing into real-time operational workflows.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-business-meeting-in-an-office-5205/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#0284C7',
  },

  // 7. Legal & Compliance (Law Library, Gavel, Document Analytics)
  'legal': {
    eyebrow: 'LegalTech & Compliance',
    maskSvgUri: createSvgMask(
      `<path d="M46 10h8v10h32l-10 32H54v34h18v8H28v-8h18V52H24L14 20h32V10zm24 16l6 20H54V26h16zM30 26h16v20H24l6-20z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'JUSTICE',
    title: 'Confidential Matter Management',
    subtitle: 'Domain-specific NLP for rapid contract review, automated compliance deadline tracking, and sovereign cloud document vaults.',
    outroTitle: 'Auditable Practice Systems',
    outroSubtitle: 'Enforcing strict role-based privilege controls, tamper-proof audit trails, and zero-knowledge document extraction workflows.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-books-in-a-law-library-5231/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#2563EB',
  },

  // 8. Education & EdTech (Digital Classroom, Campus Learning)
  'education': {
    eyebrow: 'EdTech & Digital Classrooms',
    maskSvgUri: createSvgMask(
      `<path d="M50 12L4 34l46 22 42-19V62h6V34L50 12zm-28 40v18c0 12 12 20 28 20s28-8 28-20V52L50 66 22 52z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'LEARN',
    title: 'Adaptive Learning Architectures',
    subtitle: 'High-concurrency digital assessment engines, automated grading workflows, and real-time student progression analytics.',
    outroTitle: 'Elevate Learning Outcomes',
    outroSubtitle: 'Seamless SIS and LMS interoperability, offline-capable student portals, and personalized learning pathway recommendation engines.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-students-studying-in-a-library-5188/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#7C3AED',
  },

  // 9. Real Estate & Property (Aerial Skyscrapers, Architectural Towers)
  'real-estate': {
    eyebrow: 'PropTech & Asset Management',
    maskSvgUri: createSvgMask(
      `<path d="M14 86V34l26-14v66H14zm26 0V10l46-8v84H40z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'PROPERTY',
    title: 'Intelligent Property Platforms',
    subtitle: 'Automated tenant screening pipelines, multi-portal listing synchronizations, and AI market pricing intelligence.',
    outroTitle: 'Accelerate Transaction Velocity',
    outroSubtitle: 'Centralizing lease agreements, automated maintenance dispatchers, and investor reporting into modern cloud interfaces.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-modern-skyscrapers-5593/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#059669',
  },

  // 10. Hospitality & Food Service (Luxury Resort, Hospitality Experience)
  'hospitality': {
    eyebrow: 'Hospitality & Guest Experience',
    maskSvgUri: createSvgMask(
      `<path d="M50 14a6 6 0 0 1 6 6c0 1-.3 2-.7 3A42 42 0 0 1 92 64H8a42 42 0 0 1 34.7-41c-.4-1-.7-2-.7-3a6 6 0 0 1 6-6zm42 56v12H8V70h84z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'GUEST',
    title: 'Unified Reservation & Guest Systems',
    subtitle: 'Real-time channel synchronization, AI demand-based menu forecasting, and automated pre-arrival guest personalization workflows.',
    outroTitle: 'Predictive Service Excellence',
    outroSubtitle: 'Eliminating overbooking friction, slashing kitchen food waste, and orchestrating property management systems seamlessly.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-luxury-hotel-lobby-and-pool-5277/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#E11D48',
  },

  // 11. Sales & CRM (Revenue Analytics, Growth Dashboards)
  'sales-crm': {
    eyebrow: 'Revenue Operations & CRM',
    maskSvgUri: createSvgMask(
      `<path d="M10 14h80L58 54v28L42 90V54L10 14z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'REVENUE',
    title: 'Intelligent Revenue Engines',
    subtitle: 'Behavioral lead scoring models, automated CRM record enrichment, and data-driven pipeline forecasting dashboards.',
    outroTitle: 'High-Velocity Deal Execution',
    outroSubtitle: 'Connecting sales outreach, email telemetry, and deal stages to empower reps to focus on closing high-intent opportunities.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-business-dashboard-and-analytics-5309/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#4F46E5',
  },

  // 12. HR & Recruitment (Talent Workplace, Team Collaboration)
  'hr-recruitment': {
    eyebrow: 'People Analytics & Talent Platforms',
    maskSvgUri: createSvgMask(
      `<path d="M50 10a20 20 0 1 1 0 40 20 20 0 0 1 0-40zm0 46c24 0 40 14 40 32v6H10v-6c0-18 16-32 40-32z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'TALENT',
    title: 'Intelligent Talent Workflows',
    subtitle: 'Automated resume parsing and skills matching, digital employee onboarding journeys, and predictive attrition analytics.',
    outroTitle: 'Streamline Workforce Operations',
    outroSubtitle: 'Reducing hiring cycle duration by 50% while giving team members modern self-service portals that eliminate routine HR overhead.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-diverse-business-team-collaborating-5204/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#7C3AED',
  },

  // 13. Fitness & Wellness (Athlete Training, Gym Performance)
  'fitness': {
    eyebrow: 'Wellness Tech & Member Portals',
    maskSvgUri: createSvgMask(
      `<path d="M10 30h14v40H10zm14 12h10v16H24zm10 5h32v6H34zm32-5h10v16H66zm10-12h14v40H76z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'WELLNESS',
    title: 'Connected Wellness Platforms',
    subtitle: 'Real-time class booking engines, member retention prediction models, and personalized fitness recommendation systems.',
    outroTitle: 'Lasting Member Engagement',
    outroSubtitle: 'Delivering branded iOS/Android apps, automated renewal triggers, and integrated payment processing with zero friction.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-person-training-in-a-gym-5192/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#E11D48',
  },

  // 14. Content & Media (Film Studio, Cinema Camera Production)
  'content-media': {
    eyebrow: 'Publishing & Digital Media',
    maskSvgUri: createSvgMask(
      `<path d="M8 14h84a6 6 0 0 1 6 6v60a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6zm32 18v32l26-16-26-16z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'PUBLISHING',
    title: 'High-Throughput Media Engines',
    subtitle: 'Headless editorial workflows, automated multi-platform content syndication, and real-time audience engagement telemetry.',
    outroTitle: 'Monetize Digital Reach',
    outroSubtitle: 'Dynamic paywall architectures, automated video excerpting pipelines, and global edge CDN content delivery.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-filming-with-a-professional-camera-5249/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#7C3AED',
  },

  // 15. Customer Support (Contact Center, Support Operations)
  'customer-support': {
    eyebrow: 'Support Operations & AI Copilots',
    maskSvgUri: createSvgMask(
      `<path d="M50 10a38 38 0 0 0-38 38v20a10 10 0 0 0 10 10h10V52H20v-4a30 30 0 1 1 60 0v4H68v26h10a10 10 0 0 0 10-10V48a38 38 0 0 0-38-38zm-8 66h16v8H42z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'SUPPORT',
    title: 'Autonomous Support Ecosystems',
    subtitle: 'Context-aware support copilots, intelligent ticket routing, and self-updating knowledge base search.',
    outroTitle: 'First-Contact Resolution',
    outroSubtitle: 'Slashing response times by 60% while deflecting repetitive inquiries with verified resolution workflows.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-call-center-operators-at-work-5211/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#0891B2',
  },

  // 16. Telecom & IoT Networks (Optical Fiber Cables, Glowing Data)
  'telecom-iot': {
    eyebrow: 'Edge Computing & Carrier Systems',
    maskSvgUri: createSvgMask(
      `<path d="M50 6a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-6 26h12l18 60H62l-4-18H42l-4 18H26l18-60zm2 16l-6 22h20l-6-22h-8z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'TELEMETRY',
    title: 'High-Concurrency Telemetry',
    subtitle: 'Sub-second parsing of millions of distributed edge telemetry events, automated FOTA updates, and predictive network failure modeling.',
    outroTitle: 'Carrier-Grade Availability',
    outroSubtitle: 'Distributed Kafka and MQTT pipelines engineered for 99.999% uptime and real-time metered billing calculation.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-optical-fiber-cables-glowing-with-data-5402/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#0284C7',
  },

  // 17. Cybersecurity & Privacy (Threat Matrix, Cyber Defense)
  'cybersecurity': {
    eyebrow: 'SecOps & Continuous Compliance',
    maskSvgUri: createSvgMask(
      `<path d="M50 6L10 22v32c0 28 18 44 40 50 22-6 40-22 40-50V22L50 6z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'SECURITY',
    title: 'Zero-Trust Security Fabrics',
    subtitle: 'Automated SOAR incident containment, continuous multi-cloud SOC 2 evidence scanning, and unified identity posture management.',
    outroTitle: 'Proactive Threat Neutralization',
    outroSubtitle: 'Isolating compromised endpoints in milliseconds with immutable audit logging and real-time threat feed correlation.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-cyber-security-code-on-screen-5417/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#4F46E5',
  },

  // 18. GovTech & Public Sector (Civic Infrastructure, Municipal Halls)
  'govtech': {
    eyebrow: 'Civic Infrastructure & Portals',
    maskSvgUri: createSvgMask(
      `<path d="M50 8L8 30v8h84v-8L50 8zM12 44h14v34H12zm18 0h14v34H30zm18 0h14v34H48zm18 0h14v34H66zm18 0h14v34H84zm-76 40h92v10H8z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'PUBLIC',
    title: 'Accessible Public Platforms',
    subtitle: 'WCAG 2.2 AAA compliant citizen portals, automated permit verification engines, and sovereign cloud registry modernization.',
    outroTitle: 'Trusted Civic Infrastructure',
    outroSubtitle: 'Replacing legacy monolithic databases with zero-downtime microservices and unified citizen identity authentication.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-government-building-with-flags-5318/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#2563EB',
  },

  // 19. Energy & Smart Utilities (Wind Turbines, Solar Generation)
  'energy-utilities': {
    eyebrow: 'Smart Grids & Distributed Energy',
    maskSvgUri: createSvgMask(
      `<path d="M60 6L18 52h28l-10 42 46-52H54l16-36H60z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'ENERGY',
    title: 'Distributed Energy Orchestration',
    subtitle: 'AI-driven renewable generation forecasting, smart meter interval billing engines, and real-time Virtual Power Plant dispatch.',
    outroTitle: 'Grid Resilience & Efficiency',
    outroSubtitle: 'Balancing solar, wind, and battery storage assets with sub-second SCADA integration and dynamic tariff calculation.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-wind-turbines-in-a-green-field-5120/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#059669',
  },

  // 20. Biotech & Life Sciences (Laboratory Pipetting, Molecular Biology)
  'biotech-pharma': {
    eyebrow: 'Life Sciences & Clinical Analytics',
    maskSvgUri: createSvgMask(
      `<path d="M38 8h24v20l28 48a8 8 0 0 1-7 12H17a8 8 0 0 1-7-12l28-48V8z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'BIOTECH',
    title: 'Validated Laboratory Pipelines',
    subtitle: 'Automated instrument data harmonization, GxP and FDA 21 CFR Part 11 compliant audit logs, and AI clinical trial cohort matching.',
    outroTitle: 'Accelerate Therapeutic Discovery',
    outroSubtitle: 'Scaling GPU bioinformatics compute clusters and safeguarding patient health information with differential privacy.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-scientist-working-with-pipette-in-lab-5173/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#E11D48',
  },

  // 21. Automotive & Fleet Mobility (Electric Car, Highway Mobility)
  'automotive-mobility': {
    eyebrow: 'Connected Vehicles & Fleet Tech',
    maskSvgUri: createSvgMask(
      `<path d="M12 60l16-26h44l16 16 8 10v18H84a10 10 0 0 1-20 0H36a10 10 0 0 1-20 0H4V60h8zm14 14a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm48 0a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'MOBILITY',
    title: 'Connected Fleet Intelligence',
    subtitle: 'Dynamic multi-stop route optimization, depot smart EV charging schedulers, and real-time CAN bus telemetry monitoring.',
    outroTitle: 'Optimize Dispatch & Health',
    outroSubtitle: 'Cutting fuel and maintenance overhead while giving customers live turn-by-turn map tracking and electronic proof of delivery.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-driving-a-car-on-a-highway-at-night-5464/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#D97706',
  },

  // 22. Construction & Engineering (Building Site, Tower Cranes)
  'construction-engineering': {
    eyebrow: 'Jobsite Tech & BIM Systems',
    maskSvgUri: createSvgMask(
      `<path d="M50 12c-22 0-40 14-42 32h84c-2-18-20-32-42-32zm-46 38h92v14H4V50zm14 18h64v12H18V68z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'BUILD',
    title: 'Digital Jobsite & BIM Platforms',
    subtitle: 'Offline-first field inspection logs, automated subcontractor insurance compliance, and real-time drawing revision diffing.',
    outroTitle: 'Deliver on Schedule & Spec',
    outroSubtitle: 'Bridging superintendents and project engineers with synchronized 3D BIM models and transparent change order tracking.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-building-construction-site-with-cranes-5381/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#D97706',
  },

  // 23. Non-Profit & Social Impact (Conservation, Community Volunteering)
  'nonprofit-impact': {
    eyebrow: 'Philanthropy & Impact Analytics',
    maskSvgUri: createSvgMask(
      `<path d="M50 24c-6-14-22-16-32-4-10 10-8 26 4 38l28 28 28-28c12-12 14-28 4-38-10-12-26-10-32 4z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: 'IMPACT',
    title: 'Transparent Impact Platforms',
    subtitle: 'Recurring donor journey automation, centralized grant proposal lifecycle tracking, and verified public impact dashboards.',
    outroTitle: 'Maximize Mission Outcomes',
    outroSubtitle: 'Demonstrating measurable social return on investment (SROI) while reducing administrative overhead for mission-driven teams.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-volunteers-planting-trees-in-a-forest-5147/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#059669',
  },
};

// Fallback generator for any custom or new industry
export function getIndustryMaskConfig(slug: string, fallbackName?: string): IndustryMaskConfig {
  if (INDUSTRY_MASKS[slug]) {
    return INDUSTRY_MASKS[slug];
  }

  const name = fallbackName || slug.replace('-', ' ');
  return {
    eyebrow: `${name} Architecture`,
    maskSvgUri: createSvgMask(
      `<path d="M50 14L14 30v40l36 16 36-16V30L50 14zm0 18l22 10-22 10-22-10 22-10z" fill="%23000000"/>`,
      '0 0 100 100'
    ),
    watermarkText: name.slice(0, 8).toUpperCase(),
    title: `${name} Enterprise Systems`,
    subtitle: `Bespoke enterprise architecture, high-performance software engineering, and intelligent automation tailored for ${name}.`,
    outroTitle: `Scalable ${name} Infrastructure`,
    outroSubtitle: 'Engineered for scalability, precision, and measurable business growth with modern digital infrastructure.',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-financial-district-with-tall-buildings-5645/1080p.mp4',
    fallbackVideoSrc: 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80&auto=format&fit=crop',
    accentColor: '#0891B2',
  };
}
