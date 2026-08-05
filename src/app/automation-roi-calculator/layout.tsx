import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation ROI Calculator | Estimate AI Automation Savings | aibizmod",
  description:
    "Calculate how much time and money your business could save with AI automation. Estimate annual savings from automating manual work with Aibizmod.",
  alternates: { canonical: "https://aibizmod.com/automation-roi-calculator" },
};

export default function AutomationRoiCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}