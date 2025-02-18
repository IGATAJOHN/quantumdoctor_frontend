import React, { useEffect, useState } from 'react';
import consultationService from '@/services/consultation';

interface ConsultationAnalyticsProps {
    className?: string;
}

const ConsultationAnalytics: React.FC<ConsultationAnalyticsProps> = ({ className = '' }) => {
    const [analytics, setAnalytics] = useState<{
        completed: number;
        total: number;
        upcoming: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await consultationService.getDoctorAnalytics();
                
                if (response.success && response.data) {
                    setAnalytics(response.data);
                } else {
                    setError(response.error || 'Failed to fetch analytics');
                }
            } catch (error) {
                setError('An error occurred while fetching analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 bg-gray-200 rounded"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
                <div className="text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow ${className}`}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Consultation Analytics
                </h2>
                
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-600 text-sm font-medium">
                            Total Consultations
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-blue-700">
                            {analytics?.total || 0}
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-600 text-sm font-medium">
                            Completed
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-green-700">
                            {analytics?.completed || 0}
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-purple-600 text-sm font-medium">
                            Upcoming
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-purple-700">
                            {analytics?.upcoming || 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationAnalytics;
