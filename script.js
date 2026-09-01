// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchUsageStats();
});

async function fetchUsageStats() {
    try {
        // Point this to your actual API route path
        const response = await fetch('/api/usage');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
            renderUsageData(result.data.stats);
        } else {
            console.error('Failed to retrieve valid structure from API.');
        }
    } catch (error) {
        console.error('Connection error:', error);
        displayFallbackError();
    }
}

function renderUsageData(stats) {
    // Assuming you have a container element with id="usage-container" in your index.html
    const container = document.getElementById('usage-container');
    
    if (!container) {
        console.warn('UI container #usage-container not found in index.html.');
        return;
    }

    container.innerHTML = '';

    stats.forEach(item => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <span class="tool-name">${item.tool}</span>
            <span class="tool-percentage">${item.percentage}%</span>
        `;
        container.appendChild(statCard);
    });
}

function displayFallbackError() {
    const container = document.getElementById('usage-container');
    if (container) {
        container.innerHTML = `<p class="error-text">Unable to load live usage metrics at the moment.</p>`;
    }
        }
