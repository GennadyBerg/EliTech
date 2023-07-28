import React from 'react';
import GoogleMapReact from 'google-map-react';

// Replace 'YOUR_API_KEY' with your actual Google Maps API key
const API_KEY = 'AIzaSyBI7GOBG0ZVgkF3UKLeCnmsF26k704IxJ8';

// MapMarker is a simple component to display a marker on the map
const MapMarker = () => <div style={{ color: 'red', fontSize: '24px' }}>??</div>;

// Main Map component
const Map = () => {
    // Default map center (you can set this to your desired location)
    const defaultMapCenter = { lat: 37.7749, lng: -122.4194 };

    // Function to handle map click events
    const handleMapClick = ({ lat, lng }) => {
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        // You can call a function here to get the address using the geocoder as shown in the previous example
    };

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultMapCenter}
                defaultZoom={13} // Adjust the zoom level as needed
                onClick={handleMapClick}
            >
                <MapMarker lat={defaultMapCenter.lat} lng={defaultMapCenter.lng} />
            </GoogleMapReact>
        </div>
    );
};

export default Map;