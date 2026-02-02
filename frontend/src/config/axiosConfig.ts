import axios from 'axios';
import { refreshFirebaseToken, getValidToken } from '../utils/tokenUtils';

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      // Skip adding auth token for Unsplash API requests
      if (config.url?.includes('api.unsplash.com')) {
        return config;
      }

      // Add the current valid token to every request
      const token = await getValidToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for handling 401 errors
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Skip retry logic for Unsplash API
      if (originalRequest.url?.includes('api.unsplash.com')) {
        return Promise.reject(error);
      }

      // Check if error is 401 (Unauthorized) and this isn't a retry attempt
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Refresh the token
          const newToken = await refreshFirebaseToken();
          
          if (newToken) {
            // Update the Authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // Retry the original request with the new token
            return axios(originalRequest);
          }
        } catch (refreshError) {
          // console.error('Token refresh failed:', refreshError);
          // Token refresh failed, redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};