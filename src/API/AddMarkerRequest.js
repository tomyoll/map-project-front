import requestInstance from './index';
import requestErrorsHandler from '../Utils/RequestErrorsHandler';

export default async function AddMarker(data) {
  try {
    const addMarkerRequest = await requestInstance.post('/add-marker', data);
    return addMarkerRequest.data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
}
