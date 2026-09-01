export default async function handler(req, res) {

    const targetUrl =
        "https://api.statcounter.com/stats/?vn=3&s=popular&f=json&pi=13352957&g=daily&ct=pageviews&t=1788264612&u=sega.op&sha1=9756bb6";

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error("StatCounter request failed");
        }

        const data = await response.json();

        res.status(200).json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch StatCounter data"
        });
    }
}
