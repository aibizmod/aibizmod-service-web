import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    const res = await fetch(
      `https://geoready.dev/api/audit?url=${encodeURIComponent(targetUrl)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(120000),
      }
    );

    if (!res.ok) {
      throw new Error(`Audit service returned ${res.status}`);
    }

    const data = await res.json();

    if (!data || data.score == null) {
      throw new Error(data?.error || "Audit returned no score");
    }

    return NextResponse.json({
      score: data.score,
      band: data.band,
      citability: data.citability?.total_score ?? null,
      scoreBreakDown: data.score_breakdown ?? {},
      recommendations: data.recommendations ?? [],
      checkedAt: data.timestamp || new Date().toISOString(),
    });
  } catch (error) {
    console.error("GEO audit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed" },
      { status: 500 }
    );
  }
}
