import { NextApiRequest, NextApiResponse } from "next";
import { scrapeScreenings } from "../api/screenings";

interface ScrapeRequestBody { 
  url: string; 
  siteIdentifier: string;
}

export default async ( req: NextApiRequest, res: NextApiResponse) => {
  const { url, siteIdentifier } = req.query; 

  if(!url || !siteIdentifier) { 
    return res.status(400).json({ error: 'URL or site identifier missing'})
  }

  try { 
    const screenings = await scrapeScreenings({ url: url as string, siteIdentifier: siteIdentifier as string });
    res.status(200).json({ screenings });
  } catch (error: any) {
    res.status(500).json({ error: error.message }); 
  
  }
}