import { NextApiRequest, NextApiResponse  } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addFavorite(req: NextApiRequest, res: NextApiResponse) {
    console.log("Starting addFavorite function");
    
    const userId = parseInt(req.body.userId, 10);
    const { Title } = req.body.movie;
    
    console.log(`UserID: ${userId}, Movie Title: ${Title}`);

    try {
        let movie = await prisma.movie.findFirst({
            where: {
                title: {
                    equals: Title,
                    mode: "insensitive"
                }
            }
        });

        console.log(`Found or not found movie: ${movie ? movie.title : 'Movie not found'}`);

        if (!movie) {
            movie = await prisma.movie.create({
                data: {
                    title: Title
                }
            });

            console.log(`Created movie: ${movie.title}`);
        }

        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                userId,
                movieId: movie.id
            }
        });

        if (existingFavorite) {
            console.log("Movie already in favorites");
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        await prisma.favorite.create({
            data: {
                userId,
                movieId: movie.id
            }
        });

        console.log("Added to favorites");
        res.status(200).json({ message: 'Added to favorites' });
    } catch (err) {
        console.error("Error in addFavorite:", {
            errorMessage: err.message,
            stack: err.stack,
            name: err.name,
        });
        res.status(500).json({ error: err.message });
    }
}
