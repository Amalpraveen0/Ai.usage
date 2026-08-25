function scrollToChart() {
    document.getElementById("analytics").scrollIntoView({
        behavior: "smooth"
    });
}

async function loadAIUsage() {
    try {
        const response = await fetch("/api/usage");
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error("API Error:", error);
    }
}

loadAIUsage();});
}
