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
      "We build AI agents, predictive ML models, generative AI pipelines, computer vision systems, and workflow automations that eliminate manual work and unlock intelligent operations.",
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
      "We set up conversion tracking, audit search visibility, map keywords, and manage campaigns to help you reach customers using Search Console and GA4.",
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
      "We design and build websites, SaaS dashboards, customer portals, booking platforms, and CRM-connected web applications.",
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
      "We write custom software to streamline operations, run business workflows, integrate databases, and build core business operations tools.",
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
      "We build customer self-service apps, booking applications, technician field apps, staff applications, and inventory tracking tools.",
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
      "We set up cloud hosting, establish development and production environments, configure automated backups, and build deployment pipelines.",
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
      "We configure CRM systems like HubSpot, Zoho, and Salesforce, optimize ticket routing, and set up communication channels like WhatsApp Business.",
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
      "We conduct technical architecture reviews, audit cloud hosting costs, perform security assessments, and deliver technology roadmaps.",
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
