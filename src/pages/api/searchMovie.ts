import { NextApiRequest, NextApiResponse } from 'next';

export default async(req: NextApiRequest, res: NextApiResponse) => {
    try{
        const query = req.query.query as string;
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

        console.log("apiKey:", apiKey);
        console.log("query:", query);

        const apiRes = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&`);

        const text = await apiRes.text();
        console.log("OMDB API response:", text);

        if(!apiRes.ok) { 
            throw new Error('Failed to fetch data');
        }
        const data = await apiRes.json();
        console.log("Server-side data:", data);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};