import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

// Replace 'YOUR_API_KEY' with your actual Google Maps API key
const API_KEY = 'AIzaSyBI7GOBG0ZVgkF3UKLeCnmsF26k704IxJ8';

// MapMarker is a simple component to display a marker on the map
const MapMarker = () => <div style={{ color: 'red', fontSize: '24px' }}>??</div>;

// Main Map component
const Map = ({ address, setAddress }) => {
    // Default map center (you can set this to your desired location)
    const defaultMapCenter = { lat: 37.7749, lng: -122.4194 };
    const [maps, setMaps] = useState(null);
    const [map, setMap] = useState(null);
    const handleApiLoaded = (map, maps) => {
        setMaps(maps);
        setMap(map);
        getLocation();
    }

    useEffect(() => {
        showMap(address)
    }, [address]);

    // Function to handle map click events
    const handleMapClick = ({ lat, lng }) => {
        const latLng = new google.maps.LatLng(lat, lng);
        getAddressFromLatLng(latLng);
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

    function showMap(address) {
        if (!address) {
            return;
        }
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
                let newLocation = results[0].geometry.location;
                const newCenter = new maps.LatLng(newLocation.lat(), newLocation.lng());
                map.panTo(newCenter);
                map.setZoom(15);
                new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                //alert('Адрес не найден.');
            }
        });
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Выполняем обратное геокодирование для получения адреса
                    const geocoder = new window.google.maps.Geocoder();
                    const latLng = new window.google.maps.LatLng(latitude, longitude);

                    geocoder.geocode({ location: latLng }, (results, status) => {
                        if (status === 'OK' && results.length > 0) {
                            setAddress(results[0].formatted_address);
                        } else {
                            setAddress('Адрес не найден');
                        }
                    });
                },
                (error) => {
                    console.error('Ошибка получения координат:', error);
                    setAddress('Ошибка получения координат');
                }
            );
        } else {
            setAddress('Геолокация не поддерживается в вашем браузере');
        }
    }

    return (
        <div style={{ height: '500px', width: '100%', borderRadius: '8px' }}>
            <GoogleMapReact
                id="map"
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultMapCenter}
                defaultZoom={13} // Adjust the zoom level as needed
                onClick={event => handleMapClick(event)}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                <MapMarker lat={defaultMapCenter.lat} lng={defaultMapCenter.lng} />
            </GoogleMapReact>
        </div>
    );
};

export default Map;