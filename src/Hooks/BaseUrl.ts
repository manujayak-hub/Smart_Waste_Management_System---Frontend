import axios from 'axios';

const backendBaseUrl = 'http://localhost:8000'; 

const baseURL = axios.create({
  baseURL: backendBaseUrl,
});

export default baseURL;