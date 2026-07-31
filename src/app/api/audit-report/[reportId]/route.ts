import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://spaceaiapp.com/backend/graphql";
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_GRAPHQL_TOKEN || "";

const PAGE_SIZE = 100;
const MAX_PAGES = 12;

const QUERY = `
  query AibizmodAuditReports($page: Int!, $limit: Int!) {
    aibizmodAuditReports(filter: {}, page: $page, limit: $limit) {
      items {
        reportId
        domainAudited
        score
        band
        isLogined
        userId
        sessionId
        generatedAt
        resultJson
      }
      totalCount
    }
  }
`;

interface BackendReport {
  reportId: string;
  domainAudited: string;
  score?: number;
  band?: string;
  isLogined: boolean;
  userId?: string;
  sessionId?: string;
  generatedAt?: string;
  resultJson?: string;
}

async function fetchPage(page: number): Promise<BackendReport[]> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (ADMIN_TOKEN) headers["Authorization"] = `Bearer ${ADMIN_TOKEN}`;

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: QUERY,
      variables: { page, limit: PAGE_SIZE },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Backend responded with ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: { aibizmodAuditReports?: { items: BackendReport[]; totalCount: number } };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data?.aibizmodAuditReports?.items ?? [];
}

interface AuditReportParams {
  params: { reportId: string };
}

export async function GET(_request: NextRequest, { params }: AuditReportParams) {
  const { reportId } = params;

  if (!reportId || reportId.length > 128) {
    return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
  }

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const items = await fetchPage(page);
      const match = items.find((item) => item.reportId === reportId);

      if (match) {
        let result: unknown = null;
        if (match.resultJson) {
          try {
            result = JSON.parse(match.resultJson);
          } catch {
            result = null;
          }
        }

        return NextResponse.json({
          reportId: match.reportId,
          domain: match.domainAudited,
          score: typeof match.score === "number" ? match.score : undefined,
          band: match.band || undefined,
          isLogined: match.isLogined,
          generatedAt: match.generatedAt || undefined,
          result,
        });
      }

      if (items.length < PAGE_SIZE) break;
    }

    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  } catch (error) {
    console.error("[audit-report] lookup failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load the report at this time",
      },
      { status: 503 },
    );
  }
}
