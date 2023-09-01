import { NextApiRequest, NextApiResponse } from 'next';

export default async(req: NextApiRequest, res: NextApiResponse) => {
    try{
        const query = req.query.query as string;
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

        const apiRes = await fetch( `http://img.omdbapi.com/?apiKey=${apiKey}&query=${query}`);
        if(!apiRes.ok) { 
            throw new Error('Failed to fetch data');
        }
        const data = await apiRes.json();

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};