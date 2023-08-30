import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const DEFAULT_LAT = 40.7128;
const DEFAULT_LNG = -74.0060;

interface Theater {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const Search = () => {
  const [isGoogleMapLoaded, setGoogleMapLoaded] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [theaters, setTheaters] = useState<Theater[]>([]);

  useEffect(() => {
    console.log("isGoogleMapLoaded has been updated:", isGoogleMapLoaded);
  }, [isGoogleMapLoaded]);

  useEffect(() => {
    console.log("API Key: ", GOOGLE_MAPS_API_KEY);
    console.log("Is Google Map Loaded: ", isGoogleMapLoaded);
    if (typeof window === 'undefined') {
      return;
    }
    
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Please set GOOGLE_MAPS_API_KEY");
      return;
    }

    window.initMap = () => {
      console.log("initMap");
      setGoogleMapLoaded(true); 
      console.log("After setGoogleMapLoaded:", isGoogleMapLoaded);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.addEventListener("error", (error) => {
      console.log("script failed to load", error);
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete(window as any).initMap;// Updated line
    };
  }, []);

  const handleMarkerClick = (theater: Theater) => {
    setSelectedTheater(theater);
  };

  return (
    <div>
      {isGoogleMapLoaded ? (
        <div className="bg-white min-h-screen">
          <div className="text-center text-black font-semibold text-2xl mb-4">
            Theater Search
          </div>
          <div className="h-[500px]">
            <GoogleMap zoom={10} center={{ lat: DEFAULT_LAT, lng: DEFAULT_LNG }}>
              {theaters.map((theater) => (
                <Marker
                  key={theater.id}
                  position={{ lat: theater.lat, lng: theater.lng }}
                  onClick={() => handleMarkerClick(theater)}
                />
              ))}

              {selectedTheater && (
                <InfoWindow
                  position={{ lat: selectedTheater.lat, lng: selectedTheater.lng }}
                  onCloseClick={() => setSelectedTheater(null)}
                >
                  <div>
                    <h2>{selectedTheater.name}</h2>
                    <p>{selectedTheater.address}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      ) : (
        <p>Loading Google Maps...</p>
      )}
    </div>
  );
};

export default Search;
