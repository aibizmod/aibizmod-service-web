"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";
import {
  Globe,
  Link2,
  Cpu,
  Search,
  MapPin,
  BarChart,
  Zap,
  Cloud,
  Layers,
  Settings,
  GitBranch,
  Server,
  Clock,
  TrendingUp,
  ScanLine,
  Bot,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type CarouselIconItem =
  | { kind: "image"; src: string; alt: string }
  | { kind: "lucide"; icon: LucideIcon; alt: string };

const img = (src: string, alt: string): CarouselIconItem => ({ kind: "image", src, alt });
const luc = (icon: LucideIcon, alt: string): CarouselIconItem => ({ kind: "lucide", icon, alt });

export const WEB_DEV_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/nextdotjs/000000", "Next.js"),
  img("https://cdn.simpleicons.org/react/61DAFB", "React"),
  img("https://cdn.simpleicons.org/typescript/3178C6", "TypeScript"),
  img("https://cdn.simpleicons.org/javascript/F7DF1E", "JavaScript"),
  img("https://cdn.simpleicons.org/nodedotjs/339933", "Node.js"),
  img("https://cdn.simpleicons.org/nestjs/E0234E", "NestJS"),
  img("https://cdn.simpleicons.org/express/000000", "Express"),
  img("https://cdn.simpleicons.org/django/092E20", "Django"),
  img("https://cdn.simpleicons.org/fastapi/009688", "FastAPI"),
  img("https://cdn.simpleicons.org/graphql/E10098", "GraphQL"),
];

export const WEB_DEV_ROW2: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/mongodb/47A248", "MongoDB"),
  img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
  img("https://cdn.simpleicons.org/mysql/4479A1", "MySQL"),
  img("https://cdn.simpleicons.org/redis/FF4438", "Redis"),
  img("https://cdn.simpleicons.org/prisma/2D3748", "Prisma"),
  img("https://cdn.simpleicons.org/python/3776AB", "Python"),
  img("https://cdn.simpleicons.org/docker/2496ED", "Docker"),
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", "AWS"),
  img("https://cdn.simpleicons.org/tailwindcss/06B6D4", "Tailwind"),
  img("https://cdn.simpleicons.org/github/181717", "GitHub"),
];

export const DIGITAL_MARKETING_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/googleanalytics/E37400", "Google Analytics 4"),
  img("https://cdn.simpleicons.org/googlesearchconsole/458CF5", "Google Search Console"),
  img("https://cdn.simpleicons.org/googletagmanager/246FDB", "Google Tag Manager"),
  img("https://cdn.simpleicons.org/looker/4285F4", "Looker Studio"),
  img("https://cdn.simpleicons.org/googleads/4285F4", "Google Ads"),
  img("https://cdn.simpleicons.org/meta/0081FB", "Meta Ads"),
  img("https://cdn.simpleicons.org/semrush/FF642D", "SEMrush"),
  luc(TrendingUp, "Ahrefs"),
];

export const DIGITAL_MARKETING_ROW2: CarouselIconItem[] = [
  luc(ScanLine, "Screaming Frog"),
  luc(Globe, "SEO"),
  luc(MapPin, "GEO"),
  luc(Search, "Technical SEO"),
  luc(BarChart, "Local SEO"),
  luc(Link2, "Link Building"),
  luc(Cpu, "AI Content Strategy"),
  luc(Zap, "Keyword Research"),
];

export const IT_CONSULTING_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/googlecloud/4285F4", "Google Cloud"),
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", "AWS"),
  img("https://cdn.simpleicons.org/docker/2496ED", "Docker"),
  img("https://cdn.simpleicons.org/kubernetes/326CE5", "Kubernetes"),
  img("https://cdn.simpleicons.org/terraform/844FBA", "Terraform"),
  img("https://cdn.simpleicons.org/ansible/EE0000", "Ansible"),
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/azuredevops.svg", "Azure DevOps"),
  img("https://cdn.simpleicons.org/jira/0052CC", "Jira"),
];

export const IT_CONSULTING_ROW2: CarouselIconItem[] = [
  luc(Zap, "Digital Transform"),
  luc(Cpu, "Tech Consulting"),
  luc(Cloud, "Cloud Solutions"),
  luc(Layers, "Solution Arch"),
  luc(Settings, "Biz Automation"),
  luc(Link2, "API Integration"),
  luc(GitBranch, "DevOps Services"),
  luc(Server, "Managed IT"),
];

export const SOFTWARE_DEV_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/python/3776AB", "Python"),
  img("https://cdn.simpleicons.org/nodedotjs/339933", "Node.js"),
  img("https://cdn.simpleicons.org/typescript/3178C6", "TypeScript"),
  img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
  img("https://cdn.simpleicons.org/docker/2496ED", "Docker"),
  img("https://cdn.simpleicons.org/fastapi/009688", "FastAPI"),
];

