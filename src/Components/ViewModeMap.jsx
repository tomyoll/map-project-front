import React, { useContext } from 'react';
import {
  GoogleMap, Marker, useLoadScript,
} from '@react-google-maps/api';
import { MarkersContext, SelectedMarkerContext, VisibleMarkersContext } from '../context';
import { NO_MARKERS_IN_AREA } from '../Constants/Constants';

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

export default function ViewModeMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { markers } = useContext(MarkersContext);
  const { markersInArea, setMarkersInArea } = useContext(VisibleMarkersContext);
  let mapUpdateTimer;
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const compareMarkersArrays = (allMarkers, visibleMarkers) => {
    if (markers.length !== markersInArea.length) return false;
    for (let i = 0; i < markers.length; i += 1) if (markers[i] !== visibleMarkers[i]) return false;
    return true;
  };

  const foundMarkersInArea = (allMarkers) => {
    const { google } = window;
    const bounds = mapRef.current.getBounds();
    const mapNE = bounds.getNorthEast();
    const mapSW = bounds.getSouthWest();
    const mapNW = new google.maps.LatLng(mapNE.lat(), mapSW.lng());
    const mapSE = new google.maps.LatLng(mapSW.lat(), mapNE.lng());

    return allMarkers.filter((marker) => {
      if (
        marker.location.lat > mapSE.lat()
        && mapSW.lat()
        && (marker.location.lat < mapNE.lat() && mapNW.lat())
        && (marker.location.lng > mapNW.lng() && mapSW.lng())
        && (marker.location.lng) < mapNE.lng() && mapSE.lng()
      ) {
        return marker;
      }
      return null;
    });
  };
  const mapUpdate = () => {
    clearTimeout(mapUpdateTimer);
    mapUpdateTimer = setTimeout(() => {
      const markersInVisibleArea = foundMarkersInArea(markers);
      const isIdenticalArrays = compareMarkersArrays(markers, markersInVisibleArea);
      setSelectedMarker(null);
      if (markersInVisibleArea.length === 0) {
        return setMarkersInArea(NO_MARKERS_IN_AREA);
      }
      if (!isIdenticalArrays) {
        return setMarkersInArea(markersInVisibleArea);
      }
      return null;
    }, 1000);
  };

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
        onBoundsChanged={mapUpdate}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => {
          const { lat, lng } = marker.location;
          return (
            <Marker
              key={Math.random().toString() + marker._id}
              position={{ lat, lng }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}
