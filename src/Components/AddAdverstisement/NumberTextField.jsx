import { TextField } from '@mui/material';
import React from 'react';
import SelectPriceType from './SelectPriceType';

export default function NumberTextField({ priceValue, setPriceValue, styles }) {
  return (
    <TextField
      className={styles}
      fullWidth
      InputLabelProps={{ style: { color: 'rgb(255 255 255 / 60%)' } }}
      type="number"
      id="price"
      label="Цена/грн"
      variant="filled"
      InputProps={{
        endAdornment: <SelectPriceType
          priceValue={priceValue}
          setPriceValue={setPriceValue}
        />,
      }}
      onChange={
        (e) => {
          setPriceValue({ ...priceValue, ...{ value: e.target.value } });
        }
      }
    />
  );
}
