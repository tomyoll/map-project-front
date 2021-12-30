import requestInstance from './index';
import requestErrorsHandler from '../Utils/RequestErrorsHandler';

export default async function GetMarkers(limit, skip) {
  try {
    const response = await requestInstance.get('/get-markers', { params: { limit, skip } });
    return response.data;
  } catch (err) {
    return requestErrorsHandler(err);
  }
}
