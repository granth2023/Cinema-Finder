// helpers/scrapeScreenings.ts
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import sitesConfig from '../../../sites.json';

interface ScrapingParams {
  url: string;
  siteIdentifier: string;
}

// Define a type for the screenings object
type Screening = {
  movieTitle: string;
  showtime: string;
};

async function scrapeScreenings({ url, siteIdentifier }: ScrapingParams): Promise<Screening[]> {
  try {
    console.log(`Scraping URL: ${url}`);
    console.log(`Site Identifier: ${siteIdentifier}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const siteConfig = sitesConfig.find(site => site.name === siteIdentifier);
    if (!siteConfig) {
      throw new Error(`Unknown site identifier: ${siteIdentifier}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const showtimesElements = document.querySelectorAll(siteConfig.screeningsSelector);

    // Define screenings with a type
    let screenings: Screening[] = [];
    showtimesElements.forEach((el: Element) => {
      const movieTitle = el.querySelector('.movie-title')?.textContent?.trim();
      const showtime = el.querySelector('.showtime')?.textContent?.trim();
      
      if (movieTitle && showtime) {
        screenings.push({ movieTitle, showtime });
      }
    });

    console.log(`Extracted screenings:`, screenings);  // Updated to log the actual object
    return screenings;

  } catch (error: any) {
    console.error(`Failed to scrape screenings: ${error.message}`);
    throw error;  // re-throw the error after logging it
  }
}

// Export the scrapeScreenings function as a named export
export { scrapeScreenings };
