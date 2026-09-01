document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("usage-container");

    try {
        const response = await fetch("/api/ai-usage");

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        container.innerHTML = `
            <div>ChatGPT: ${data.ChatGPT}%</div>
            <div>Gemini: ${data.Gemini}%</div>
            <div>Claude: ${data.Claude}%</div>
            <div>Copilot: ${data.Copilot}%</div>
        `;

        console.log("Live StatCounter data:", data);

    } catch (error) {
        console.error(error);
        container.innerHTML =
            `<p class="error-text">Failed to load usage metrics.</p>`;
    }
});
