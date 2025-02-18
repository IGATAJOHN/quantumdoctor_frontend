import React, { useState } from 'react';
import paymentsService from '@/services/payments';

interface ConsultationPaymentProps {
    doctorId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export default function ConsultationPayment({ doctorId, onSuccess, onError }: ConsultationPaymentProps) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const response = await paymentsService.makePayment(doctorId);
            
            if (response.success && response.data?.payment_link) {
                // Redirect to Flutterwave payment page
                window.location.href = response.data.payment_link;
                onSuccess?.();
            } else {
                onError?.(response.error || 'Payment initiation failed');
            }
        } catch (error) {
            onError?.('An error occurred while processing your payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium 
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#003b86]'}`}
        >
            {loading ? 'Processing...' : 'Pay Now'}
        </button>
    );
}
