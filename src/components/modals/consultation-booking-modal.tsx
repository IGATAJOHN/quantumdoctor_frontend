import React, { useState } from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import consultationService from '@/services/consultation';

interface ConsultationBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctorId: string;
    doctorName: string;
    onSuccess?: () => void;
}

const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
    isOpen,
    onClose,
    doctorId,
    doctorName,
    onSuccess
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const availableTimes = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    if (!isOpen) return null;

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
                onClose();
            } else {
                setError(response.error || 'Failed to book consultation');
            }
        } catch (error) {
            setError('An error occurred while booking the consultation');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[480px] bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Book Consultation with Dr. {doctorName}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

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

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBooking}
                            disabled={loading || !selectedDate || !selectedTime}
                            className={`px-4 py-2 text-white rounded-md transition-colors
                                ${loading || !selectedDate || !selectedTime
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Booking...' : 'Book Consultation'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationBookingModal;
