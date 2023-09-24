// helpers/scrapeScreenings.ts

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface ScrapingParams { 
  url: string;
  siteIdentifier: string;
}

export async function scrapeScreenings ({ url, siteIdentifier }: ScrapingParams) : Promise<string[]> {
  console.log(`Scraping URL: ${url}`);
  console.log(`Site Identifier: ${siteIdentifier}`);

  const response = await fetch(url);
  const html = await response.text();
  
  console.log(html.substring(0, 200));  // log the first 200 characters

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const showtimesElements = document.querySelectorAll(siteIdentifier);
  
  let screenings: string[] = [];
  showtimesElements.forEach((el: Element) => {
    screenings.push(el.textContent!.trim());
  });

  switch (siteIdentifier) {
    case 'IFC': 
      const ifcScreenings = document.querySelectorAll('.showtimes');
      ifcScreenings.forEach((el: Element) => { 
        screenings.push(el.textContent!.trim());
      });
      break;

    case 'Nitehawk':
      const nitehawkScreenings = document.querySelectorAll('.showtimes-container.clearfix');
      nitehawkScreenings.forEach((el: Element) => { 
        screenings.push(el.textContent!.trim());
      });
      break;

    default: 
      console.error('Unknown site identifier: ' + siteIdentifier);
  }

  console.log(`Extracted screenings: ${screenings}`);
  return screenings;
}
