// pages/recommendations.tsx

import DashboardLayout from '@/layouts/dashboard';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface Doctor {
    id: number;
    name: string;
    specialty: string;
    consultationFee: string;
    taxAmount: string;
    totalAmount: string;
    serviceCharges: string;
    availableSlots: string[]; // Array of available appointment slots
    dateTime: string; // Current selected date and time
    biography: string;
    imageUrl: string;
    rating: number;
    qualifications: {
        degrees: string[]; // Updated to specify degrees as an array of strings
        certifications: string[]; // Updated to specify certifications as an array of strings
        affiliations: string[]; // Updated to specify affiliations as an array of strings
    };
    reviews: Review[];
    previousPositions: string[];
    patientSatisfaction: string;
    specialRecognition: string;
}

interface Review {
    name: string;
    date: string;
    review: string;
    rating: number;
    imageUrl: string;

}

const doctors: Doctor[] = [
    {
        id: 1,
        name: 'Maryann Yusuf',
        specialty: 'Oncologist',
        consultationFee: '15,000',
        taxAmount: '75',
        totalAmount: '16025',
        serviceCharges: '950',
        availableSlots: [
            "April 7, 2024 at 10:00 AM",
            "April 7, 2024 at 11:00 AM",
            "April 8, 2024 at 1:00 PM",
            "April 9, 2024 at 2:00 PM",
        ],
        dateTime: "April 7, 2024 on Thursday",



        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: '/images/Ellipse 5.png',
        rating: 4.8,
        qualifications: {
            degrees: [
                'M.D. in Cardiology, Harvard Medical School',
                'B.Sc. in Biology, Stanford University',
            ],
            certifications: [
                'Board Certified in Cardiology',
                'Certified Heart Failure Specialist (CHFS)',
            ],
            affiliations: [
                'Member of the American College of Cardiology (ACC)',
                'Member of the American Heart Association (AHA)',
            ],
        },
        previousPositions: [
            'Senior Cardiologist at Springfield General Hospital (2012-2018)',
            'Cardiology Consultant at Riverside Medical Center (2018-2024)',
        ],
        patientSatisfaction: '96% of patients recommend Dr. Yusuf',
        specialRecognition: 'Consistently rated for “Excellent Communication” and “Thorough Explanations”',
        reviews: [
            {
                name: 'Abraham Smart',
                date: 'October 15, 2024',
                review: 'Dr. Yusuf explained my condition thoroughly and made me feel comfortable.',
                rating: 4,
                imageUrl: '/images/Rectangle 59.png',
            },
            {
                name: 'Matthew West',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (1).png',
            },
            {
                name: 'Jane Doe',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (2).png',
            },
        ],
    },
    {
        id: 2,
        name: 'Monday Morgan',
        specialty: 'Gynecologist',
        consultationFee: '25,000',
        taxAmount: '75',
        totalAmount: '16025',
        serviceCharges: '950',
        availableSlots: [
            "April 7, 2024 at 10:00 AM",
            "April 7, 2024 at 11:00 AM",
            "April 8, 2024 at 1:00 PM",
            "April 9, 2024 at 2:00 PM",
        ],
        dateTime: "April 7, 2024 on Thursday",

        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: '/images/Ellipse 5 (1).png',
        rating: 4.8,
        qualifications: {
            degrees: [
                'M.D. in Cardiology, Harvard Medical School',
                'B.Sc. in Biology, Stanford University',
            ],
            certifications: [
                'Board Certified in Cardiology',
                'Certified Heart Failure Specialist (CHFS)',
            ],
            affiliations: [
                'Member of the American College of Cardiology (ACC)',
                'Member of the American Heart Association (AHA)',
            ],
        },
        previousPositions: [
            'Senior Cardiologist at Springfield General Hospital (2012-2018)',
            'Cardiology Consultant at Riverside Medical Center (2018-2024)',
        ],
        patientSatisfaction: '96% of patients recommend Dr. Yusuf',
        specialRecognition: 'Consistently rated for “Excellent Communication” and “Thorough Explanations”',
        reviews: [
            {
                name: 'Abraham Smart',
                date: 'October 15, 2024',
                review: 'Dr. Yusuf explained my condition thoroughly and made me feel comfortable.',
                rating: 4,
                imageUrl: '/images/Rectangle 59.png',
            },
            {
                name: 'Matthew West',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (1).png',
            },
            {
                name: 'Jane Doe',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (2).png',
            },
        ],
    },
    {
        id: 3,
        name: 'Maryann Yusuf',
        specialty: 'Dentist',
        consultationFee: '19,500',
        taxAmount: '75',
        totalAmount: '16025',
        serviceCharges: '950',
        availableSlots: [
            "April 7, 2024 at 10:00 AM",
            "April 7, 2024 at 11:00 AM",
            "April 8, 2024 at 1:00 PM",
            "April 9, 2024 at 2:00 PM",
        ],
        dateTime: "April 7, 2024 on Thursday",

        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: '/images/Ellipse 5 (2).png',
        rating: 4.8,
        qualifications: {
            degrees: [
                'M.D. in Cardiology, Harvard Medical School',
                'B.Sc. in Biology, Stanford University',
            ],
            certifications: [
                'Board Certified in Cardiology',
                'Certified Heart Failure Specialist (CHFS)',
            ],
            affiliations: [
                'Member of the American College of Cardiology (ACC)',
                'Member of the American Heart Association (AHA)',
            ],
        },
        previousPositions: [
            'Senior Cardiologist at Springfield General Hospital (2012-2018)',
            'Cardiology Consultant at Riverside Medical Center (2018-2024)',
        ],
        patientSatisfaction: '96% of patients recommend Dr. Yusuf',
        specialRecognition: 'Consistently rated for “Excellent Communication” and “Thorough Explanations”',
        reviews: [
            {
                name: 'Abraham Smart',
                date: 'October 15, 2024',
                review: 'Dr. Yusuf explained my condition thoroughly and made me feel comfortable.',
                rating: 4,
                imageUrl: '/images/Rectangle 59.png',
            },
            {
                name: 'Matthew West',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (1).png',
            },
            {
                name: 'Jane Doe',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (2).png',
            },
        ],
    },

    {
        id: 4,
        name: 'Maryann Yusuf',
        specialty: 'Oncologist',
        consultationFee: '22,500',
        taxAmount: '75',
        totalAmount: '16025',
        serviceCharges: '950',
        availableSlots: [
            "April 7, 2024 at 10:00 AM",
            "April 7, 2024 at 11:00 AM",
            "April 8, 2024 at 1:00 PM",
            "April 9, 2024 at 2:00 PM",
        ],
        dateTime: "April 7, 2024 on Thursday",

        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: '/images/Ellipse 5 (3).png',
        rating: 4.8,
        qualifications: {
            degrees: [
                'M.D. in Cardiology, Harvard Medical School',
                'B.Sc. in Biology, Stanford University',
            ],
            certifications: [
                'Board Certified in Cardiology',
                'Certified Heart Failure Specialist (CHFS)',
            ],
            affiliations: [
                'Member of the American College of Cardiology (ACC)',
                'Member of the American Heart Association (AHA)',
            ],
        },
        previousPositions: [
            'Senior Cardiologist at Springfield General Hospital (2012-2018)',
            'Cardiology Consultant at Riverside Medical Center (2018-2024)',
        ],


        patientSatisfaction: '96% of patients recommend Dr. Yusuf',
        specialRecognition: 'Consistently rated for “Excellent Communication” and “Thorough Explanations”',
        reviews: [
            {
                name: 'Abraham Smart',
                date: 'October 15, 2024',
                review: 'Dr. Yusuf explained my condition thoroughly and made me feel comfortable.',
                rating: 4,
                imageUrl: '/images/Rectangle 59.png',
            },
            {
                name: 'Matthew West',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (1).png',
            },
            {
                name: 'Jane Doe',
                date: 'October 15, 2024',
                review: 'Very professional and attentive doctor.',
                rating: 4,
                imageUrl: '/images/Rectangle 59 (2).png',
            },
        ],
    },
];

