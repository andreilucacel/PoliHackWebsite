import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = "";

export function useMapsLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // If Google Maps is already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);

    document.head.appendChild(script);

    return () => {
      const scripts = document.getElementsByTagName("script");
      for (const script of scripts) {
        if (script.src.includes("maps.googleapis.com")) {
          script.remove();
        }
      }
    };
  }, []);

  return { isLoaded };
}
