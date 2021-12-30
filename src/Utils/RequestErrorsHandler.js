const { REQUEST_RESPONSES: { FAIL, NO_RESPONSE, UNABLE_TO_PROCESS } } = require('../Constants/Constants');

export default function requestErrorsHandler(error) {
  const errorData = {
    status: FAIL,
    errors: [],
  };
  if (error.response) {
    if (typeof error.response.data.errors !== 'undefined') {
      error.response.data.errors.map((e) => errorData.errors.push(e));
      return errorData;
    }
    errorData.errors.push(UNABLE_TO_PROCESS);
    return errorData;
  } if (error.request) {
    errorData.errors.push(NO_RESPONSE);
    return errorData;
  }
  errorData.errors.push(UNABLE_TO_PROCESS);
  return errorData;
}
