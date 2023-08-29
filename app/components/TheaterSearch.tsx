// TheaterSearch.tsx
import React, { useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const DEFAULT_LAT = 40.7128;
const DEFAULT_LNG = -74.0060;

interface Theater {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const TheaterSearch = () => {
  const [selectedTheater, setSelectedTheater] = React.useState<Theater | null>(null);
  const [theaters, setTheaters] = React.useState<Theater[]>([
    {id: '1', lat: 40.7129, lng: -74.0061, name: 'Theater 1', address: 'Address 1'},
    {id: '2', lat: 40.7130, lng: -74.0062, name: 'Theater 2', address: 'Address 2'},
    // Add more fake data or replace with API data
  ]);

  useEffect(() => {
    // fetch theaters and set to state
  }, []);

  const handleMarkerClick = (theater: Theater) => {
    setSelectedTheater(theater);
  };

  return (
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
  );
};

export default TheaterSearch;
