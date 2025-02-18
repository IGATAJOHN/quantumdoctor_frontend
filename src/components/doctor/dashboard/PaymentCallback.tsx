import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import paymentsService from '@/services/payments';

export default function PaymentCallback() {
    const router = useRouter();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [message, setMessage] = useState('Processing your payment...');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get callback data from URL query parameters
                const callbackData = {
                    transaction_id: router.query.transaction_id,
                    tx_ref: router.query.tx_ref,
                    status: router.query.status,
                };

                const response = await paymentsService.handlePaymentCallback(callbackData);

                if (response.success) {
                    setStatus('success');
                    setMessage('Payment successful! Redirecting...');
                    // Redirect to appropriate page after successful payment
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 2000);
                } else {
                    setStatus('error');
                    setMessage(response.error || 'Payment verification failed');
                }
            } catch (error) {
                setStatus('error');
                setMessage('An error occurred while verifying your payment');
            }
        };

        if (router.query.transaction_id) {
            handleCallback();
        }
    }, [router.query]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    {status === 'processing' && (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    )}
                    {status === 'success' && (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                    )}
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        {status === 'processing' ? 'Processing Payment' : status === 'success' ? 'Payment Successful' : 'Payment Failed'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
                </div>
            </div>
        </div>
    );
}