export default function Recommendations() {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [currentView, setCurrentView] = useState('recommendations');

    const handleDoctorClick = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setCurrentView('profile');
    };

    const handleBackClick = () => {
        setSelectedDoctor(null);
        setCurrentView('recommendations');
    };
    const handleProceedToPayment = () => {
        setCurrentView('payment'); // Switch to the payment view for the selected doctor

    };
    const handleSuccessPayment = () => {
        setCurrentView('card');
    }
    const handleCompletePayment = () => {
        setCurrentView('success');
    }


    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto h-screen overflow-y-auto w-full">
            {currentView !== 'success' ? (
                <DashboardLayout>

                    <main className="flex-1 p-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {currentView === 'success' ? "Success" :
                                currentView === 'card'
                                    ? "Card Details"
                                    : currentView === 'profile'
                                        ? "Doctor's Profile"
                                        : currentView === 'payment'
                                            ? "Make Payment"
                                            : 'Recommended for You'}
                        </h1>

                        {currentView === 'recommendations' && (
                            <RecommendationsList doctors={doctors} onDoctorClick={handleDoctorClick} />
                        )}

                        {currentView === 'profile' && selectedDoctor && (
                            <DoctorProfile
                                doctor={selectedDoctor}
                                onBack={handleBackClick}
                                onProceedToPayment={handleProceedToPayment}
                            />
                        )}

                        {currentView === 'payment' && selectedDoctor && (
                            <MakePayment
                                doctor={selectedDoctor}
                                onBack={() => setCurrentView('profile')}
                                makePayment={handleSuccessPayment}
                            />
                        )}

                        {currentView === 'card' && selectedDoctor && (
                            <CardDetails
                                doctor={selectedDoctor}
                                onBack={() => setCurrentView('profile')} onSuccessPayment=


                                {handleCompletePayment} />
                        )}
                        {currentView === 'success' && selectedDoctor && (
                            <Success
                                doctor={selectedDoctor}
                                onBack={() => setCurrentView('profile')} onCompletePayment={function (): void {

                                }} />
                        )}

                    </main>
                </DashboardLayout>
            ) : (
                <main className="flex-1 p-1">
                    <Success
                        doctor={selectedDoctor}
                        onBack={() => setCurrentView('profile')}
                        onCompletePayment={() => console.log("Complete payment")}
                    />
                </main>
            )}
        </div>
    )
};

