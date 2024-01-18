import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId;

    if(req.method === 'GET') { 
        try { 
            const favorites = await prisma.favorite.findMany({ 
                where: {
                    userId: Number(userId)
                },
                    include: {
                        movie: true
                    }
            });
                res.json(favorites.map(favorite => favorite.movie));
        } catch (error) {
            res.status(500).json({ error: "unable to fetch favorites" });
        }
    } else  { 
        res.status(405).json({ error: "Method not allowed" });
    }
}