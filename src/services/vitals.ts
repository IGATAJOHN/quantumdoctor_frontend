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

export interface VitalsData {
  diastolic_blood_pressure?: number;
  heart_rate?: number;
  height?: number;
  systolic_blood_pressure?: number;
  temperature?: number;
  weight?: number;
  updated_at?: string;
  bmi?: number;
}

export interface VitalsHistoryParams {
  start_date?: string;
  end_date?: string;
  date_filter_type?: 'last_week' | 'last_month' | 'last_year' | 'today' | 'yesterday';
  page?: number;
  per_page?: number;
  limit?: number;
}

const calculateBMI = (weight?: number, height?: number): number | undefined => {
  if (!weight || !height || height === 0) return undefined;
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

const vitalsService = {
  // Get Blood Oxygen
  getBloodOxygen: async () => {
    try {
      const response = await api.get('/vitals/blood_oxygen');
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch blood oxygen'
      };
    }
  },

  // Get Blood Pressure
  getBloodPressure: async () => {
    try {
      const response = await api.get('/vitals/blood_pressure');
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch blood pressure'
      };
    }
  },

  // Get Health Recommendations from Chatbot
  getChatbotRecommendations: async (message: string) => {
    try {
      const response = await api.post('/vitals/chatbot', { message });
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get recommendations'
      };
    }
  },

  // Get Latest Vitals
  getLatestVitals: async () => {
    try {
      const response = await api.get('/vitals/get_vitals');
      const data = response.data;
      // Calculate BMI if weight and height are available
      data.bmi = calculateBMI(data.weight, data.height);
      return {
        success: true,
        data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch latest vitals'
      };
    }
  },

  // Get Vitals History
  getVitalsHistory: async (params: VitalsHistoryParams) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await api.get(`/vitals/get_vitals_history?${queryParams.toString()}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch vitals history'
      };
    }
  },

  // Get Heart Rate
  getHeartRate: async () => {
    try {
      const response = await api.get('/vitals/heart_rate');
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch heart rate'
      };
    }
  },

  // Get Temperature
  getTemperature: async () => {
    try {
      const response = await api.get('/vitals/temperature');
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch temperature'
      };
    }
  },

  // Update Vitals
  updateVitals: async (vitals: VitalsData) => {
    try {
      const response = await api.put('/vitals/update_vitals', vitals);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update vitals'
      };
    }
  }
};

export default vitalsService;
