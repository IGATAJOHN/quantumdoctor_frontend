import axios from 'axios';
import { getAuthToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Doctor {
    email: string;
    firstName: string;
    lastName: string;
}

export interface DoctorAnalytics {
    completed: number;
    total: number;
    upcoming: number;
}

export interface ConsultationRequest {
    doctor_id: string;
    consultation_date: string;
    consultation_time: string;
}

export interface ConsultationResponse {
    success: boolean;
    data?: any;
    error?: string;
}

const consultationService = {
    // Book a consultation
    bookConsultation: async (request: ConsultationRequest): Promise<ConsultationResponse> => {
        try {
            const token = getAuthToken();
            const formData = new FormData();
            formData.append('doctor_id', request.doctor_id);
            formData.append('consultation_date', request.consultation_date);
            formData.append('consultation_time', request.consultation_time);

            const response = await axios.post(
                `${BASE_URL}/consultation/book_consultation`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to book consultation',
            };
        }
    },

    // Get doctor analytics
    getDoctorAnalytics: async (): Promise<ConsultationResponse> => {
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `${BASE_URL}/consultation/doctor/analytics`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                success: true,
                data: response.data.data as DoctorAnalytics,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to get analytics',
            };
        }
    },

    // Manage consultation request
    manageConsultationRequest: async (
        requestId: string,
        status: 'accepted' | 'declined',
        consultationDate?: string,
        consultationTime?: string
    ): Promise<ConsultationResponse> => {
        try {
            const token = getAuthToken();
            const response = await axios.patch(
                `${BASE_URL}/consultation/doctor/request/${requestId}`,
                {
                    status,
                    ...(consultationDate && { consultation_date: consultationDate }),
                    ...(consultationTime && { consultation_time: consultationTime }),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to update request',
            };
        }
    },

    // View consultation requests
    getConsultationRequests: async (
        status?: 'pending' | 'accepted' | 'declined',
        fromDate?: string
    ): Promise<ConsultationResponse> => {
        try {
            const token = getAuthToken();
            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (fromDate) params.append('from_date', fromDate);

            const response = await axios.get(
                `${BASE_URL}/consultation/doctor/requests?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to get requests',
            };
        }
    },

    // Get paginated list of doctors
    getDoctors: async (page: number = 1, perPage: number = 10): Promise<ConsultationResponse> => {
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `${BASE_URL}/consultation/doctors?page=${page}&per_page=${perPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to get doctors',
            };
        }
    },

    // Search doctors by name
    searchDoctors: async (query: string): Promise<ConsultationResponse> => {
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `${BASE_URL}/consultation/doctors/search?query=${encodeURIComponent(query)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to search doctors',
            };
        }
    },
};

export default consultationService;
