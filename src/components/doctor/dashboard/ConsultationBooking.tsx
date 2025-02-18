import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import consultationService from '@/services/consultation';
import 'react-datepicker/dist/react-datepicker.css';

interface ConsultationBookingProps {
    doctorId: string;
    onSuccess?: () => void;
    className?: string;
}

const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
    doctorId,
    onSuccess,
    className = ''
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const availableTimes = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setSelectedTime(''); // Reset time when date changes
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) {
            setError('Please select both date and time');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            
            const response = await consultationService.bookConsultation({
                doctor_id: doctorId,
                consultation_date: formattedDate,
                consultation_time: selectedTime,
            });

            if (response.success) {
                onSuccess?.();
                // Reset form
                setSelectedDate(null);
                setSelectedTime('');
            } else {
                setError(response.error || 'Failed to book consultation');
            }
        } catch (error) {
            setError('An error occurred while booking the consultation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Book Consultation
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                    </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholderText="Select date"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {availableTimes.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 text-sm rounded-md transition-colors
                                    ${selectedTime === time
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleBooking}
                    disabled={loading || !selectedDate || !selectedTime}
                    className={`w-full px-4 py-2 text-white rounded-md transition-colors
                        ${loading || !selectedDate || !selectedTime
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Booking...' : 'Book Consultation'}
                </button>
            </div>
        </div>
    );
};

export default ConsultationBooking;
