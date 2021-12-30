import axios from 'axios';

const requestInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default requestInstance;
