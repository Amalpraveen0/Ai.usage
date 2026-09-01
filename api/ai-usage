// This file must be named `ai-usage.js` (not `usage.js`) so that its route,
// /api/ai-usage, matches what script.js actually fetches.

export default async function handler(req, res) {
    // Keep the project id + signed request params out of source control.
    // Set these in your hosting provider's environment variable settings.
    const PROJECT_ID = process.env.STATCOUNTER_PROJECT_ID;
    const TIMESTAMP = process.env.STATCOUNTER_T;
    const USER = process.env.STATCOUNTER_U;
    const SHA1 = process.env.STATCOUNTER_SHA1;

    if (!PROJECT_ID || !TIMESTAMP || !USER || !SHA1) {
        return res.status(500).json({
            error: "Missing StatCounter credentials. Set STATCOUNTER_PROJECT_ID, STATCOUNTER_T, STATCOUNTER_U, and STATCOUNTER_SHA1 as environment variables."
        });
    }

    const targetUrl =
        `https://api.statcounter.com/stats/?vn=3&s=popular&f=json&pi=${PROJECT_ID}` +
        `&g=daily&ct=pageviews&t=${TIMESTAMP}&u=${USER}&sha1=${SHA1}`;

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error("StatCounter request failed with status " + response.status);
        }

        const raw = await response.json();

        // Normalize whatever StatCounter returns into the flat shape
        // script.js expects: { ChatGPT, Gemini, Claude, Copilot }.
        // StatCounter's "popular pages" endpoint returns per-page rows, not
        // pre-labeled tool names, so we match rows by title/url. Adjust the
        // matching keywords below to whatever labels your tracked pages use.
        const TOOL_KEYWORDS = {
            ChatGPT: ["chatgpt", "openai"],
            Gemini: ["gemini", "bard"],
            Claude: ["claude", "anthropic"],
            Copilot: ["copilot", "microsoft copilot"]
        };

        const rows = Array.isArray(raw) ? raw : (raw.popular || raw.data || []);

        const result = { ChatGPT: 0, Gemini: 0, Claude: 0, Copilot: 0 };

        for (const row of rows) {
            const label = (
                (row.page_title || row.title || row.url || "") + ""
            ).toLowerCase();

            const percent = Number(row.percent || row.pageviews_percent || row.value || 0);

            for (const [tool, keywords] of Object.entries(TOOL_KEYWORDS)) {
                if (keywords.some(k => label.includes(k))) {
                    result[tool] += percent;
                }
            }
        }

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch StatCounter data"
        });
    }
}
