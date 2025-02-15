// imports
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/dashboard';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


// looks
interface Lab {
    name: string;
    fee: string;
    taxAmount: string;
    totalAmount: string;
    serviceCharges: string;
    availableSlots: string[];
    dateTime: string;
    services: string;
    location: string;
    distance: string;
    rating: number;
    testName: string;
    testDate: string;
    date?: string;
    testSummary: string[];
    testInterpretation: string;
    summary: string[];
    interpretation: string;

};


const labResultsData = [
    {
        name: 'Complete Blood Count (CBC)',
        date: '24/10/2024',
        time: '10:00 AM',
        status: 'Completed',
        result: 'Normal Range',
        fee: '500',
        taxAmount: '75',
        totalAmount: '575',
        serviceCharges: '50',
        availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM'],
        dateTime: '24/10/2024 10:00 AM',
        services: 'Blood Test',
        location: 'Lab 1',
        distance: '5 km',
        rating: 4.5,
        testName: 'CBC',
        testDate: '24/10/2024',
        testSummary: ['White Blood Cell Count', 'Red Blood Cell Count', 'Platelet Count'],
        testInterpretation: 'The results indicate a normal blood cell count.',
        summary: ['White Blood Cell Count', 'Red Blood Cell Count', 'Platelet Count'],
        interpretation: 'The results indicate a normal blood cell count.'
    },
    {
        name: 'X-ray - Chest',
        date: '24/10/2024',
        time: '11:00 AM',
        status: 'Completed',
        result: 'Mild Inflammation Detected',
        fee: '800',
        taxAmount: '120',
        totalAmount: '920',
        serviceCharges: '100',
        availableSlots: ['11:00 AM', '12:00 PM', '1:00 PM'],
        dateTime: '24/10/2024 11:00 AM',
        services: 'X-ray',
        location: 'Lab 2',
        distance: '3 km',
        rating: 4.8,
        testName: 'X-ray - Chest',
        testDate: '24/10/2024',
        testSummary: ['Chest X-ray'],
        testInterpretation: 'Mild inflammation detected in the lungs.',
        summary: ['Chest X-ray'],
        interpretation: 'Mild inflammation detected in the lungs.'
    },
    {
        name: 'Blood Sugar Test',
        date: '24/10/2024',
        time: '12:00 PM',
        status: 'Completed',
        result: 'Normal Range',
        fee: '300',
        taxAmount: '45',
        totalAmount: '345',
        serviceCharges: '30',
        availableSlots: ['12:00 PM', '1:00 PM', '2:00 PM'],
        dateTime: '24/10/2024 12:00 PM',
        services: 'Blood Test',
        location: 'Lab 3',
        distance: '4 km',
        rating: 4.9,
        testName: 'Blood Sugar Test',
        testDate: '24/10/2024',
        testSummary: ['Blood Sugar Level'],
        testInterpretation: 'The results indicate a normal blood sugar level.',
        summary: ['Blood Sugar Level'],
        interpretation: 'The results indicate a normal blood sugar level.'
    },
    {
        name: 'Urinalysis',
        date: '24/10/2024',
        time: '1:00 PM',
        status: 'Completed',
        result: 'Normal Range',
        fee: '400',
        taxAmount: '60',
        totalAmount: '460',
        serviceCharges: '40',
        availableSlots: ['1:00 PM', '2:00 PM', '3:00 PM'],
        dateTime: '24/10/2024 1:00 PM',
        services: 'Urinalysis',
        location: 'Lab 4',
        distance: '2 km',
        rating: 4.7,
        testName: 'Urinalysis',
        testDate: '24/10/2024',
        testSummary: ['Urinalysis'],
        testInterpretation: 'The results indicate a normal urinalysis.',
        summary: ['Urinalysis'],
        interpretation: 'The results indicate a normal urinalysis.'
    },
    {
        name: 'Thyroid Function Test',
        date: '24/10/2024',
        time: '2:00 PM',
        status: 'Completed',
        result: 'Normal Range',
        fee: '600',
        taxAmount: '90',
        totalAmount: '690',
        serviceCharges: '60',
        availableSlots: ['2:00 PM', '3:00 PM', '4:00 PM'],
        dateTime: '24/10/2024 2:00 PM',
        services: 'Blood Test',
        location: 'Lab 5',
        distance: '6 km',
        rating: 4.6,
        testName: 'Thyroid Function Test',
        testDate: '24/10/2024',
        testSummary: ['TSH', 'T4', 'T3'],
        testInterpretation: 'The results indicate a normal thyroid function.',
        summary: ['TSH', 'T4', 'T3'],
        interpretation: 'The results indicate a normal thyroid function.'
    }
];



