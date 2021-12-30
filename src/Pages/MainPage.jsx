import React, { useEffect, useContext } from 'react';

import { Grid } from '@mui/material';
import SideBar from '../Components/SideBar';
import ViewModeMap from '../Components/ViewModeMap';
import GetMarkers from '../API/GetMarkersRequest';
import { MarkersContext } from '../context';

export default function MainPage() {
  const { markers, setMarkers } = useContext(MarkersContext);
  useEffect(async () => {
    const allMarkers = await GetMarkers();
    setMarkers((prevState) => [...prevState, ...allMarkers]);
  }, []);

  return (
    <Grid container wrap="nowrap" style={{ height: '100vh' }}>
      <Grid item xl={9} lg={8} md={7} xs={7}>
        <ViewModeMap markers={markers} />
      </Grid>
      <Grid item xl={3} lg={4} md={5} xs={6}>
        <SideBar />
      </Grid>
    </Grid>
  );
}