export const SOFTWARE_DEV_ROW2: CarouselIconItem[] = [
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", "AWS"),
  img("https://cdn.simpleicons.org/githubactions/2088FF", "GitHub Actions"),
  img("https://cdn.simpleicons.org/express/000000", "Express"),
  img("https://cdn.simpleicons.org/redis/FF4438", "Redis"),
  img("https://cdn.simpleicons.org/git/F05032", "Git"),
  img("https://cdn.simpleicons.org/linux/FCC624", "Linux"),
];

export const MOBILE_APP_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/react/61DAFB", "React Native"),
  img("https://cdn.simpleicons.org/flutter/02569B", "Flutter"),
  img("https://cdn.simpleicons.org/swift/F05138", "Swift"),
  img("https://cdn.simpleicons.org/kotlin/7F52FF", "Kotlin"),
  img("https://cdn.simpleicons.org/xcode/147EFB", "Xcode"),
  img("https://cdn.simpleicons.org/androidstudio/3DDC84", "Android Studio"),
];

export const MOBILE_APP_ROW2: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/firebase/DD2C00", "Firebase"),
  img("https://cdn.simpleicons.org/sentry/362D59", "Sentry"),
  img("https://cdn.simpleicons.org/fastlane/00F200", "Fastlane"),
  img("https://cdn.simpleicons.org/supabase/3FCF8E", "Supabase"),
  img("https://cdn.simpleicons.org/expo/000000", "Expo"),
  img("https://cdn.simpleicons.org/typescript/3178C6", "TypeScript"),
];

export const AUTOMATION_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/n8n/EA4B71", "n8n"),
  img("https://cdn.simpleicons.org/make/6D00CC", "Make"),
  img("https://cdn.simpleicons.org/zapier/FF4A00", "Zapier"),
  img("https://cdn.simpleicons.org/nodedotjs/339933", "Node.js"),
  img("https://cdn.simpleicons.org/postgresql/4169E1", "PostgreSQL"),
  img("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg", "Slack"),
];

export const AUTOMATION_ROW2: CarouselIconItem[] = [
  luc(Link2, "Webhooks"),
  luc(Globe, "REST APIs"),
  luc(Zap, "Automation"),
  luc(GitBranch, "Workflow"),
  luc(Clock, "Scheduling"),
  luc(Layers, "Integration"),
];

export const MICROSOFT_STACK_ROW1: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/microsoftteams/6264A7", "Microsoft Teams"),
  img("https://cdn.simpleicons.org/microsoftpowerbi/F2C811", "Power BI"),
  img("https://cdn.simpleicons.org/microsoftpowerautomate/0066FF", "Power Automate"),
  img("https://cdn.simpleicons.org/microsoftpowerapps/742774", "Power Apps"),
  img("https://cdn.simpleicons.org/microsoftsharepoint/03838F", "SharePoint"),
  img("https://cdn.simpleicons.org/microsoftoutlook/0078D4", "Outlook"),
];

export const MICROSOFT_STACK_ROW2: CarouselIconItem[] = [
  img("https://cdn.simpleicons.org/azure/0089D6", "Azure AI"),
  img("https://cdn.simpleicons.org/microsoftword/2B579A", "Word"),
  img("https://cdn.simpleicons.org/microsoftexcel/217346", "Excel"),
  img("https://cdn.simpleicons.org/microsoftonedrive/0078D4", "OneDrive"),
  luc(Bot, "Copilot Studio"),
  luc(Sparkles, "Microsoft Graph"),
];

const iconCircleStyle: React.CSSProperties = {
  width: 64,
  height: 64,
  borderRadius: 9999,
  background: "#ffffff",
  border: "1.5px solid #0891b2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

function repeatRow(icons: CarouselIconItem[], times = 4): CarouselIconItem[] {
  return Array.from({ length: times }).flatMap(() => icons);
}

function IconCircleContent({ item }: { item: CarouselIconItem }) {
  if (item.kind === "image") {
    return (
      <img
        src={item.src}
        alt={`${item.alt} technology integration logo`}
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        draggable={false}
      />
    );
  }

  const Icon = item.icon;
  return <Icon className="h-6 w-6" style={{ color: "#0891b2" }} aria-hidden="true" />;
}

interface MarqueeRowProps {
  icons: CarouselIconItem[];
  reverse?: boolean;
}

function MarqueeRow({ icons, reverse = false }: MarqueeRowProps) {
  const track = repeatRow(icons, 4);

  return (
    <div className="overflow-hidden py-2">
      <div
        className={`flex w-max gap-5 ${reverse ? "animate-scroll-right" : "animate-scroll-left"}`}
      >
        {track.map((item, index) => (
          <div style={iconCircleStyle} key={`${item.alt}-${index}`}>
            <IconCircleContent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface TechStackCarouselProps {
  row1: CarouselIconItem[];
  row2: CarouselIconItem[];
}

export default function TechStackCarousel({ row1, row2 }: TechStackCarouselProps) {
  return (
    <div className="relative mt-10 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      <div className="flex flex-col gap-3">
        <MarqueeRow icons={row1} />
        <MarqueeRow icons={row2} reverse />
      </div>
    </div>
  );
}
