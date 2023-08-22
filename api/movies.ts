import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const movies = await prisma.movies.findMany({
                    include: {
                        screening: true,
                        favorites: true,
                    },
                });
                res.json(movies);
                break;
            default:
                res.status(405).end();  // Method Not Allowed
                break;
        }
    } catch (error) {
        console.error("Error in /api/movies:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    } finally {
        await prisma.$disconnect();
    }
}
