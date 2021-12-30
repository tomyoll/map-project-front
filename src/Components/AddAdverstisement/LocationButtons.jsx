import React from 'react';
import { Button } from '@mui/material';

export default function LocationButtons({ map, setMap }) {
  if (map) {
    return (
      <Button fullWidth variant="contained" color="success" onClick={() => setMap(false)}>Сохранить
        местоположение
      </Button>
    );
  }
  return (
    <Button fullWidth variant="contained" onClick={() => setMap(true)}>Указать местоположение</Button>
  );
}
