import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query

    if (!query) {
        return res.status(400).json({ error: 'Query parameters required'})
    }


    const apiKey = process.env.API_KEY
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+movie+theaters&key=${apiKey}`
    const response = await fetch(endpoint)
    const data = await response.json()

    return res.json(data)
}