import React from 'react';
import { Button } from '@mui/material';

export default function SubmitButton({ handleSubmit }) {
  return (
    <Button
      fullWidth
      variant="contained"
      color="success"
      type="Submit"
      onClick={handleSubmit}
    >Готово
    </Button>
  );
}
