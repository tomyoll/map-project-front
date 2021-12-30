import { TextField } from '@mui/material';
import React from 'react';

export default function CustomTextField({
  label, setValue, type = 'text', styles,
}) {
  return (
    <TextField
      fullWidth
      className={styles}
      autoFocus
      type={type}
      InputLabelProps={{ style: { color: 'rgb(255 255 255 / 60%)' } }}
      label={label}
      variant="filled"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
