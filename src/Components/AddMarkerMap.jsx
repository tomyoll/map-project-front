import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};
const options = {
  disableDefaultUI: false,
  minZoom: 4,
  maxZoom: 25,
};
const center = {
  lat: 49.37831019444885,
  lng: 29.86929102811264,
};

export default function AddMarkerMap({ newMarker, setNewMarker }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const onMapClick = React.useCallback((e) => {
    setNewMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
  }, []);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {newMarker
        && (
          <Marker
            key={`${newMarker.lat}-${newMarker.lng}`}
            position={{ lat: newMarker.lat, lng: newMarker.lng }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
