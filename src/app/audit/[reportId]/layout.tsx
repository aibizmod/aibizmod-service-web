import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuditReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}