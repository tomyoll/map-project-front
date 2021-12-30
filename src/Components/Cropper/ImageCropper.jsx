import React, { useState } from 'react';
import Cropper from 'react-cropper';
import './cropper.css';
import {
  AppBar, Button, Dialog, Toolbar,
} from '@mui/material';

export default function ImageCropper({ images, setCroppedImages }) {
  const [open, setOpen] = useState(true);
  const [filesCount, setFilesCount] = useState(images);
  const [cropper, setCropper] = useState('');
  const [currentImageNumber, setCurrentImageNumber] = useState(images.length - 1);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImages((data) => [...data, cropper.getCroppedCanvas().toDataURL()]);
    }
  };

  const handleClick = () => {
    const newNumber = currentImageNumber - 1;
    setCurrentImageNumber(newNumber);
    images.pop();
    getCropData();
    setFilesCount(filesCount - 1);
    if (currentImageNumber < 0) {
      setOpen(false);
    }
  };

  return (
    <Dialog fullScreen open={open} id="dialog">
      <AppBar sx={{ position: 'relative' }} id="app-bar">
        <Toolbar>
          <Button
            autoFocus
            color="inherit"
            onClick={handleClick}
          >
            Дальше
          </Button>
        </Toolbar>
      </AppBar>
      <Cropper
        style={{ height: '100%', width: '100%', marginTop: '20px' }}
        zoomable={false}
        initialAspectRatio={1}
        src={images[currentImageNumber]}
        viewMode={1}
        minCropBoxHeight={285}
        minCropBoxWidth={280}
        aspectRatio={1}
        background={false}
        responsive
        autoCropArea={1}
        cropBoxResizable
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides
      />
    </Dialog>
  );
}
