// pages/api/scrape.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';  // Corrected import statement
import { scrapeScreenings } from "../api/screenings";

const prisma = new PrismaClient();  // Instantiate PrismaClient

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { siteIdentifier, url } = req.query;

  if (!siteIdentifier || !url) {
    return res.status(400).json({ error: "siteIdentifier or url missing" });
  }

  try {
    const screenings = await scrapeScreenings({
      url: url as string,
      siteIdentifier: siteIdentifier as string,
    });

    res.status(200).json({ screenings });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
