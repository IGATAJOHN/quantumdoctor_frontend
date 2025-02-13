import { apiClient } from '../lib/api-client';
import { API_ROUTES } from '../lib/api-config';

export const consultationService = {
  bookConsultation: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return apiClient.post(API_ROUTES.CONSULTATION.BOOK, formData);
  },

  manageRequest: async (requestId, status) => {
    return apiClient.patch(`${API_ROUTES.CONSULTATION.DOCTOR_REQUEST}/${requestId}`, { status });
  },

  getRequests: async () => {
    return apiClient.get(API_ROUTES.CONSULTATION.DOCTOR_REQUESTS);
  },

  getDoctors: async (page = 1, perPage = 10) => {
    return apiClient.get(`${API_ROUTES.CONSULTATION.DOCTORS}?page=${page}&per_page=${perPage}`);
  },

  searchDoctors: async (query) => {
    return apiClient.get(`${API_ROUTES.CONSULTATION.SEARCH_DOCTORS}?query=${encodeURIComponent(query)}`);
  },
};
