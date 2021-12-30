import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  paper: {
    position: 'relative',
    margin: '15px',
    width: '250px',
    height: '250px',
    display: 'block',
  },
  image: {
    width: '250px',
    maxWidth: '250px',
    height: '250px',
    maxHeight: '250px',
  },
}));

export default function ImageCard({ image }) {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <img className={styles.image} src={image} alt="" />
    </Paper>
  );
}
