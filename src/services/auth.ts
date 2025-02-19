import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Auth service for handling all authentication related API calls
const authService = {
  // Doctor Login
  doctorLogin: async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await axios.post(`${API_BASE_URL}/doctor/login`, formData);
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

  // Doctor Signup
  doctorSignup: async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    dateOfBirth: string;
    picture?: File;
    medical_license: File;
    medical_school_cert: File;
    nysc_cert: File;
  }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${API_BASE_URL}/doctor/signup`, formData, {
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

  // User Login
  userLogin: async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
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

  // User Signup
  userSignup: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    location: string;
    picture?: File;
  }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${API_BASE_URL}/auth/signup`, formData, {
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

  // Forgot Password
  forgotPassword: async (email: string) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, formData);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to process forgot password request'
      };
    }
  },

  // Reset Password
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('new_password', newPassword);
      
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, formData);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to reset password'
      };
    }
  },

  // Refresh Token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, {
        refresh_token: refreshToken
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to refresh token'
      };
    }
  },

  // Helper function to store auth tokens
  storeTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  },

  // Helper function to remove auth tokens
  removeTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

export default authService;
