import axios from 'axios';
import { getAuthToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PaymentRequest {
    doctor_id: string;
}

export interface PaymentResponse {
    success: boolean;
    data?: {
        payment_link: string;
    };
    error?: string;
}

export interface PaymentCallbackResponse {
    success: boolean;
    data?: {
        status: string;
        transaction_id: string;
    };
    error?: string;
}

const paymentsService = {
    makePayment: async (doctorId: string): Promise<PaymentResponse> => {
        try {
            const token = getAuthToken();
            const response = await axios.post(
                `${BASE_URL}/payments/make_payment`,
                { doctor_id: doctorId },
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
                error: error.response?.data?.message || 'Failed to create payment',
            };
        }
    },

    handlePaymentCallback: async (callbackData: any): Promise<PaymentCallbackResponse> => {
        try {
            const token = getAuthToken();
            const response = await axios.post(
                `${BASE_URL}/payments/payment_callback`,
                callbackData,
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
                error: error.response?.data?.message || 'Failed to process payment callback',
            };
        }
    },
};

export default paymentsService;
