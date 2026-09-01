// api/usage.js

module.exports = async function handler(req, res) {
    // Enable CORS if your frontend is hosted separately
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            // Mock or fetch your AI tool usage statistics data here
            const usageData = {
                timestamp: new Date().toISOString(),
                stats: [
                    { tool: 'ChatGPT', percentage: 44 },
                    { tool: 'Gemini', percentage: 24 },
                    { tool: 'Copilot', percentage: 17 },
                    { tool: 'Claude', percentage: 6 }
                ]
            };

            return res.status(200).json({
                success: true,
                data: usageData
            });
        } catch (error) {
            console.error('API Error:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal server error while fetching usage metrics.' 
            });
        }
    }

    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
};
