document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('usage-container');
    
    const apiUrl = 'https://api.statcounter.com/stats/?vn=3&s=popular&f=json&pi=13352957&g=daily&ct=pageviews';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = `<p>Stats Loaded Successfully!</p>`;
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = `<p class="error-text">Failed to load usage metrics.</p>`;
        });
});
