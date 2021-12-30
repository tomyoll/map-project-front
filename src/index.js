import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MarkersContext, SelectedMarkerContext, VisibleMarkersContext } from './context';

function Main() {
  const [markers, setMarkers] = useState([]);
  const [markersInArea, setMarkersInArea] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markersState = useMemo(() => ({ markers, setMarkers }), [markers, setMarkers]);
  const selectedMarkersState = useMemo(
    () => ({ selectedMarker, setSelectedMarker }),
    [selectedMarker, setSelectedMarker],
  );
  const markersInAreaState = useMemo(
    () => ({ markersInArea, setMarkersInArea }),
    [markersInArea, setMarkersInArea],
  );
  return (
    <React.StrictMode>
      <MarkersContext.Provider value={markersState}>
        <SelectedMarkerContext.Provider value={selectedMarkersState}>
          <VisibleMarkersContext.Provider value={markersInAreaState}>
            <App />
          </VisibleMarkersContext.Provider>
        </SelectedMarkerContext.Provider>
      </MarkersContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <Main />,
  document.getElementById('root'),
);
reportWebVitals();
