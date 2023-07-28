import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

// Replace 'YOUR_API_KEY' with your actual Google Maps API key
const API_KEY = 'AIzaSyBI7GOBG0ZVgkF3UKLeCnmsF26k704IxJ8';

// MapMarker is a simple component to display a marker on the map
const MapMarker = () => <div style={{ color: 'red', fontSize: '24px' }}>??</div>;

// Main Map component
const Map = ({setAddress}) => {
    // Default map center (you can set this to your desired location)
    const defaultMapCenter = { lat: 37.7749, lng: -122.4194 };

    useEffect(() => {
        // Асинхронно загружаем скрипт Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
    
        // Удаляем скрипт после его загрузки (опционально)
        return () => {
          document.head.removeChild(script);
        };
      }, []);
    
    
    // Function to handle map click events
    const handleMapClick = ({lat, lng}) => {
        /*console.log('Latitude:', lat);
        console.log('Longitude:', lng);*/
        const latLng = new google.maps.LatLng(lat, lng);
        getAddressFromLatLng(latLng);
        // You can call a function here to get the address using the geocoder as shown in the previous example
    };

    function getAddressFromLatLng(latLng) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const address = results[0].formatted_address;
              setAddress(address);
              console.log("Address:", address);
            } else {
              console.log("No results found");
            }
          } else {
            console.log("Geocoder failed due to:", status);
          }
        });
      }
    return (
        <div style={{ height: '500px', width: '100%', borderRadius: '8px'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultMapCenter}
                defaultZoom={13} // Adjust the zoom level as needed
                onClick={event => handleMapClick(event)}
            >
                <MapMarker lat={defaultMapCenter.lat} lng={defaultMapCenter.lng} />
            </GoogleMapReact>
        </div>
    );
};

export default Map;