import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

export default function SelectPriceType({ priceValue, setPriceValue }) {
  return (
    <FormControl>
      <Select
        value={priceValue.type}
        onChange={(e) => {
          setPriceValue({ ...priceValue, ...{ type: e.target.value } });
        }}
      >
        <MenuItem value="Час">Час</MenuItem>
        <MenuItem value="Сутки">Сутки</MenuItem>
        <MenuItem value="Месяц">Месяц</MenuItem>
      </Select>
    </FormControl>
  );
}
