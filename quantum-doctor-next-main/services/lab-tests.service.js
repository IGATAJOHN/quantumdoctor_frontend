import { apiClient } from '../lib/api-client';
import { API_ROUTES } from '../lib/api-config';

export const labTestsService = {
  downloadTestResult: async (fileName) => {
    return apiClient.get(`${API_ROUTES.LAB_TESTS.DOWNLOAD_RESULT}/${fileName}`);
  },

  requestTest: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return apiClient.post(API_ROUTES.LAB_TESTS.REQUEST_TEST, formData);
  },

  uploadTestResult: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post(API_ROUTES.LAB_TESTS.UPLOAD_RESULT, formData);
  },

  viewAllTestResults: async () => {
    return apiClient.get(API_ROUTES.LAB_TESTS.VIEW_ALL_RESULTS);
  },

  viewTestResults: async (consultationId) => {
    return apiClient.get(`${API_ROUTES.LAB_TESTS.VIEW_RESULTS}/${consultationId}`);
  },
};
