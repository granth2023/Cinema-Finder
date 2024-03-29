import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import NavBar from '../components/NavBar';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const libraries = ['places'];
const DEFAULT_LAT = 40.7128;
const DEFAULT_LNG = -74.0060;
const MAP_CONTAINER_STYLE = {
  height: "80vh",
  width: "80vw",
  margin: "auto",
};

interface ScrapingInfo {
  siteIdentifier: string;
  scrapingUrl: string;
}

const theaterScrapingInfo: { [key: string]: ScrapingInfo } = {
  'IFC Center': { siteIdentifier: '.showtimes', scrapingUrl: 'https://www.ifccenter.com' },
  'Nitehawk': { siteIdentifier: '.buy-tickets', scrapingUrl: 'https://nitehawkcinema.com/prospectpark'}
};

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface Theater {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  website?: string;
  scrapingUrl?: string;
  siteIdentifier?: string;
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

  const fetchAdditionalDetails = (placeId: string, callback: (data: any) => void) => {
    const request = {
      placeId,
      fields: ['formatted_address', 'website'],
    };

    const service = new google.maps.places.PlacesService(mapRef.current as google.maps.Map);
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const additionalDetails= {
          website: place.website || '',
          address: place.formatted_address || '',
        };
        callback(additionalDetails);
      }
        });
    
  };
  async function fetchScreenings(theater: Theater) {
    console.log("fetchScreenings called");
    console.log('theater.siteIdentifier:', theater.siteIdentifier);  // Debug log
    console.log('theater.scrapingUrl:', theater.scrapingUrl);  // Debug log
    if (!theater?.siteIdentifier || !theater?.scrapingUrl) {
      alert("Scraping information not found for this theater");
      return;
    }
  
    try {
      const url = `/api/scrape?siteIdentifier=${encodeURIComponent(theater.siteIdentifier)}&url=${encodeURIComponent(theater.scrapingUrl)}`;
      console.log('fetchScreenings url:', url);  // Log the URL you're about to fetch
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Error fetching screenings:', response.statusText);
        return;
      }
      console.log('fetchScreenings response:', await response.json());
      const screenings = await response.json();
      console.log(screenings);
    } catch (error) {
      console.error("Error fetching screenings:", error);
    }
}

  const getUberTo = (theater: Theater) => {
    const uberUrl = `https://m.uber.com/ul/action=setPickup&dropoff[latitude]=${theater.lat}&dropoff[longitude]=${theater.lng}`;
    window.open(uberUrl, "_blank");
  };

  const getDirections = (theater: Theater) => {
    if (userLocation) {
      const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${theater.lat},${theater.lng}`;
      window.open(directionUrl, "_blank");
    }
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
      const service = new google.maps.places.PlacesService(mapRef.current);
      service.textSearch({
        query: "movie theater near me",
        location: userLocation,
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
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
        }
      });
    }
  }, [isLoaded, userLocation]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "100%", height: "20%" }}>
        <NavBar />
      </div>
      {isLoaded ? (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
                onClick={() => {
                  console.log('Marker was clicked');
                  console.log("Selected theater:", theater);
                  fetchAdditionalDetails(theater.id, (place) => {
                    const scrapingInfo = theaterScrapingInfo[theater?.name];
                    
                    setSelectedTheater({ ...theater, website: place.website, address: place.address, siteIdentifier: scrapingInfo.siteIdentifier, scrapingUrl: scrapingInfo.scrapingUrl });
                  });
                }}
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
                  {selectedTheater.website && <a href={selectedTheater.website} target="_blank" rel="noopener noreferrer">Visit Website</a>}
                  <button onClick={() => getUberTo(selectedTheater)}>Get Uber</button>
                  <button onClick={() => getDirections(selectedTheater)}>Get Directions</button>
                  <button onClick={() => fetchScreenings(selectedTheater)}>Get Showtimes</button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Search;
