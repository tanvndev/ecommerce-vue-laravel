import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = store.getters['authStore/getToken'];
    if (token && token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch('auth/refreshToken');
        return instance(originalRequest);
      } catch (e) {
        store.dispatch('auth/logout');
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