function RecommendationsList({
    doctors,
    onDoctorClick,
}: {
    doctors: Doctor[];
    onDoctorClick: (doctor: Doctor) => void;
}) {
    return (
        <div>
            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-8">
                <input
                    type="text"
                    placeholder="Search Doctors"
                    className="p-3 border border-gray-300 rounded-lg w-full"
                />
                <button className="bg-blue-600 text-white p-3 rounded-lg">All</button>
                <select className="border border-gray-300 p-3 rounded-lg">
                    <option>Specialty</option>
                </select>
                <select className="border border-gray-300 p-3 rounded-lg">
                    <option>Location</option>
                </select>
            </div>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        onClick={() => onDoctorClick(doctor)}
                    >
                        <img
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <button className="bg-blue-600 text-white w-full rounded-lg mt-1"> AI Reccommended</button>
                        <h3 className="text-center text-lg font-semibold mt-4">{doctor.name}</h3>
                        <p className="text-center text-sm text-gray-500 mt-1">{doctor.specialty}</p>
                        <p className="text-center text-sm text-gray-500 mt-4">{doctor.biography}</p>
                        <p className="text-center text-sm font-semibold text-blue-600 mt-4">₦{doctor.consultationFee} </p>
                        <p className="text-center text-sm text-black-600">per session</p>
                        <button className="bg-blue-600 text-white w-full rounded-lg mt-5">Book Consultation</button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            < div className="flex justify-center space-x-2 mt-8" >
                <button className="bg-gray-200 px-4 py-2 rounded-lg">Prev</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">1</button>
                <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">2</button>
                <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">3</button>
                <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">4</button>
                <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">5</button>
                <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">6</button>
                <button className="bg-gray-200 px-4 py-2 rounded-lg">Next</button>
            </div>
        </div>
    );
}
function DoctorProfile({ doctor, onProceedToPayment }: { doctor: Doctor; onBack: () => void; onProceedToPayment: () => void }) {
    return (
        <div className="flex-1 lg:pl-4 space-y-2">
            <button className="fixed top-8 right-8 bg-blue-600 text-white text-sm py-1 px-2 rounded shadow-md"
                onClick={onProceedToPayment}>
                Book Consultation
            </button>


            <div className="flex flex-col lg:flex-row">


                {/* Left Side */}
                <div className="flex-1 lg:pr-4 space-y-2">
                    <div className="flex items-center">
                        <img
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            className="w-20 h-20 rounded-full object-cover mr-3"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">{doctor.name}</h2>
                            <p className="text-gray-500 text-xs">{doctor.specialty}</p>
                            <button className="bg-blue-600 text-white rounded text-xs mt-1">AI Recommended</button>
                        </div>
                    </div>
                    <hr className="border-gray-300" /> {/* Divider */}

                    <p className="text-gray-700 text-sm"><strong>BIOGRAPHY:</strong> {doctor.biography}</p>
                    <hr className="border-gray-300" /> {/* Divider */}
                    <p className="text-gray-700 text-sm"><strong>CONSULTATION FEE:</strong> ₦{doctor.consultationFee} per session</p>
                    <hr className="border-gray-300" /> {/* Divider */}


                    {/* Qualifications */}
                    <section className="mt-2">
                        <h3 className="text-sm font-bold mb-1">QUALIFICATIONS</h3>
                        <div>
                            <h4 className="font-semibold text-xs mt-2">Degrees</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {doctor.qualifications.degrees.map((degree, index) => (
                                    <li key={index} className="text-gray-700 text-xs">{degree}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-xs mt-2">Certifications</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {doctor.qualifications.certifications.map((certification, index) => (
                                    <li key={index} className="text-gray-700 text-xs">{certification}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-xs mt-2">Affiliations</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {doctor.qualifications.affiliations.map((affiliation, index) => (
                                    <li key={index} className="text-gray-700 text-xs">{affiliation}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <hr className="border-gray-300" /> {/* Divider */}
                    {/* Years of Experience */}
                    <section className="mt-2">
                        <h3 className="text-sm font-bold mb-1">YEARS OF EXPERIENCE</h3>
                        <p className="text-gray-700 text-xs">12 years of clinical cardiology and patient care</p>
                    </section>

                </div>
                <div className="hidden lg:block w-px bg-gray-300 mx-4" /> {/* Vertical line */}

                {/* Right Side */}


                <div className="flex-1 lg:pl-4 space-y-2 relative">

                    {/* Previous Positions */}
                    <section className="mt-2">
                        <h3 className="text-sm font-bold mb-1">PREVIOUS POSITIONS</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {doctor.previousPositions.map((position, index) => (
                                <li key={index} className='text-gray-700 text-xs'>{position}</li>
                            ))}
                        </ul>
                    </section>
                    <hr className="border-gray-300" /> {/* Divider */}

                    {/* Ratings */}
                    <div className="mt-2">
                        <h3 className="font-semibold text-sm mb-1">RATINGS</h3>
                        <p className="text-xs"> <strong>Overall Rating:</strong> {doctor.rating} / 5 (based on 250 reviews)</p>
                        <p className="text-xs"> <strong>Patient Satisfaction:</strong> {doctor.patientSatisfaction}</p>
                        <p className="text-xs"> <strong>Special Recognition:</strong> {doctor.specialRecognition}</p>
                    </div>
                    <hr className="border-gray-300" /> {/* Divider */}

                    {/* Patient Reviews */}
                    <section className="mt-2">

                        <h3 className="text-sm font-bold mb-4">PATIENT REVIEWS</h3>

                        {doctor.reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </section>
                </div>
            </div>
        </div >
    );
}

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm mb-2 flex">
            <img
                src={review.imageUrl}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-xs">{review.name}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                    <p className="mt-1 text-yellow-500 text-xs">
                        {Array(review.rating).fill("⭐").join("")} / 5
                    </p>
                </div>
                <div className="flex items-center mt-1">

                </div>
                <p className="text-gray-700 mt-1 text-xs">{review.review}</p>
            </div>
        </div>
    );
}


function MakePayment({ doctor, makePayment }: { doctor: Doctor; onBack: () => void; makePayment: () => void; }) {
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(''); // Assuming availableSlots have time properties
    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
    ];
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setDate(date);
        }
    };
    return (

        <div className="p-4 sm:p-5 sm-white shadow-lg rounded-lg max-w-7xl ml-4 mx-20 my-8">
            <div className="flex text-left w-full flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8">
                {/* Left side - Doctor Information */}

                <div className="flex-[1] lg:w-1/2 text-center">
                    <img src="/images/Ellipse 5.png" alt="Doctor" className="w-24 h-24 rounded-full mx-auto" />
                    <h3 className="mt-4 font-semibold text-xl">{doctor.name}</h3>
                    <p className="text-gray-500 mb-2">{doctor.specialty}</p>
                    <p className="text-gray-700 mb-2 text-md">{doctor.biography}</p>
                    <p className="mt-2 text-md font-bold">₦{doctor.consultationFee}</p>


                    <div className="pt-20">

                        <div className="border-t text-left pt-10">
                            <p>Specialist's Fee: <span className="float-right">₦{doctor.consultationFee}</span></p>
                            <p>Service Charge: <span className="float-right">₦{doctor.serviceCharges}</span></p>
                            <p>Tax: <span className="float-right">₦{doctor.taxAmount}</span></p>
                            <p className="font-bold">Total: <span className="float-right">₦{doctor.totalAmount}</span></p>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block w-px bg-gray-300 mx-2" /> {/* Vertical line */}

                {/* Right side - Appointment Details */}
                <div className="flex-[1] text-center lg:w-1/2 space-y-2">
                    <h2 className="text-xl text-center font-semibold mb-4" >Date and Time</h2>
                    <h3 className='text-center'>Pick a Date</h3>
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-4"
                        dateFormat="yyyy/MM/dd"
                        inline
                    />

                    <h3 className='text-center'>Pick a time</h3>
                    <select
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-4"
                        aria-label="Select appointment time"
                    >
                        <option value="">Select a time</option>
                        {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>

                    <div className="pt-5">
                        <button
                            onClick={makePayment}
                            className="mt-5 bg-blue-600 text-white px-4 py-2 mx-auto rounded-md"
                        >
                            Proceed To Make Payment
                        </button>

                    </div>
                </div>
            </div>

        </div >


    );
}



