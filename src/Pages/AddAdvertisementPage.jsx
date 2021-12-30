import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppBar, Box, Stack, Toolbar, Container,
  IconButton, SwipeableDrawer,
  Divider, ListItem, List,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import ImageCard from '../Components/ImageCard';
import ImageCropper from '../Components/Cropper/ImageCropper';
import AddMarkerMap from '../Components/AddMarkerMap';
import AddMarker from '../API/AddMarkerRequest';
import {
  validateTitle, validatePrice, validateLocation, validateAddress,
} from '../Utils/ValidationUtil';
import FileUploader from '../Components/FileUploader';
import TxtField from '../Components/AddAdverstisement/CustomTextField';
import LocationButtons from '../Components/AddAdverstisement/LocationButtons';
import SubmitButton from '../Components/AddAdverstisement/SubmitButton';
import NumberTextField from '../Components/AddAdverstisement/NumberTextField';

const { REQUEST_RESPONSES: { FAIL } } = require('../Constants/Constants');

export default function AddAdvertisementPage() {
  const [images, setImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [map, setMap] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [priceValue, setPriceValue] = useState({
    value: '',
    type: 'Месяц',
  });
  const history = useHistory();

  const useStyles = makeStyles(() => ({
    list: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    },
    textField: {
      width: '320px',
      height: '60px',
      margin: '15px',
      borderBottom: '2px solid rgb(255 255 255 / 60%)',
      padding: 0,
    },
  }));

  useEffect(() => {
    if (croppedImages.length > 9) {
      croppedImages.length = 9;
    }
  }, [croppedImages]);

  const validationCheck = () => {
    const errors = [];
    setValidationErrors([]);
    errors.push(validateTitle(titleValue));
    errors.push(validatePrice(priceValue));
    errors.push(validateAddress(addressValue));
    errors.push(validateLocation(newMarker));
    setValidationErrors(errors.filter((error) => error !== null));
    return errors.filter((error) => error !== null).length > 0;
  };

  const generateFiles = () => {
    const filesFromBlob = [];
    croppedImages.forEach((image) => filesFromBlob.push(new File([image], `image${croppedImages.indexOf(image)}`, {
      type: 'image/png',
      lastModified: new Date().getTime(),
    })));
    return filesFromBlob;
  };

  const sendData = async () => {
    const data = new FormData();
    generateFiles().forEach((file) => data.append('images', file));
    data.append('price', JSON.stringify(priceValue));
    data.append('title', titleValue);
    data.append('address', addressValue);
    data.append('location', JSON.stringify(newMarker));
    return AddMarker(data);
  };

  const handleSubmit = async () => {
    const dataErrors = validationCheck();
    if (dataErrors) {
      return false;
    }
    const sendDataRequest = await sendData();
    if (sendDataRequest.status === FAIL) {
      setServerErrors(sendDataRequest.errors);
      return false;
    }
    history.push('/');
    return true;
  };

  const MemorizedAlerts = React.useCallback(({ errors }) => {
    const listAlerts = errors.map((error) => <Alert key={errors.indexOf(error)} severity="error">{error}</Alert>);
    if (errors.length > 0) {
      return (
        <div>
          {listAlerts}
        </div>
      );
    }
    return null;
  }, []);

  return (
    <>
      <MemorizedAlerts errors={validationErrors} />
      <MemorizedAlerts errors={serverErrors} />
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
              <List className={useStyles().list}>
                <ListItem>
                  <TxtField styles={useStyles().textField} setValue={setTitleValue} label="Заголовок" />
                </ListItem>
                <ListItem>
                  <NumberTextField
                    styles={useStyles().textField}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                  />
                </ListItem>
                <ListItem>
                  <TxtField styles={useStyles().textField} setValue={setAddressValue} label="Введите адрес" />
                </ListItem>
                <ListItem>
                  <LocationButtons map={map} setMap={setMap} />
                </ListItem>
                <ListItem>
                  {croppedImages.length <= 9 && (
                    <FileUploader fullWidth setImages={setImages} />
                  )}
                </ListItem>
                <ListItem>
                  {!map
                    ? <SubmitButton handleSubmit={handleSubmit} />
                    : null}
                </ListItem>
              </List>
            </Box>
            <Box sx={{ display: { xl: 'none', sm: 'block' } }}>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
        <SwipeableDrawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <div>
            <MemorizedAlerts errors={validationErrors} />
            <MemorizedAlerts errors={serverErrors} />
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem>
              <TxtField styles={useStyles().textField} setValue={setTitleValue} label="Заголовок" />
            </ListItem>
            <ListItem>
              <NumberTextField
                styles={useStyles().textField}
                priceValue={priceValue}
                setPriceValue={setPriceValue}
              />
            </ListItem>
            <ListItem>
              <TxtField styles={useStyles().textField} setValue={setAddressValue} label="Введите адрес" />
            </ListItem>
          </List>
          <ListItem>
            <LocationButtons map={map} setMap={setMap} />
          </ListItem>
          <ListItem>
            {croppedImages.length <= 9 && (
              <FileUploader fullWidth setImages={setImages} />
            )}
          </ListItem>
          <ListItem>
            {!map
              ? <SubmitButton handleSubmit={handleSubmit} />
              : null}
          </ListItem>
        </SwipeableDrawer>
      </AppBar>
      {map ? (<AddMarkerMap newMarker={newMarker} setNewMarker={setNewMarker} />)
        : (
          <Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {croppedImages.map((image) => (
                <ImageCard key={Math.random().toString() + Date.now()} image={image} />
              ))}
              {Array.from(Array(10 - croppedImages.length)).map(() => (
                <ImageCard key={Math.random().toString() + Date.now()} />
              ))}
            </Stack>
          </Box>
        )}
      {images.length > 0
      && (
        <ImageCropper
          images={images}
          setCroppedImages={setCroppedImages}
          setImages={setImages}
        />
      )}
    </>
  );
}
