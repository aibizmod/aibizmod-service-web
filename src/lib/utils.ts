import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CardData {
  id: number;
  title: string;
  description: string;
  color: string;
  href: string;
}

export const cardData: CardData[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Build fast, scalable, responsive websites and web applications that help businesses grow online.",
    color: "rgba(109, 40, 217, 0.8)",
    href: "/services/web-development",
  },
  {
    id: 2,
    title: "Custom Software Development",
    description: "Custom software solutions built to streamline operations, automate workflows, and support business growth.",
    color: "rgba(99, 102, 241, 0.8)",
    href: "/services/software-development",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Native and cross-platform apps built for iOS and Android deployment.",
    color: "rgba(162, 28, 175, 0.8)",
    href: "/services/mobile-app-development",
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Conversion tracking, Search Console auditing, and marketing campaign reporting.",
    color: "rgba(88, 28, 135, 0.8)",
    href: "/services/digital-marketing",
  },
  {
    id: 5,
    title: "Hosting & Infrastructure",
    description: "Reliable, scalable cloud infrastructure designed for maximum uptime and cost efficiency.",
    color: "rgba(124, 58, 237, 0.8)",
    href: "/services/hosting-infrastructure",
  },
  {
    id: 6,
    title: "Automation",
    description: "Intelligent automation pipelines that eliminate manual work and accelerate business operations.",
    color: "rgba(147, 51, 234, 0.8)",
    href: "/services/ai-automation",
  },
  {
    id: 7,
    title: "Customer Experience Management",
    description: "CX strategies and tooling that turn every interaction into lasting customer loyalty.",
    color: "rgba(192, 132, 252, 0.8)",
    href: "/services/customer-experience-management",
  },
  {
    id: 8,
    title: "IT Consulting & IT Services",
    description: "Strategic technology advisory and managed IT services aligned with your business goals.",
    color: "rgba(139, 92, 246, 0.8)",
    href: "/services/it-consulting-it-services",
  },
  {
    id: 9,
    title: "Microsoft Stack & Copilot",
    description: "Deploy Microsoft Teams, Power Apps, Power BI, SharePoint, and AI automations inside your existing Microsoft 365 environment.",
    color: "rgba(14, 165, 233, 0.8)",
    href: "/services/microsoft-stack",
  },
];
