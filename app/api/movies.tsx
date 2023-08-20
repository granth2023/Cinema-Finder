import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req: any, res: any) {
  const { method } = req 

  switch(method){
    case 'GET': 
        const movies = await prisma.movies.findMany({ 
            include: {
                screening: true,
                favorites: true,
            },
        })
        res.json(movies)
        break

        default: 
            res.status(405).end()
            break
  }
}