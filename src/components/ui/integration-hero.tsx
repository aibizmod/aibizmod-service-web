"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";
import {
  Globe,
  Link,
  Shield,
  Layers,
  Server,
  Cpu,
  Settings,
  Zap,
  TrendingUp,
  ScanLine,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export type IntegrationIconItem =
  | { kind: "image"; src: string; alt: string }
  | { kind: "lucide"; icon: LucideIcon; alt: string };

const img = (src: string, alt: string): IntegrationIconItem => ({ kind: "image", src, alt });
const luc = (icon: LucideIcon, alt: string): IntegrationIconItem => ({ kind: "lucide", icon, alt });

export const HOSTING_ROW1: IntegrationIconItem[] = [
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", "AWS"),
  img("https://cdn.simpleicons.org/digitalocean/0080FF", "DigitalOcean"),
  img("https://cdn.simpleicons.org/vercel/000000", "Vercel"),
  img("https://cdn.simpleicons.org/netlify/00C7B7", "Netlify"),
  img("https://cdn.simpleicons.org/cloudflare/F38020", "Cloudflare"),
];

export const HOSTING_ROW2: IntegrationIconItem[] = [
  img("https://cdn.simpleicons.org/googlecloud/4285F4", "Google Cloud"),
  img("https://cdn.simpleicons.org/docker/2496ED", "Docker"),
  img("https://cdn.simpleicons.org/linux/FCC624", "Linux"),
  img("https://cdn.simpleicons.org/nginx/009639", "Nginx"),
  img("https://cdn.simpleicons.org/githubactions/2088FF", "CI/CD"),
];

export const CX_ROW1: IntegrationIconItem[] = [
  img("https://cdn.simpleicons.org/hubspot/FF7A59", "HubSpot"),
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/salesforce.svg", "Salesforce"),
  img("https://cdn.simpleicons.org/zoho/E42527", "Zoho CRM"),
  img("https://cdn.simpleicons.org/intercom/6AFDEF", "Intercom"),
  img("https://cdn.simpleicons.org/whatsapp/25D366", "WhatsApp"),
];

export const CX_ROW2: IntegrationIconItem[] = [
  img("https://cdn.simpleicons.org/zendesk/03363D", "Zendesk"),
  luc(Headphones, "Freshdesk"),
  img("https://cdn.simpleicons.org/typeform/262627", "Typeform"),
  img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
  img("https://cdn.simpleicons.org/make/6D00CC", "Make"),
];

export const WEB_DEV_ROWS: IntegrationIconItem[][] = [
  [
    img("https://cdn.simpleicons.org/nextdotjs/000000", "Next.js"),
    img("https://cdn.simpleicons.org/react/61DAFB", "React.js"),
    img("https://cdn.simpleicons.org/typescript/3178C6", "TypeScript"),
    img("https://cdn.simpleicons.org/javascript/F7DF1E", "JavaScript"),
    img("https://cdn.simpleicons.org/nodedotjs/339933", "Node.js"),
    img("https://cdn.simpleicons.org/nestjs/E0234E", "NestJS"),
    img("https://cdn.simpleicons.org/express/000000", "Express.js"),
    img("https://cdn.simpleicons.org/django/092E20", "Django"),
  ],
  [
    img("https://cdn.simpleicons.org/fastapi/009688", "FastAPI"),
    img("https://cdn.simpleicons.org/graphql/E10098", "GraphQL"),
    luc(Link, "REST APIs"),
    img("https://cdn.simpleicons.org/mongodb/47A248", "MongoDB"),
    img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
    img("https://cdn.simpleicons.org/mysql/4479A1", "MySQL"),
    img("https://cdn.simpleicons.org/redis/FF4438", "Redis"),
    img("https://cdn.simpleicons.org/prisma/2D3748", "Prisma"),
  ],
  [
    img("https://cdn.simpleicons.org/python/3776AB", "Python"),
    img("https://cdn.simpleicons.org/cplusplus/00599C", "C++"),
    img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", "AWS"),
    img("https://cdn.simpleicons.org/docker/2496ED", "Docker"),
    img("https://cdn.simpleicons.org/linux/FCC624", "Linux"),
    img("https://cdn.simpleicons.org/git/F05032", "Git"),
    img("https://cdn.simpleicons.org/github/181717", "GitHub"),
    img("https://cdn.simpleicons.org/tailwindcss/06B6D4", "Tailwind CSS"),
  ],
  [
    img("https://cdn.simpleicons.org/mui/007FFF", "Material UI"),
    luc(Shield, "JWT Auth"),
    img("https://cdn.simpleicons.org/githubactions/2088FF", "CI/CD"),
    img("https://cdn.simpleicons.org/vercel/000000", "Vercel"),
    img("https://cdn.simpleicons.org/render/46E3B7", "Render"),
    luc(Server, "Microservices"),
    luc(Layers, "System Design"),
  ],
];

export const DIGITAL_MARKETING_ROWS: IntegrationIconItem[][] = [
  [
    luc(Globe, "SEO"),
    luc(Globe, "GEO"),
    luc(Globe, "AEO"),
    luc(Globe, "Technical SEO"),
    luc(Globe, "Local SEO"),
    luc(Globe, "Keyword Research"),
    luc(Globe, "Content Marketing"),
  ],
  [
    img("https://cdn.simpleicons.org/googleanalytics/E37400", "Google Analytics 4"),
    img("https://cdn.simpleicons.org/googlesearchconsole/458CF5", "Google Search Console"),
    img("https://cdn.simpleicons.org/googletagmanager/246FDB", "Google Tag Manager"),
    img("https://cdn.simpleicons.org/looker/4285F4", "Looker Studio"),
    img("https://cdn.simpleicons.org/googleads/4285F4", "Google Ads"),
    img("https://cdn.simpleicons.org/meta/0081FB", "Meta Ads Manager"),
    img("https://cdn.simpleicons.org/semrush/FF642D", "SEMrush"),
  ],
  [
    luc(TrendingUp, "Ahrefs"),
    luc(ScanLine, "Screaming Frog"),
    luc(Link, "Link Building"),
    luc(Globe, "SEO Audits"),
    luc(Globe, "Programmatic SEO"),
    luc(Cpu, "AI Content Strategy"),
  ],
];

export const IT_CONSULTING_ROWS: IntegrationIconItem[][] = [
  [
    luc(Zap, "Digital Transformation"),
    luc(Cpu, "Technology Consulting"),
    img("https://cdn.simpleicons.org/googlecloud/4285F4", "Cloud Solutions"),
    luc(Layers, "Solution Architecture"),
    luc(Layers, "System Design"),
  ],
  [
    luc(Settings, "Business Process Auto"),
    img("https://cdn.simpleicons.org/python/3776AB", "Custom Software Dev"),
    luc(Link, "API Integration"),
    img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/azuredevops.svg", "DevOps Services"),
    luc(Settings, "Managed IT Services"),
  ],
];

export const SOFTWARE_DEV_ROWS: IntegrationIconItem[][] = [
  [
    img("https://cdn.simpleicons.org/python/3776AB", "Python"),
    img("https://cdn.simpleicons.org/nodedotjs/339933", "Node.js"),
    img("https://cdn.simpleicons.org/typescript/3178C6", "TypeScript"),
    img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
    img("https://cdn.simpleicons.org/docker/2496ED", "Docker"),
  ],
  [
    img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", "AWS"),
    img("https://cdn.simpleicons.org/githubactions/2088FF", "GitHub Actions"),
    img("https://cdn.simpleicons.org/fastapi/009688", "FastAPI"),
    img("https://cdn.simpleicons.org/express/000000", "Express.js"),
    img("https://cdn.simpleicons.org/redis/FF4438", "Redis"),
  ],
];

export const MOBILE_APP_ROWS: IntegrationIconItem[][] = [
  [
    img("https://cdn.simpleicons.org/react/61DAFB", "React Native"),
    img("https://cdn.simpleicons.org/flutter/02569B", "Flutter"),
    img("https://cdn.simpleicons.org/swift/F05138", "Swift"),
    img("https://cdn.simpleicons.org/kotlin/7F52FF", "Kotlin"),
    img("https://cdn.simpleicons.org/xcode/147EFB", "Xcode"),
  ],
  [
    img("https://cdn.simpleicons.org/androidstudio/3DDC84", "Android Studio"),
    img("https://cdn.simpleicons.org/firebase/DD2C00", "Firebase"),
    img("https://cdn.simpleicons.org/sentry/362D59", "Sentry"),
    img("https://cdn.simpleicons.org/fastlane/00F200", "Fastlane"),
    img("https://cdn.simpleicons.org/supabase/3FCF8E", "Supabase"),
  ],
];

export const AUTOMATION_ROWS: IntegrationIconItem[][] = [
  [
    img("https://cdn.simpleicons.org/n8n/EA4B71", "n8n"),
    img("https://cdn.simpleicons.org/make/6D00CC", "Make"),
    img("https://cdn.simpleicons.org/zapier/FF4A00", "Zapier"),
    img("https://cdn.simpleicons.org/nodedotjs/339933", "Node.js"),
  ],
  [
    luc(Link, "Webhooks"),
    luc(Link, "REST APIs"),
    img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
    img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg", "Slack API"),
  ],
];

const iconCircleStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1.5px solid #0891b2",
  borderRadius: "9999px",
};

