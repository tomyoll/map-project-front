import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import ItemsList from './ItemsList';

const useStyles = makeStyles(() => ({
  sideBar: {
    width: '100%',
    height: '100vh',
    padding: '20px 20px',
    overflow: 'auto',
  },
}));

export default function SideBar() {
  const styles = useStyles();
  return (
    <div id="sideBar" className={styles.sideBar}>
      <Link to="/add">
        <Button>Подать объявление</Button>
      </Link>
      <ItemsList />
    </div>
  );
}
