import axios, {AxiosInstance} from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://grading.design.htmlacademy.pro/v0/escape-room/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;

  });

  return api;
};

