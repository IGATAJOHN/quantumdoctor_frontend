import { apiClient } from '../lib/api-client';
import { API_ROUTES } from '../lib/api-config';

export const authService = {
  doctorLogin: async (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return apiClient.post(API_ROUTES.AUTH.DOCTOR_LOGIN, formData);
  },

  doctorSignup: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] instanceof File) {
        formData.append(key, data[key], data[key].name);
      } else {
        formData.append(key, data[key]);
      }
    });
    return apiClient.post(API_ROUTES.AUTH.DOCTOR_SIGNUP, formData);
  },

  login: async (credentials) => {
    return apiClient.post(API_ROUTES.AUTH.LOGIN, credentials);
  },

  signup: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] instanceof File) {
        formData.append(key, data[key], data[key].name);
      } else {
        formData.append(key, data[key]);
      }
    });
    return apiClient.post(API_ROUTES.AUTH.SIGNUP, formData);
  },

  forgotPassword: async (email) => {
    return apiClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token, newPassword) => {
    return apiClient.post(`${API_ROUTES.AUTH.RESET_PASSWORD}?token=${token}`, newPassword);
  },

  refreshToken: async () => {
    return apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN);
  },
};
