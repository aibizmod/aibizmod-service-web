import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>;
}): Promise<Metadata> {
  const { reportId } = await params;
  return {
    title: `AI Visibility Audit Report: ${reportId} | aibizmod`,
    description: `View the AI visibility audit report for ${reportId}. See how your website performs in AI search engines including ChatGPT, Perplexity, and Google AI Overviews.`,
    openGraph: {
      title: `AI Visibility Audit Report: ${reportId}`,
      description: `AI visibility audit report showing AI search performance, structured data, E-E-A-T signals, and citability.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Visibility Audit Report: ${reportId}`,
      description: `AI visibility audit report for ${reportId}.`,
    },
    other: {
      "report-id": reportId,
    },
  };
}

import AuditReportClient from "./AuditReportClient";

export default async function AuditReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  return <AuditReportClient initialReportId={reportId} />;
}