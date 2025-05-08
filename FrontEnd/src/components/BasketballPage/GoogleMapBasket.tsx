import { useState } from "react";
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

// Basketball court locations in Cluj-Napoca
const CLUJ_BASKETBALL_COURTS = [
  {
    lat: 46.7712,
    lng: 23.6236,
    name: "Cluj Arena Basketball Court",
    address: "Aleea Stadionului 2",
  },
  {
    lat: 46.7697,
    lng: 23.5883,
    name: "Gheorgheni Sports Complex",
    address: "Str. Alexandru Vaida Voevod",
  },
  {
    lat: 46.7745,
    lng: 23.5912,
    name: "Horea Demian Sports Hall",
    address: "Strada Splaiul Independentei 6",
  },
  {
    lat: 46.7678,
    lng: 23.5976,
    name: "La Terenuri Sports Base",
    address: "Strada Primaverii 20",
  },
  {
    lat: 46.7723,
    lng: 23.6215,
    name: "Winners Basketball Court",
    address: "Strada Universitatii 1",
  },
];

// Custom map styles for basketball courts
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

function GoogleMapBasketball({ center = CLUJ_CENTER }: MapProps) {
  const [selectedCourt, setSelectedCourt] = useState<
    (typeof CLUJ_BASKETBALL_COURTS)[0] | null
  >(null);
  const { isLoaded } = useMapsLoader();

  if (!isLoaded) {
    return <div className="text-center p-5">Loading map...</div>;
  }

  return (
    <div className="basketball-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
      >
        {CLUJ_BASKETBALL_COURTS.map((court) => (
          <Marker
            key={court.name}
            position={{ lat: court.lat, lng: court.lng }}
            onClick={() => setSelectedCourt(court)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#FFA500", // Orange color for basketball courts
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

export default GoogleMapBasketball;
