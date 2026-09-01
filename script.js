document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('usage-container');
    
    // Using a public CORS proxy
    const targetUrl = 'https://api.statcounter.com/stats/?vn=3&s=popular&f=json&pi=13352957&g=daily&ct=pageviews&t=1788264612&u=sega.op&sha1=9756bb6';
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(targetUrl);

    fetch(proxyUrl)
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
