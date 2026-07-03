import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

interface PythonOutput {
  score: number;
  band: string;
  citability: number | null;
  score_breakdown: Record<string, number>;
  recommendations: string[];
  checked_at: string | null;
  error?: string;
}

async function runGEOAudit(url: string): Promise<PythonOutput> {
  const pythonScript = `
import sys
import json
from geo_optimizer import audit_async

async def main():
    try:
        result = await audit_async('${url}')
        output = {
            "score": result.score,
            "band": result.band,
            "citability": result.citability.total_score if result.citability else None,
            "score_breakdown": result.score_breakdown,
            "recommendations": result.recommendations,
            "checked_at": result.timestamp or None,
        }
        print(json.dumps(output))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
`;

  const { spawn } = await import("child_process");
  const pythonProcess = spawn("python", ["-c", pythonScript]);

  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `Python process exited with code ${code}`));
        return;
      }

      try {
        const result: PythonOutput = JSON.parse(stdout);
        if (result.error) {
          reject(new Error(result.error));
          return;
        }
        resolve(result);
      } catch (parseError) {
        reject(new Error(`Failed to parse Python output: ${parseError}\nOutput: ${stdout}`));
      }
    });

    pythonProcess.on("error", (err) => {
      reject(err);
    });
  });
}

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

    const result = await runGEOAudit(targetUrl);

    // Convert to camelCase for frontend compatibility
    return NextResponse.json({
      score: result.score,
      band: result.band,
      citability: result.citability,
      scoreBreakDown: result.score_breakdown,
      recommendations: result.recommendations,
      checkedAt: result.checked_at || new Date().toISOString(),
    });
  } catch (error) {
    console.error("GEO audit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed" },
      { status: 500 }
    );
  }
}