document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("usage-container");

    // Order controls render order; add/remove tools here if the API adds more.
    const TOOLS = ["ChatGPT", "Gemini", "Claude", "Copilot"];

    try {
        const response = await fetch("/api/ai-usage");

        if (!response.ok) {
            throw new Error("API request failed with status " + response.status);
        }

        const data = await response.json();

        container.innerHTML = TOOLS.map(tool => {
            const value = Number(data[tool]) || 0;
            const pct = Math.max(0, Math.min(100, value));

            return `
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="tool-name">${tool}</span>
                        <span class="tool-percentage">${pct}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${pct}%;"></div>
                    </div>
                </div>
            `;
        }).join("");

        console.log("Live usage data:", data);

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="error-text">Failed to load usage metrics.</p>`;
    }
});
