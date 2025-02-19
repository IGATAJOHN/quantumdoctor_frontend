import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export interface TestResult {
  file_name: string;
  uploaded_at: string;
}

export interface TestResultWithPatient extends TestResult {
  consultation_id: string;
  patient_name: string;
}

const labTestsService = {
  // Download test result
  downloadTestResult: async (fileName: string) => {
    try {
      const response = await api.get(`/lab-tests/download_test_result/${fileName}`, {
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to download test result'
      };
    }
  },

  // Request a test
  requestTest: async (consultationId: string, testName: string, instructions?: string) => {
    try {
      const formData = new FormData();
      formData.append('consultation_id', consultationId);
      formData.append('test_name', testName);
      if (instructions) {
        formData.append('instructions', instructions);
      }

      const response = await api.post('/lab-tests/request_test', formData);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to request test'
      };
    }
  },

  // Upload test result
  uploadTestResult: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/lab-tests/upload_test_result', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload test result'
      };
    }
  },

  // View all test results (for doctors)
  viewAllTestResults: async () => {
    try {
      const response = await api.get('/lab-tests/view_all_test_results');
      return {
        success: true,
        data: response.data as TestResultWithPatient[]
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch test results'
      };
    }
  },

  // View test results for a specific consultation
  viewTestResults: async (consultationId: string) => {
    try {
      const response = await api.get(`/lab-tests/view_test_results/${consultationId}`);
      return {
        success: true,
        data: response.data as TestResult[]
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch test results'
      };
    }
  }
};

export default labTestsService;
