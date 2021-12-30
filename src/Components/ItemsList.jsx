import React, { useContext } from 'react';
import {
  Box,
  List, Typography,
} from '@mui/material';
import ImageSlider from './ImageSlider';
import { SelectedMarkerContext, VisibleMarkersContext } from '../context';
import { NO_MARKERS_IN_AREA } from '../Constants/Constants';

export default function ItemsList() {
  const { selectedMarker } = useContext(SelectedMarkerContext);
  const { markersInArea } = useContext(VisibleMarkersContext);

  if (selectedMarker) {
    return (
      <List>
        <Box>
          <ImageSlider images={selectedMarker.images} />
          <div style={{ backgroundColor: '#186fc6' }}>
            <Typography sx={{ color: 'white' }}>{`${selectedMarker.price.value} / ${selectedMarker.price.type}`}</Typography>
            <Typography noWrap sx={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{selectedMarker.title}</Typography>
            <Typography noWrap sx={{ fontSize: '18px', color: 'white' }}>{selectedMarker.address}</Typography>
          </div>
        </Box>
      </List>
    );
  }

  if (markersInArea.length > 0 && !markersInArea.includes(NO_MARKERS_IN_AREA)) {
    return (
      <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        { markersInArea.map((marker) => (
          <Box sx={{ marginTop: '15px' }} key={marker._id}>
            <ImageSlider images={marker.images} />
            <div style={{ backgroundColor: '#186fc6' }}>
              <Typography sx={{ color: 'white' }}>{`${marker.price.value} / ${marker.price.type}`}</Typography>
              <Typography noWrap sx={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{marker.title}</Typography>
              <Typography noWrap sx={{ fontSize: '18px', color: 'white' }}>{marker.address}</Typography>
            </div>
          </Box>
        ))}
      </List>
    );
  }
  return null;
}
