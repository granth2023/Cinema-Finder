import { useEffect } from 'react';
import { loadScript } from '../utils/loadScript';
import TheaterSearch from '../components/TheaterSearch'; // Update this path

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-api-script';
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const Search: React.FC = () => {
  useEffect(() => {
    if(!process.env.GOOGLE_MAPS_API_KEY) {
      console.error("Please set GOOGLE_MAPS_API_KEY");
      return;
    }
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
      GOOGLE_MAPS_SCRIPT_ID
    ).catch((err) => {
      console.error("Error loading Google Maps script:", err);
    });
  }, []);

  return <TheaterSearch />;
}

export default Search;
