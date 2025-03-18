// First we need to import axios.js
import axios from 'axios';
import { baseUrl } from './magic_constants';
// Next we make an 'instance' of it
// const instance = axios.create({
// // .. where we make our configurations
//     baseURL: baseUrl
// });

// instance.defaults.withCredentials = true;

// instance.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if (error.response.status === 403 || error.response.status === 404) {
//         window.location.reload();
//        }
//     return Promise.reject(error);
// });

// // Also adding interceptors here.   


// export default instance;

export default axios.create({
    baseURL: baseUrl,
  });