function CardDetails({ doctor, onSuccessPayment }: { doctor: Doctor; onBack: () => void; onSuccessPayment: () => void; }) {
    return (
        <div className="p-4 sm:p-5 bg-white shadow-lg rounded-lg max-w-7xl mx-auto my-4">
            <div className="flex flex-col lg:flex-row text-left w-full space-y-2 lg:space-y-0 lg:space-x-8">

                {/* Left side - Doctor Information */}
                <div className="flex-[2] lg:w-1/4 text-center">
                    <h2 className="text-xs p-4 border rounded-lg shadow-md bg-white font-semibold mb-4 text-left">
                        Booking Summary
                    </h2>
                    <div>
                        <img src="/images/Ellipse 5.png" alt="Doctor" className="w-24 h-24 rounded-full mx-auto" />
                    </div>
                    <h3 className="mt-4 font-semibold text-xl">{doctor.name}</h3>
                    <p className="text-gray-500 mb-2">{doctor.specialty}</p>
                    <p className="text-gray-700 mb-2 text-md">{doctor.biography}</p>
                    <p className="mt-2 text-md font-bold">₦{doctor.consultationFee}</p>

                    <div className="pt-10">
                        <div className="border-t text-left pt-4">
                            <p>Specialist's Fee: <span className="float-right">₦{doctor.consultationFee}</span></p>
                            <p>Service Charge: <span className="float-right">₦{doctor.serviceCharges}</span></p>
                            <p>Tax: <span className="float-right">₦{doctor.taxAmount}</span></p>
                            <p className="font-bold">Total: <span className="float-right">₦{doctor.totalAmount}</span></p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block w-px bg-gray-300 mx-2" /> {/* Vertical line */}

                {/* Right side - Payment Form */}
                <div className="flex-[3] w-full text-center lg:w-3/4 space-y-2">
                    <div className="bg-gray-100 p-6 rounded-md shadow-md w-full lg:w-6/7 max-w-xl mx-auto">
                        <img src="/images/credit-card 1.png" alt="card" className="w-12 h-12 mx-auto" />
                        <h1 className="mt-4 font-semibold text-xl">
                            Make Payment
                        </h1>

                        <h2 className="text-xs font-semibold mb-10">
                            Enter Your Card Details Below To Make Payment
                        </h2>

                        <form onSubmit={onSuccessPayment} className="space-y-4 w-full max-w-xl mx-auto">
                            <input className="w-full p-2 border rounded" placeholder="Name on card" required />
                            <input className="w-full p-2 border rounded" placeholder="Card Number" required />
                            <input className="w-full p-2 border rounded" placeholder="Expiry date" required />
                            <input className="w-full p-2 border rounded" placeholder="CVV" required />
                            <button type="submit" onClick={(onSuccessPayment)} className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md">
                                Make Payment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};


function Success({ onCompletePayment }: { doctor: Doctor; onBack: () => void; onCompletePayment: () => void; }) {

    return (
        <div className="p-4 sm:p-5 bg-gray-100 max-w-7xl mx-auto my-8">
            <div className="items-center justify-center text-center">
                <div className="text-green-500 text-9xl mb-9">✓</div>
                <h1 className="text-3xl font-semibold mb-9">Successful</h1>
                <p className="text-md sm:text-md mb-2">
                    You have successfully booked an appointment.
                </p>
                <p className="text-md sm:text-md font-semibold mb-6">
                    Appointment Time: <strong>14:35 PM, 24th November 2024</strong>
                </p>
                <button
                    onClick={(onCompletePayment)}
                    className="mt-4 w-80 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    View Booking
                </button>
            </div>
        </div>


    )
};