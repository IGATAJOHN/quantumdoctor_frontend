import { API_BASE_URL } from './api-config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      // Handle token expiration
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const apiClient = {
  get: async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });
    return handleResponse(response);
  },

  post: async (url, data, options = {}) => {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? 
      { 'Authorization': getAuthHeaders().Authorization } : 
      getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        ...headers,
        ...options.headers,
      },
      body: isFormData ? data : JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  put: async (url, data, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  patch: async (url, data, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  delete: async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });
    return handleResponse(response);
  },
};
