import axios from 'axios';
import { MAIN_API } from './const';
import TokenService from 'src/services/TokenService';


// Create an Axios instance with custom configuration, if needed
export const axiosInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    'Authorization': TokenService.getToken() ?`Bearer ${TokenService.getToken()}` : ''
    // Add any custom headers you need here
  },
});



axiosInstance.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

