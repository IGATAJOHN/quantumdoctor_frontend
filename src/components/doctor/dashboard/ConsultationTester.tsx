import React, { useEffect, useState } from 'react';
import consultationService from '@/services/consultation';

interface TestResult {
    endpoint: string;
    status: 'success' | 'error';
    message: string;
    data?: any;
}

const ConsultationTester: React.FC = () => {
    const [results, setResults] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(false);

    const addResult = (result: TestResult) => {
        setResults(prev => [...prev, result]);
    };

    const runTests = async () => {
        setLoading(true);
        setResults([]);

        // Test 1: Book Consultation
        try {
            const bookingResponse = await consultationService.bookConsultation({
                doctor_id: 'test_doctor_id',
                consultation_date: '2025-02-19',
                consultation_time: '09:00'
            });
            addResult({
                endpoint: '/consultation/book_consultation',
                status: bookingResponse.success ? 'success' : 'error',
                message: bookingResponse.success ? 'Successfully booked consultation' : bookingResponse.error || 'Failed',
                data: bookingResponse.data
            });
        } catch (error: any) {
            addResult({
                endpoint: '/consultation/book_consultation',
                status: 'error',
                message: error.message
            });
        }

        // Test 2: Get Doctor Analytics
        try {
            const analyticsResponse = await consultationService.getDoctorAnalytics();
            addResult({
                endpoint: '/consultation/doctor/analytics',
                status: analyticsResponse.success ? 'success' : 'error',
                message: analyticsResponse.success ? 'Successfully fetched analytics' : analyticsResponse.error || 'Failed',
                data: analyticsResponse.data
            });
        } catch (error: any) {
            addResult({
                endpoint: '/consultation/doctor/analytics',
                status: 'error',
                message: error.message
            });
        }

        // Test 3: Manage Consultation Request
        try {
            const manageResponse = await consultationService.manageConsultationRequest(
                'test_request_id',
                'accepted',
                '2025-02-19',
                '10:00'
            );
            addResult({
                endpoint: '/consultation/doctor/request/{request_id}',
                status: manageResponse.success ? 'success' : 'error',
                message: manageResponse.success ? 'Successfully managed request' : manageResponse.error || 'Failed',
                data: manageResponse.data
            });
        } catch (error: any) {
            addResult({
                endpoint: '/consultation/doctor/request/{request_id}',
                status: 'error',
                message: error.message
            });
        }

        // Test 4: Get Consultation Requests
        try {
            const requestsResponse = await consultationService.getConsultationRequests('pending', '2025-02-18');
            addResult({
                endpoint: '/consultation/doctor/requests',
                status: requestsResponse.success ? 'success' : 'error',
                message: requestsResponse.success ? 'Successfully fetched requests' : requestsResponse.error || 'Failed',
                data: requestsResponse.data
            });
        } catch (error: any) {
            addResult({
                endpoint: '/consultation/doctor/requests',
                status: 'error',
                message: error.message
            });
        }

        // Test 5: Get Doctors List
        try {
            const doctorsResponse = await consultationService.getDoctors(1, 10);
            addResult({
                endpoint: '/consultation/doctors',
                status: doctorsResponse.success ? 'success' : 'error',
                message: doctorsResponse.success ? 'Successfully fetched doctors' : doctorsResponse.error || 'Failed',
                data: doctorsResponse.data
            });
        } catch (error: any) {
            addResult({
                endpoint: '/consultation/doctors',
                status: 'error',
                message: error.message
            });
        }

        // Test 6: Search Doctors
        try {
            const searchResponse = await consultationService.searchDoctors('test');
            addResult({
                endpoint: '/consultation/doctors/search',
                status: searchResponse.success ? 'success' : 'error',
                message: searchResponse.success ? 'Successfully searched doctors' : searchResponse.error || 'Failed',
                data: searchResponse.data
            });
        } catch (error: any) {
            addResult({
                endpoint: '/consultation/doctors/search',
                status: 'error',
                message: error.message
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        runTests();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">API Endpoint Tests</h2>
            <div className="space-y-4">
                {loading ? (
                    <div className="text-blue-600">Running tests...</div>
                ) : (
                    results.map((result, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg ${
                                result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                            }`}
                        >
                            <div className="font-medium">
                                {result.endpoint}
                            </div>
                            <div className={`text-sm ${
                                result.status === 'success' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {result.message}
                            </div>
                            {result.data && (
                                <pre className="mt-2 text-xs bg-white p-2 rounded">
                                    {JSON.stringify(result.data, null, 2)}
                                </pre>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConsultationTester;
