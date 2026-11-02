import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const api = axios.create({
  baseURL: 'http://10.233.73.147:3000',
  //baseURL: 'http://172.20.10.12:3000',
});

api.interceptors.request.use(
  async (config) => {
    const token =
      await SecureStore.getItemAsync('token');

    console.log('TOKEN:', token);
    console.log('URL:', config.url);

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;

      console.log(
        'AUTH:',
        config.headers.Authorization
      );
    }

    return config;
  },
);