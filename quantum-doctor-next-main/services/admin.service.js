import { apiClient } from '../lib/api-client';
import { API_ROUTES } from '../lib/api-config';

export const adminService = {
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return apiClient.post(API_ROUTES.ADMIN.LOGIN, formData);
  },

  signup: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return apiClient.post(API_ROUTES.ADMIN.SIGNUP, formData);
  },

  approveDoctor: async (doctorId) => {
    return apiClient.put(`${API_ROUTES.ADMIN.APPROVE_DOCTOR}/${doctorId}`);
  },

  getDoctors: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`${API_ROUTES.ADMIN.DOCTORS}?${queryString}`);
  },

  getUnverifiedDoctors: async () => {
    return apiClient.get(API_ROUTES.ADMIN.UNVERIFIED_DOCTORS);
  },

  verifyDoctor: async (doctorId) => {
    return apiClient.put(`${API_ROUTES.ADMIN.VERIFY_DOCTOR}/${doctorId}`);
  },
};
