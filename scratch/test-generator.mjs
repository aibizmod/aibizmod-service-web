// Quick offline test of scraper & generator logic
async function test() {
  const domain = "pmspace.ai";
  const baseUrl = `https://${domain}`;
  
  console.log("Testing scraper on:", domain);
  try {
    const res = await fetch(baseUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AIBizMod-LLMsBot/2.0; +https://aibizmod.com/tools/llms-txt-generator)",
      }
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("HTML length:", text.length);

    // Test sitemap
    const smRes = await fetch(`${baseUrl}/sitemap.xml`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AIBizMod-LLMsBot/2.0)" }
    });
    console.log("Sitemap status:", smRes.status);
    if (smRes.ok) {
      const smText = await smRes.text();
      const locs = smText.match(/<loc>(.*?)<\/loc>/g) || [];
      console.log("Found locs in sitemap:", locs.length);
      console.log("Sample URLs:", locs.slice(0, 5));
    }
  } catch (e) {
    console.error("Fetch error:", e.message);
  }
}

test();
