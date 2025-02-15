
import { useState } from 'react';

const RecordingInterface = () => {
    const [step, setStep] = useState(1);
    const handlePrepareToSend = () => setStep(2.5);
    const handleConfirmSend = () => setStep(3);


    const handleStartRecording = () => setStep(2);
    const handleRestart = () => setStep(1);
    const handleSend = () => setStep(3);
    const handleShowVideoPreview = () => setStep(2.6);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="w-full bg-white p-4 shadow-md flex justify-between items-center">
                <div className="text-xl font-bold text-blue-600 flex items-center">
                    <img src="/images/Group 6 (2).png" alt="Logo" className="h-8 w-15 mr-2" />

                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                        src="/images/Ellipse 1 (2).png"
                        alt="User Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>
            <main className="flex flex-grow justify-center items-center">

                <div className="bg-white rounded-lg shadow-lg w-[400px] lg:w-[500px] h-auto p-8 w-96">

                    {step === 1 && (

                        <div className="flex flex-col items-center">
                            <div className="bg-gray-200 rounded-full p-4 mb-6">
                                <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center">
                                    <div className="bg-red-700 rounded-full w-8 h-8"></div>
                                </div>
                            </div>
                            <button
                                onClick={handleStartRecording}
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            >
                                Start Recording
                            </button>

                        </div>


                    )}


                    {step === 2 && (
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-200 rounded-lg w-full p-4 flex items-center justify-between mb-6">
                                <button className="text-blue-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="w-6 h-6"
                                    >
                                        <path d="M9.536 3.707 5.343 8l4.193 4.293.707-.707L6.757 8l3.486-3.586-.707-.707z" />
                                    </svg>
                                </button>
                                <div className="flex-grow h-1 bg-gray-400 mx-2"></div>
                                <span className="text-gray-600">0:05</span>
                            </div>
                            <button
                                className="px-6 py-2 mb-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            >
                                Speed
                            </button>
                            <div className="flex w-full justify-between">
                                <button
                                    onClick={handleRestart}
                                    className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50"
                                >
                                    Restart
                                </button>
                                <button
                                    onClick={handlePrepareToSend}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                                >
                                    Send
                                </button>


                            </div>
                        </div>
                    )}
                    {step === 2.5 && (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <div className="flex flex-col items-center justify-center p-8 rounded-lg  w-80">
                                <div className=" rounded-full p-6 mb-6">
                                    <div className="bg-red-500 animate-pulse rounded-full w-24 h-16 flex items-center justify-center">
                                        <img
                                            src="/images/Group 63.png"
                                            alt="Recording Sign"
                                            className="w-24 h-24"
                                        >

                                        </img>
                                    </div>
                                </div>
                                <button
                                    onClick={handleShowVideoPreview}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                                >
                                    Start Recording
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2.6 && (
                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="flex flex-col items-center bg-white p-9 rounded-lg w-400px lg:w-[500px]">
                                <div className="w-full mb-6">
                                    <iframe
                                        width="100%"
                                        height="200px"
                                        src="https://www.youtube.com/embed/BHACKCNDMW8"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-md"
                                    ></iframe>
                                </div>
                                <div className="flex justify-between w-full">
                                    <button
                                        onClick={handleRestart}
                                        className="px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50"
                                    >
                                        Restart
                                    </button>
                                    <button
                                        onClick={handleConfirmSend}
                                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-200 rounded-full p-4 mb-6">
                                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="white"
                                        viewBox="0 0 16 16"
                                        className="w-8 h-8"
                                    >
                                        <path d="M6 10.793l-3.146-3.147-.708.707L6 12.207l8-8-.708-.707L6 10.793z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Recording Sent
                            </h2>
                            <p className="text-gray-600 text-center">
                                Your recording has been successfully sent. Thank you!
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div >
    );
};

export default RecordingInterface;
