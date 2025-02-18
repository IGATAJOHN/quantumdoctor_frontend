import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://new-quantum-doctor.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminSignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  dateOfBirth: string;
}

export interface DoctorFilters {
  is_approved?: boolean;
  is_verified?: boolean;
  page?: number;
  per_page?: number;
}

const adminService = {
  // Admin Login
  adminLogin: async (credentials: AdminLoginCredentials) => {
    try {
      const formData = new FormData();
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      
      const response = await api.post('/admin/login', formData, {
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
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Admin Signup
  adminSignup: async (data: AdminSignupData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await api.post('/admin/signup', formData, {
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
        error: error.response?.data?.message || 'Signup failed'
      };
    }
  },

  // Approve Doctor
  approveDoctor: async (doctorId: string) => {
    try {
      const response = await api.put(`/admin/doctors/${doctorId}/approve`);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to approve doctor'
      };
    }
  },

  // Get Doctors List
  getDoctors: async (filters?: DoctorFilters) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await api.get(`/admin/doctors?${queryParams.toString()}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch doctors'
      };
    }
  },

  // Get Unverified Doctors
  getUnverifiedDoctors: async () => {
    try {
      const response = await api.get('/admin/doctors/unverified');
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch unverified doctors'
      };
    }
  },

  // Verify Doctor
  verifyDoctor: async (doctorId: string) => {
    try {
      const response = await api.put(`/admin/doctors/${doctorId}/verify`);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to verify doctor'
      };
    }
  }
};

export default adminService;
