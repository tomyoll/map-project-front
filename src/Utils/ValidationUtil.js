const { VALIDATION_ERRORS } = require('../Constants/Constants');

export const validateTitle = (title) => {
  let error = null;
  if (!title) {
    error = VALIDATION_ERRORS.NO_TITLE;
  } else if (title.length < 4) {
    error = VALIDATION_ERRORS.SHORT_TITLE;
  } else if (title.length > 100) {
    error = VALIDATION_ERRORS.LONG_TITLE;
  }
  return error;
};

export const validatePrice = (price) => {
  let error = null;
  if (!price.value) {
    error = VALIDATION_ERRORS.NO_PRICE;
  } else if (price.value > 9999999) {
    error = VALIDATION_ERRORS.LONG_PRICE;
  }
  return error;
};

export const validateLocation = (location) => {
  let error = null;
  if (!location) {
    error = VALIDATION_ERRORS.NO_LOCATION;
  }
  return error;
};

export const validateAddress = (address) => {
  let error = null;
  if (!address) {
    error = VALIDATION_ERRORS.NO_ADDRESS;
  } else if (address.length < 4) {
    error = VALIDATION_ERRORS.SHORT_ADDRESS;
  } else if (address.length > 100) {
    error = VALIDATION_ERRORS.LONG_ADDRESS;
  }
  return error;
};
