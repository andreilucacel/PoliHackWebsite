import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useMapsLoader } from "../shared/MapsLoader";

interface MapProps {
  center?: { lat: number; lng: number };
}

// Cluj-Napoca coordinates
const CLUJ_CENTER = {
  lat: 46.7712,
  lng: 23.6236,
};

// Tennis court locations in Cluj-Napoca
const CLUJ_TENNIS_COURTS = [
  {
    lat: 46.7712,
    lng: 23.6236,
    name: "Winners Tennis Club",
    address: "Aleea Stadionului 2",
  },
  {
    lat: 46.7697,
    lng: 23.5883,
    name: "Gheorgheni Tennis Complex",
    address: "Str. Alexandru Vaida Voevod",
  },
  {
    lat: 46.7745,
    lng: 23.5912,
    name: "Parcul Sportiv Iuliu Hatieganu",
    address: "Strada Splaiul Independentei 6",
  },
  {
    lat: 46.7678,
    lng: 23.5976,
    name: "Tennis Club La Terenuri",
    address: "Strada Primaverii 20",
  },
  {
    lat: 46.7723,
    lng: 23.6215,
    name: "Tenis Club Cluj",
    address: "Strada Universitatii 1",
  },
];

// Custom map styles for tennis courts
const mapStyles = [
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#c5e8c5" }], // Light green for land
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a1d6e2" }], // Light blue for water
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }], // White roads
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#91c790" }], // Darker green for parks
  },
  {
    featureType: "poi.sports_complex",
    elementType: "geometry",
    stylers: [{ color: "#91c790" }], // Darker green for sports complexes
  },
];

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

// Map options
const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
};

function GoogleMapTennis({ center = CLUJ_CENTER }: MapProps) {
  const [selectedCourt, setSelectedCourt] = useState<
    (typeof CLUJ_TENNIS_COURTS)[0] | null
  >(null);
  const { isLoaded } = useMapsLoader();

  if (!isLoaded) {
    return <div className="text-center p-5">Loading map...</div>;
  }

  return (
    <div className="tennis-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
      >
        {CLUJ_TENNIS_COURTS.map((court) => (
          <Marker
            key={court.name}
            position={{ lat: court.lat, lng: court.lng }}
            onClick={() => setSelectedCourt(court)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#00FF00", // Green color for tennis courts
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
          />
        ))}

        {selectedCourt && (
          <InfoWindow
            position={{ lat: selectedCourt.lat, lng: selectedCourt.lng }}
            onCloseClick={() => setSelectedCourt(null)}
          >
            <div>
              <h5>{selectedCourt.name}</h5>
              <p>{selectedCourt.address}</p>
              <button className="btn btn-primary btn-sm">ENQUIRE NOW</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapTennis;
