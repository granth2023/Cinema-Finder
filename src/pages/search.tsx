import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const libraries = ['places'];
const DEFAULT_LAT = 40.7128;
const DEFAULT_LNG = -74.0060;
const MAP_CONTAINER_STYLE = {
  height: "100vh",
  width: "100vw",
};

interface Location {
  lat: number;
  lng: number;
}

interface Theater {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const Search = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }, 3000);
  }, []);

  useEffect(() => {
    if (isLoaded && userLocation && mapRef.current) {
console.log("places API is laoded, location set, map initialized")

      const service = new google.maps.places.PlacesService(mapRef.current);
      service.textSearch({
        query: "move theater near me",
        location: userLocation,
     
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          console.log("successfully fetched theaters: ", results);

          const newTheaters = results.map(result => {
            const geometry = result.geometry;
            const location = geometry?.location ?? null;

            return {
              id: result.place_id ?? '',
              lat: location?.lat() ?? 0,
              lng: location?.lng() ?? 0,
              name: result.name ?? '',
              address: result.vicinity ?? '',
            };
          });

          setTheaters(newTheaters);
        } else {
          console.log("failed to fetch theaters, status: ", status);
        }
      });
    } else {
      console.log("places API is not laoded, location set, map initialized")
    }
  }, [isLoaded, userLocation]);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          zoom={10}
          center={userLocation ?? { lat: DEFAULT_LAT, lng: DEFAULT_LNG }}
          onLoad={onMapLoad}
        >
          {theaters.map((theater) => (
            <Marker
              key={theater.id}
              position={{ lat: theater.lat, lng: theater.lng }}
              onClick={() => setSelectedTheater(theater)}
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
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Search;
