import { apiClient } from '../lib/api-client';
import { API_ROUTES } from '../lib/api-config';

export const vitalsService = {
  getBloodOxygen: async () => {
    return apiClient.get(API_ROUTES.VITALS.BLOOD_OXYGEN);
  },

  getBloodPressure: async () => {
    return apiClient.get(API_ROUTES.VITALS.BLOOD_PRESSURE);
  },

  getChatbotResponse: async (message) => {
    return apiClient.post(API_ROUTES.VITALS.CHATBOT, { message });
  },

  getVitals: async () => {
    return apiClient.get(API_ROUTES.VITALS.GET_VITALS);
  },

  getVitalsHistory: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`${API_ROUTES.VITALS.GET_VITALS_HISTORY}?${queryString}`);
  },

  getHeartRate: async () => {
    return apiClient.get(API_ROUTES.VITALS.HEART_RATE);
  },

  getTemperature: async () => {
    return apiClient.get(API_ROUTES.VITALS.TEMPERATURE);
  },

  updateVitals: async (vitals) => {
    return apiClient.put(API_ROUTES.VITALS.UPDATE_VITALS, vitals);
  },
};