function IconCircleContent({ item }: { item: IntegrationIconItem }) {
  if (item.kind === "image") {
    return (
      <img
        src={item.src}
        alt={`${item.alt} platform integration logo`}
        width={32}
        height={32}
        loading="lazy"
        className="h-8 w-8 object-contain"
        draggable={false}
      />
    );
  }

  const Icon = item.icon;
  return <Icon className="h-6 w-6" style={{ color: "#0891b2" }} aria-hidden="true" />;
}

interface IconMarqueeRowProps {
  icons: IntegrationIconItem[];
  reverse?: boolean;
}

function IconMarqueeRow({ icons, reverse = false }: IconMarqueeRowProps) {
  return (
    <div className="group flex max-w-full flex-row overflow-hidden py-2 [--gap:1.25rem] [gap:var(--gap)]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          className={`flex shrink-0 flex-row [gap:var(--gap)] ${
            reverse ? "animate-scroll-right" : "animate-scroll-left"
          }`}
          key={i}
        >
          {icons.map((icon, index) => (
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center p-3"
              style={iconCircleStyle}
              key={`${icon.alt}-${index}`}
            >
              <IconCircleContent item={icon} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface IntegrationHeroProps {
  rows?: IntegrationIconItem[][];
  iconsRow1?: IntegrationIconItem[];
  iconsRow2?: IntegrationIconItem[];
}

export default function IntegrationHero({ rows, iconsRow1, iconsRow2 }: IntegrationHeroProps) {
  const marqueeRows =
    rows ?? (iconsRow1 && iconsRow2 ? [iconsRow1, iconsRow2] : []);

  return (
    <div className="relative mt-10 w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      <div className="flex flex-col gap-3">
        {marqueeRows.map((rowIcons, index) => (
          <IconMarqueeRow key={index} icons={rowIcons} reverse={index % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

// Legacy type alias for pages still importing IntegrationIcon
export type IntegrationIcon = IntegrationIconItem;
