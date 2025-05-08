import { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useMapsLoader } from "../shared/MapsLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import footballIcon from '../../assets/football.png'; 
import salaIcon from '../../assets/sala-sporturilor.jpg'; 
import clujArena from '../../assets/cluj-arena.jpg'; 

// Adjust the path to your football icon image
// Ensure the image is imported
interface MapProps {
  center?: { lat: number; lng: number };
}

const CLUJ_CENTER = {
  lat: 46.7712,
  lng: 23.6236,
};

const CLUJ_FOOTBALL_FIELDS = [
  {
    lat: 46.7712,
    lng: 23.6236,
    name: "Cluj Arena",
    address: "Aleea Stadionului 2",
    image: clujArena,
  },
  {
    lat: 46.7697,
    lng: 23.5883,
    name: "Complex Sportiv Gheorgheni",
    address: "Str. Alexandru Vaida Voevod",
    image: "https://via.placeholder.com/300x150?text=Gheorgheni",
  },
  {
    lat: 46.7745,
    lng: 23.5912,
    name: "Sala Sporturilor Horea Demian",
    address: "Strada Romulus Vuia 23-25",
    image: salaIcon
  },
  {
    lat: 46.7678,
    lng: 23.5976,
    name: "Baza Sportiva La Terenuri",
    address: "Strada Romulus Vuia 23-25",
    image: "https://via.placeholder.com/300x150?text=La+Terenuri",
  },
  {
    lat: 46.7723,
    lng: 23.6215,
    name: "Winners Club Cluj",
    address: "Strada Romulus Vuia 23-25",
    image: "https://via.placeholder.com/300x150?text=Winners+Club",
  },
];

const mapStyles = [
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#c5e8c5" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a1d6e2" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#91c790" }],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "geometry",
    stylers: [{ color: "#91c790" }],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
};

function GoogleMapFootball({ center = CLUJ_CENTER }: MapProps) {
  const [selectedField, setSelectedField] = useState<typeof CLUJ_FOOTBALL_FIELDS[0] | null>(null);
  const { isLoaded } = useMapsLoader();

  if (!isLoaded || typeof window.google === "undefined") {
    return <div className="text-center p-5">Loading map...</div>;
  }

  return (
    <div className="football-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
      >
        {CLUJ_FOOTBALL_FIELDS.map((field) => (
          <Marker
            key={field.name}
            position={{ lat: field.lat, lng: field.lng }}
            onClick={() => setSelectedField(field)}
            icon={{
              url: footballIcon,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selectedField && (
          <InfoWindow
            position={{ lat: selectedField.lat, lng: selectedField.lng }}
            onCloseClick={() => setSelectedField(null)}
          >
            <div style={{ maxWidth: "250px" }}>
              <img
                src={selectedField.image}
                alt={selectedField.name}
                style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "0.5rem" }}
              />
              <h5 className="mb-1">{selectedField.name}</h5>
              <p className="mb-2">{selectedField.address}</p>
              <button className="btn btn-success btn-sm w-100">
                <i className="bi bi-calendar-check-fill me-2"></i>Book Field
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapFootball;
