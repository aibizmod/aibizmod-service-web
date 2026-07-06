import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
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

    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    const proxyRes = await fetch(`${baseUrl}/.netlify/functions/geo-audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: targetUrl }),
    });

    const data = await proxyRes.json();
    if (!proxyRes.ok) throw new Error(data.error || "Audit failed");

    return NextResponse.json(data);
  } catch (error) {
    console.error("GEO audit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed" },
      { status: 500 }
    );
  }
}
