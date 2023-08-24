import { NextApiRequest, NextApiResponse } from 'next';

type GooglePlacesResult = {
    place_id: string;
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: 'Test successful' });
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameters required' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is not defined in environment variables.");
        return res.status(500).json({ error: 'Server error' });
    }

    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+movie+theaters&key=${apiKey}`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            console.error("Error fetching data from Google Places:", response.statusText);
            return res.status(500).json({ error: 'Failed to fetch data from Google Places' });
        }
        const data = await response.json();

        // Format the data returned by backend to match the Theater type
        const theaters = data.results.map((result: GooglePlacesResult) => ({
            id: result.place_id,
            name: result.name
        }));

        return res.json(theaters);
    } catch (error) {
        console.error("Error while fetching theaters:", error);
        return res.status(500).json({ error: 'Server error' });
    }
}
