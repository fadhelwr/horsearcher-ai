import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.233.73.147:3000',
});