//steps
type Tab = 'Test Requests' | 'Lab Test Details' | 'Book Labs' | 'Lab Results' | 'Test Result Details' | 'Lab Details' | 'Payment' | 'Success';

//states
export default function TestResults() {
    const [currentTab, setCurrentTab] = useState<Tab>('Test Requests');
    const [selectedTest, setSelectedTest] = useState<Lab | null>(null);
    //functions
    const renderTabButtons = () => (
        <div className="flex space-x-4 p-4 border-b bg-white max-w-full">
            {['Test Requests', 'Book Labs', 'Lab Results'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setCurrentTab(tab as Tab)}
                    className={`py-2 px-6 font-semibold ${currentTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
    //handles
    const handleTestClick = (test: Lab) => {
        setSelectedTest(test);
        setCurrentTab('Lab Details');
    };
    const handleOnClick = (test: Lab) => {
        setSelectedTest(test);
        setCurrentTab('Lab Test Details');
    };


    const handleViewDetails = (test: Lab) => {
        setSelectedTest(test)
        setCurrentTab('Test Result Details')

    };


    const handleResults = () => {
        setCurrentTab('Test Result Details')
    };
    const handleProceedToBookLab = () => setCurrentTab('Payment');
    const handleBookLab = () => setCurrentTab('Lab Test Details')
    const handlePaymentSuccess = () => setCurrentTab('Success');
    //data stored
    const labs: Lab[] = [
        {
            name: "Springfield Diagnostic Center",
            services: "Blood Tests, Imaging, Home Collection Available",
            location: "123 Main St, Springfield",
            distance: "1.2 miles away",
            rating: 5,
            fee: '25,000',
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


            testName: 'Complete Blood Count (CBC)',
            testDate: 'October 10, 2024',
            testSummary: ['WBC: 6.0 x10^9/L (Normal) RBC: 4.8 x10^12/L (Normal) Hemoglobin: 14 g/dL (Normal)'],
            testInterpretation: 'Your results are within the normal range. Please consult with your doctor for a full analysis.',
            summary: ['WBC: 6.0 x10^9/L (Normal) RBC: 4.8 x10^12/L (Normal) Hemoglobin: 14 g/dL (Normal)'],
            interpretation: 'Your results are within the normal range. Please consult with your doctor for a full analysis.',
        },
        {
            name: "Riverside Medical Labs",
            services: "X-rays, Blood Tests, Urine Analysis",
            location: "456 River Rd, Springfield",
            distance: "2.8 miles away",
            fee: '25,000',
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
            rating: 4,
            testName: 'Complete Blood Count (CBC)',
            testDate: 'October 10, 2024',
            testSummary: ['WBC: 6.0 x10^9/L (Normal) RBC: 4.8 x10^12/L (Normal) Hemoglobin: 14 g/dL (Normal)'],
            testInterpretation: 'Your results are within the normal range. Please consult with your doctor for a full analysis.',
            summary: ['WBC: 6.0 x10^9/L (Normal) RBC: 4.8 x10^12/L (Normal) Hemoglobin: 14 g/dL (Normal)'],
            interpretation: 'Your results are within the normal range. Please consult with your doctor for a full analysis.',

        },
    ];
    //switches
    const renderTabContent = () => {
        switch (currentTab) {
            case 'Test Requests':
                return <TestRequests onBookClick={handleOnClick} />;
            case 'Lab Test Details':
                return selectedTest && (
                    <LabTestDetails lab={selectedTest} onBook={handleBookLab} />
                );
            case 'Book Labs':
                return <BookLabs labs={labs} onLabSelect={handleTestClick} />;
            case 'Lab Details':
                return selectedTest && (
                    <LabDetails
                        lab={selectedTest}
                        onProceed={handleProceedToBookLab}
                    />
                );
            case 'Payment':
                return selectedTest && (
                    <Payment lab={selectedTest} onSuccess={handlePaymentSuccess} />
                );

            case 'Success':
                return <Success onReturn={() => setCurrentTab('Book Labs')} />;

            case 'Lab Results':
                return <LabResults onViewDetails={handleViewDetails} />;
            case 'Test Result Details':
                return <TestResultDetails lab={selectedTest} results={handleResults} />;

            default:
                return null;



        }
    };
    useEffect(() => {
        if (currentTab === 'Test Requests') {
            setSelectedTest(null);
        }
    }, [currentTab]);

    return (
        <>
            {currentTab !== 'Success' ? (
                <DashboardLayout>
                    <div className="bg-gray-50 min-h-screen w-full">
                        {renderTabButtons()}
                        <div className="p-4 max-w-full">
                            {renderTabContent()}
                        </div>
                    </div>
                </DashboardLayout>
            ) : (
                <div className="bg-gray-50 min-h-screen w-full">
                    {renderTabButtons()}
                    <div className="p-4 max-w-full">
                        {renderTabContent()}
                    </div>
                </div>
            )}
        </>
    );
}



const TestRequests = ({ onBookClick }: { onBookClick: (test: Lab) => void }) => (
    <div>
        <h2 className="text-2xl font-semibold mb-4">Lab Test</h2>
        {Array(4).fill(null).map((_, index) => (
            <div key={index} className="flex justify-between items-center p-2 border my-4 rounded-lg shadow-md max-w-full">
                <div className="flex-1">
                    <p><strong>Blood Test</strong> <span className="text-sm">(Requested by Dr. Sarah Lee)</span></p>
                    <p>Request Date: <span className="font-semibold">October 10, 2024</span></p>
                    <p>Status: <span className="font-semibold text-yellow-500">Pending</span></p>
                </div>
                <button
                    onClick={() => onBookClick({
                        name: 'Blood Test',
                        fee: '25000',
                        taxAmount: '75',
                        totalAmount: '16025',
                        serviceCharges: '950',
                        availableSlots: ['April 7, 2024 at 10:00 AM'],
                        dateTime: 'April 7, 2024 on Thursday',
                        services: 'Blood Tests',
                        location: '123 Main St, Springfield',
                        distance: '1.2 miles away',
                        rating: 5,
                        testName: 'Complete Blood Count (CBC)',
                        testDate: 'October 10, 2024',
                        testSummary: ['WBC: 6.0 x10^9/L (Normal) RBC: 4.8 x10^12/L (Normal) Hemoglobin: 14 g/dL (Normal)'],
                        testInterpretation: 'Your results are within the normal range. Please consult with your doctor for a full analysis.',
                        summary: ['WBC: 6.0 x10^9/L (Normal) RBC: 4.8 x10^12/L (Normal) Hemoglobin: 14 g/dL (Normal)'],
                        interpretation: 'Your results are within the normal range. Please consult with your doctor for a full analysis.',
                    })}
                    className="bg-blue-600 text-white px-3 rounded-lg mt-4 hover:bg-blue-700"
                >
                    Book a Lab
                </button>
            </div>
        ))}
    </div>
);

const LabTestDetails = ({ lab, onBook }: { lab: Lab, onBook: () => void }) => (
    <div>
        <h2 className="text-2xl font-semibold mb-4">Lab Test Details</h2>
        <div className="bg-white p-6 shadow rounded-lg max-w-2xl mx-auto">

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img
                        src="/images/Ellipse 5 (5).png"
                        alt="Dr. Sarah Lee"
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <p className="font-semibold text-lg">Dr. Sarah Lee</p>
                        <span className="text-blue-600 bg-blue-100 px-2 rounded text-sm">Gynecologist</span>
                    </div>
                </div>
                <button className="border border-blue-600 text-blue-600 px-4 rounded hover:bg-blue-50">
                    View Profile
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-b mb-4">
                <div>
                    <p className="font-semibold mt-4">Test Type:</p>
                    <p>{lab.name}</p>
                </div>
                <div>
                    <p className="font-semibold text-left mt-4 ">Request Date:<span className='float-right'>Urgency:</span></p>
                    <p className='text-left mb-4'>{lab.dateTime}<span className='float-right'>High</span></p>
                </div>
            </div>

            <div className="mb-4">
                <p className="font-semibold">Description:</p>
                <p className="text-gray-700">
                    A CBC test is used to evaluate overall health and detect a wide range of disorders, including anemia and infection.
                </p>
            </div>
            <hr className="hidden lg:block border-t-2 border-gray-300 my-4 sm:my-0" />

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className="font-semibold">Preparation Instruction:</p>
                    <p className="text-gray-700">Fasting required for 8 hours before the test.</p>
                </div>
                <div>
                    <p className="font-semibold">Note:</p>
                    <p className="text-gray-700 mb-4">Please complete this test within the next 3 days.</p>
                </div>
            </div>
            <hr className="hidden lg:block border-t-2 border-gray-300 my-4 sm:my-0" />

            <div className="text-center mt-4">
                <button onClick={onBook} className="bg-blue-600 text-white px-10 py-2 rounded hover:bg-blue-700">
                    Find a Lab
                </button>
            </div>
        </div>
    </div>
);


const BookLabs = ({ labs, onLabSelect }: { labs: Lab[]; onLabSelect: (lab: Lab) => void }) => (
    <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Book a Lab</h2>
        <div className="flex items-center gap-4 mb-4">
            <input
                type="text"
                placeholder="Search Labs"
                className="border rounded px-4 py-2 flex-1"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">All</button>
            <select className="border rounded px-4 py-2">
                <option>Lab Type</option>
            </select>
            <select className="border rounded px-4 py-2">
                <option>Distance</option>
            </select>
            <select className="border rounded px-4 py-2">
                <option>Home collection</option>
            </select>
        </div>

        {labs.map((lab, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">

                <div>
                    <h2 className="text-lg font-semibold">{lab.name}</h2>
                    <p className="text-gray-600">{lab.services}</p>
                    <div className="border-t-2 border-gray-300 my-4"></div>
                    <div className="mt-5 space-x-10 flex text-gray-600">
                        <p><span className="font-semibold">Location:</span> {lab.location}</p>
                        <p><span className="font-semibold">Distance:</span> {lab.distance}</p>
                        <p><span className="font-semibold">Price:</span> {lab.fee}</p>                    </div>
                </div>
                <div className="text-center">
                    <button
                        onClick={() => onLabSelect(lab)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Book Now
                    </button>
                    <div className="mt-10 text-yellow-500">★★★★☆</div>
                </div>
            </div>
        ))}
    </div>
);

const LabDetails = ({ lab, onProceed }: { lab: Lab; onProceed: () => void }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedTestType, setSelectedTestType] = useState<string>('');
    const [selectedCollectionType, setSelectedCollectionType] = useState<string>('');
    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
    ];
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setDate(date);
        }
    };
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };
    const handleTestTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTestType(event.target.value);
    };
    const handleCollectionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollectionType(event.target.value);
    };

    return (

        <div className='space-y-4'>
            <h2 className="text-2xl font-semibold mb-4">Lab Details</h2>
            <div className="flex text-left flex-col md:flex-row md:space-x-10">

                <div className="flex-[1.2] space-y-2 md:w-1/2">
                    <div className="flex items-center space-x-4">
                        <img src="/images/Group 228.png" alt="Lab" className="w-20 h-20 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-lg">{lab.name}</h2>
                            <p className="text-sm text-blue-400">1.2 miles away</p>
                        </div>
                    </div>

                    <hr className="hidden lg:block border-t-2 border-gray-300 my-4 sm:my-0" />

                    <p className="text-gray-500">Service:</p>
                    <p className="font-semibold">{lab.services}</p>
                    <hr className="hidden sm:block border-t-2 border-gray-300 my-4 sm:my-0" />

                    <p className="text-gray-500 text-sm">Location:</p>
                    <p className="font-semibold">{lab.location} <span className='text-blue-400 text-sm border rounded-lg border-blue-300'>view on map</span></p>
                    <hr className="hidden sm:block border-t-2 border-gray-300 my-4 sm:my-0" />

                    <div className="flex-[1] lg:w-1/2 space-x-6 justify-between items-center">
                        <div className="flex flex-col">
                            <p className="text-gray-500 text-sm">Rating:<span className='float-right'>Fee:</span></p>
                            <p> ★★★★☆ <span className='float-right'>₦{lab.fee}</span></p>
                        </div>
                    </div>

                    <hr className="hidden lg:block w-full border-t-2 border-gray-300 my-4 sm:my-0" />
                    <div className="mt-2">
                        <label htmlFor="test-type" className="block text-gray-500">Test Type</label>
                        <select
                            id="test-type"
                            value={selectedTestType}
                            onChange={handleTestTypeChange}
                            className="bg-gray-100 border border-gray-300 rounded-md w-full"
                        >
                            <option value="">Select Test Type</option>
                            <option value="blood">Blood Test</option>
                            <option value="urine">Urine Test</option>
                            <option value="x-ray">X-Ray</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="collection-type" className="block text-gray-500">Collection Type</label>
                        <select
                            id="collection-type"
                            value={selectedCollectionType}
                            onChange={handleCollectionTypeChange}
                            className="bg-gray-100 border border-gray-300 rounded-md w-full"
                        >
                            <option value="">Select Collection Type</option>
                            <option value="home">Home Collection</option>
                            <option value="clinic">Clinic Collection</option>
                        </select>
                    </div>
                </div>
                <div className="hidden sm:block w-px bg-gray-300" />
                <div className="flex-[1] text-center lg:w-1/2 space-y-2">
                    <h2 className="text-xl text-center font-semibold mb-4">Date and Time</h2>
                    <h3 className="text-center">Pick a Date</h3>
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-4"
                        dateFormat="yyyy/MM/dd"
                        inline
                    />

                    <h3 className="text-center">Pick a Time</h3>
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
                </div>
            </div>
            <div className="flex justify-center pt-6">
                <button
                    onClick={onProceed}
                    className="bg-blue-600 text-white px-10 py-2 rounded-lg"
                >
                    Proceed to Book Lab
                </button>
            </div>
        </div>


    );

};


const Payment = ({ lab, onSuccess }: { lab: Lab; onSuccess: () => void }) => (
    <div className='space-y-4'>
        <h2 className="text-2xl font-semibold mb-4">Lab Details</h2>
        <div className="flex text-left flex-col md:flex-row md:space-x-10">

            <div className="flex-[2] lg:w-1/4">
                <h2 className="text-xs p-4 border rounded-lg shadow-md bg-white font-semibold mb-4 text-left">
                    Booking Summary
                </h2>


                <div className="flex flex-col items-center">
                    <img src="/images/Group 228.png" alt="Lab" className="w-20 h-20 rounded-full" />
                    <h2 className="font-semibold text-lg text-center mb-2">{lab.name}</h2>
                </div>


                <hr className="hidden lg:block border-t-2 border-gray-300 my-4 sm:my-0" />
                <p className="text-gray-500 text-center text-sm mt-2">Location:</p>
                <p className="font-semibold text-center mb-2">{lab.location}</p>
                <hr className="hidden sm:block border-t-2 border-gray-300 my-4 sm:my-0" />
                <div className="flex-[1] lg:w-1/2 space-x-6 justify-between items-center">
                    <div className="flex mt-2 flex-col">
                        <p className="text-gray-500 text-sm">Date:<span className='float-right'>Time:</span></p>
                        <p> 24/11/2024 <span className='float-right mb-2'>4.00 PM</span></p>
                    </div>
                </div>
                <hr className="hidden lg:block border-t-2 border-gray-300 my-4 sm:my-0" />

                <div className="flex-[1] lg:w-1/2 space-x-6 mt-2 justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm"><span className='float-right'>Fee:</span></p>
                        <p> <span className='float-right mb-2'><strong>₦{lab.fee}</strong></span></p>
                    </div>
                </div>

                <hr className="hidden lg:block w-full border-t-2 border-gray-300 my-4 sm:my-0" />

                <div className="pt-4 text-left">
                    <p>Specialist's Fee: <span className="float-right">₦{lab.fee}</span></p>
                    <p>Service Charge: <span className="float-right">₦750</span></p>
                    <p>Tax: <span className="float-right">₦75</span></p>
                    <p className="font-bold">Total: <span className="float-right">₦25825</span></p>
                </div>
            </div>
            <div className="hidden sm:block w-px bg-gray-300" />
            <div className="flex-[3] w-full text-center lg:w-3/4 space-y-2">
                <div className="bg-gray-100 p-6 rounded-md shadow-md w-full lg:w-6/7 max-w-xl mx-auto">
                    <img src="/images/credit-card 1.png" alt="card" className="w-12 h-12 mx-auto" />
                    <h1 className="mt-4 font-semibold text-xl">
                        Make Payment
                    </h1>

                    <h2 className="text-xs font-semibold mb-10">
                        Enter Your Card Details Below To Make Payment
                    </h2>

                    <form onSubmit={onSuccess} className="space-y-4 w-full max-w-xl mx-auto">
                        <input className="w-full p-2 border rounded" placeholder="Name on card" required />
                        <input className="w-full p-2 border rounded" placeholder="Card Number" required />
                        <input className="w-full p-2 border rounded" placeholder="Expiry date" required />
                        <input className="w-full p-2 border rounded" placeholder="CVV" required />
                        <button type="submit" onClick={(onSuccess)} className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md">
                            Make Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div >

)

const Success = ({ onReturn }: { onReturn: () => void }) => (
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
                onClick={(onReturn)}
                className="mt-4 w-80 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
                View Booking
            </button>
        </div>
    </div>
);
const LabResults = ({ onViewDetails }: { onViewDetails: (test: Lab) => void }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Lab Results</h2>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search Test"
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-md">
                    <option>Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-md">Time</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md">Date</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-3 border-b">Test Name</th>
                            <th className="py-2 px-3 border-b">Test Date</th>
                            <th className="py-2 px-3 border-b">Test Time </th>
                            <th className="py-2 px-3 border-b">Test Status</th>
                            <th className="py-2 px-3 border-b">Test Result</th>
                            <th className="py-2 px-3 border-b">Test Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {labResultsData.map((test, index) => (
                            <tr key={index} className="text-center">
                                <td className="py-2 px-3 border-b">{test.name}</td>
                                <td className="py-2 px-3 border-b">{test.date}</td>
                                <td className="py-2 px-3 border-b">{test.time}</td>
                                <td className="py-2 px-3 border-b">{test.status}</td>
                                <td className="py-2 px-3 border-b">{test.result}</td>
                                <td className="py-2 px-3 border-b">
                                    <button
                                        onClick={() => onViewDetails(test)}
                                        className="text-blue-500 border bg-blue-100 rounded-full">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <p>Row per page:</p>
                <select className="px-2 py-2 border border-gray-300 rounded-md">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </select>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md">Prev</button>
                    <button className="px-4 py-2 border border-gray-300  bg-blue-500 rounded-md">1</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md">2</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md">3</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md">4</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md">5</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md">6</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md">Next</button>
                </div>
            </div>
        </div>
    )
}


const TestResultDetails = ({ lab, results }: { lab: Lab; results: (Lab: Lab) => void }) => {
    return (
        <div className=" max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Tests Result Details</h2>

            {/* Result Details Card */}
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-4">Results details</h3>
                <hr className="border-t border-gray-300 my-4" />


                <div className="mb-4">
                    <p className="font-semibold">Test Name:</p>
                    <p className="text-gray-700">{lab.name}</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />


                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="font-semibold">Date Conducted:</p>
                        <p className="text-gray-700">October 10, 2024</p>
                    </div>
                    <div>
                        <p className="font-semibold">Result Summary:</p>
                        <ul className="text-gray-700 list-disc list-inside">
                            {lab?.testSummary?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            <li>WBC: 6.0 x10^9/L (Normal)</li>
                            <li>RBC: 4.8 x10^12/L (Normal)</li>
                            <li>Hemoglobin: 14 g/dL (Normal)</li>
                        </ul>



                    </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="mb-4">
                    <p className="font-semibold">Interpretation:</p>
                    <p className="text-gray-700">Your results are within the normal range. Please consult with your doctor for a full analysis.</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />


                <div className="flex justify-center">
                    <button
                        onClick={() => results(lab)}
                        className="w-full max-w-xs bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-blue-700"
                    >
                        Download Test
                    </button>
                </div>
            </div>
        </div>
    );
};