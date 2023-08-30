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
    if (isGoogleMapLoaded) {
      setTimeout(() => {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
          const innerDiv = mapContainer.firstChild as HTMLElement;
          if (innerDiv && innerDiv.style) {
            innerDiv.style.position = 'static';
            innerDiv.style.overflow = 'visible';
          }
        }
      }, 1000);  // Waits 1 second before executing the code need more react way, this is a workaround not exactly a solution
    }
}, [isGoogleMapLoaded]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Please set GOOGLE_MAPS_API_KEY");
      return;
    }

    window.initMap = () => {
      setGoogleMapLoaded(true);
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
      delete(window as any).initMap;
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
                
                <div className="map-container" style={{ width: '500px', height: '500px' }}>
                    <GoogleMap 
                        zoom={10} 
                        center={{ lat: DEFAULT_LAT, lng: DEFAULT_LNG }}
                    >
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
}

export default Search;
