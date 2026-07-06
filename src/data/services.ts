import { Code2, Smartphone, TrendingUp, Server, Zap, Users, Lightbulb, Cpu, type LucideIcon } from "lucide-react";

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  href: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  borderHover: string;
}

export const services: ServiceData[] = [
  {
    id: "ai-automation",
    name: "AI & Automation",
    description:
      "Build smart AI agents, predictive ML models, and automated workflows that eliminate manual tasks and streamline operations.",
    capabilities: [
      "AI agents & agentic workflows",
      "Predictive analytics & ML models",
      "Generative AI & LLM integration",
      "Computer vision & AI vision pipelines",
      "Process & workflow automation",
    ],
    href: "/services/ai-automation",
    icon: Zap,
    gradient: "from-yellow-400/15 to-orange-400/15",
    iconColor: "text-yellow-600",
    borderHover: "hover:border-yellow-400/40",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description:
      "Set up search visibility, map key search terms, and build Looker Studio dashboards that track conversions and direct marketing spend.",
    capabilities: [
      "SEO audits and keyword mapping",
      "Paid search campaign structures",
      "GA4 and conversion tracking setup",
      "Search Console setup and analysis",
      "Custom Looker Studio reporting dashboards",
    ],
    href: "/services/digital-marketing",
    icon: TrendingUp,
    gradient: "from-emerald-500/15 to-teal-400/15",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-400/40",
  },
  {
    id: "web-development",
    name: "Web Development",
    description:
      "Design and build fast, responsive Next.js websites, SaaS portals, and custom web apps tailored to help your business scale online.",
    capabilities: [
      "Custom React & Next.js applications",
      "Corporate & business websites",
      "E-Commerce platform development",
      "CMS development & integration",
      "Performance & SEO optimization",
    ],
    href: "/services/web-development",
    icon: Code2,
    gradient: "from-blue-500/15 to-electric-blue/15",
    iconColor: "text-electric-blue",
    borderHover: "hover:border-electric-blue/40",
  },
  {
    id: "software-development",
    name: "Custom Software Development",
    description:
      "Write clean, custom software—from database architecture to ERPs—to run your back-office systems and automate internal workflows.",
    capabilities: [
      "Custom ERP & CRM systems",
      "SaaS platform design & development",
      "Workflow & business process automation",
      "Operations software & internal tools",
      "API design & database schemas",
    ],
    href: "/services/software-development",
    icon: Cpu,
    gradient: "from-indigo-500/15 to-blue-500/15",
    iconColor: "text-indigo-600",
    borderHover: "hover:border-indigo-400/40",
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development",
    description:
      "Build native and cross-platform mobile apps for iOS and Android, complete with offline capabilities and smooth push notifications.",
    capabilities: [
      "iOS and Android native app development",
      "Cross-platform apps with React Native or Flutter",
      "App Store and Google Play submission",
      "Push notifications and offline functionality",
      "Mobile API integration and backend services",
    ],
    href: "/services/mobile-app-development",
    icon: Smartphone,
    gradient: "from-cyan-500/15 to-sky-400/15",
    iconColor: "text-cyan-600",
    borderHover: "hover:border-cyan-400/40",
  },
  {
    id: "hosting-infrastructure",
    name: "Hosting & Infrastructure",
    description:
      "Configure robust cloud environments on AWS/GCP, containerize applications, and build automated deployment pipelines for zero downtime.",
    capabilities: [
      "Cloud architecture on AWS, GCP, and Azure",
      "Containerisation with Docker and Kubernetes",
      "CI/CD pipeline setup and automation",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Environment isolation and backups",
    ],
    href: "/services/hosting-infrastructure",
    icon: Server,
    gradient: "from-orange-500/15 to-amber-400/15",
    iconColor: "text-orange-500",
    borderHover: "hover:border-orange-400/40",
  },
  {
    id: "customer-experience-management",
    name: "Customer Experience Management",
    description:
      "Integrate CRM platforms like HubSpot and Salesforce, clean up databases, and set up ticket routing to keep customer support running fast.",
    capabilities: [
      "CRM cleanup and database optimization",
      "HubSpot, Zoho, and Salesforce setup",
      "CSAT & feedback collection systems",
      "WhatsApp Business & messaging setup",
      "Helpdesk and ticket routing integration",
    ],
    href: "/services/customer-experience-management",
    icon: Users,
    gradient: "from-pink-500/15 to-rose-400/15",
    iconColor: "text-pink-600",
    borderHover: "hover:border-pink-400/40",
  },
  {
    id: "it-consulting-it-services",
    name: "IT Consulting & IT Services",
    description:
      "Deliver clear technology roadmaps, cloud cost audits, security reviews, and ongoing advisory to protect and guide your tech stack.",
    capabilities: [
      "Technology roadmaps & planning",
      "Architecture and cloud cost reviews",
      "Vendor selection and comparisons",
      "Security and vulnerability reviews",
      "Ongoing IT documentation and support",
    ],
    href: "/services/it-consulting-it-services",
    icon: Lightbulb,
    gradient: "from-cyan-500/15 to-sky-400/15",
    iconColor: "text-cyan-600",
    borderHover: "hover:border-cyan-400/40",
  },
];
