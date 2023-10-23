import axios from 'axios';

export const backendApi = axios.create({
  // baseURL: 'http://localhost:3000/api'
  baseURL: import.meta.env.VITE_API_URL + 'api'
});

// Configuracion de interceptores
backendApi.interceptors.request.use( (config: any) => {

  config.headers = {
    ...config.headers,
    'Authorization': `bearer ${localStorage.getItem('token')}`,
    'userLogin': localStorage.getItem('userLogin')
  }

  return config;

});