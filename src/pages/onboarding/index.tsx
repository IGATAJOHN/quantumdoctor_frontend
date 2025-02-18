import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react";

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(1); // min 1, max 10

    const steps = [
        {
            image: "/images/bro.svg",
            title: "Welcome to Quantum Doctor",
            description: "Effortlessly monitor your vital signs, connect with trusted medical professionals for consultations, and keep all your health records organized and accessible—all within a single, user-friendly app. Take control of your well-being with everything you need in one place.",
        },
        {
            image: "/images/onboarding-2.png",
            title: "Keep Your Health Data Up to Date",
            description: "Easily log your vitals like blood pressure, heart rate, and more. Stay on top of your health with personalized insights."
        },
        {
            image: "/images/onboarding-3.png",
            title: "Consult with Doctors from Anywhere",
            description: "Schedule audio or video consultations with medical experts tailored to your health needs."
        },
        {
            image: "/images/onboarding-4.png",
            title: "View Your Lab Results in Real-Time",
            description: "Get your test results directly in the app. Stay informed and share results with your doctor easily."
        },
        {
            image: "/images/onboarding-5.png",
            title: "Let Our AI Build Your Health Profile",
            description: "Enjoy a personalized health experience as our AI gathers your medical history, current medications, and lifestyle information for you. Get tailored doctor recommendations without lifting a finger."
        },
        {
            image: "/images/onboarding-6.png",
            title: "Unlock Predictive Health Insights",
            description: "Upload bloodwork and other health data to receive tailored insights and potential health risks."
        },
        {
            image: "/images/onboarding-7.png",
            title: "Get Matched with the Right Doctor",
            description: "Based on your health profile, we recommend doctors who specialize in your condition for accurate and effective consultations."
        },
        {
            image: "/images/onboarding-8.png",
            title: "Stay On Track with Personalized Reminders",
            description: "Receive timely reminders to update your vitals, schedule appointments, and stay engaged with your health."
        },
        {
            image: "/images/onboarding-9.png",
            title: "Your Data is Secure",
            description: "Quantum Doctor protects your personal and health data with advanced encryption and security measures."
        },
        {
            image: "/images/onboarding-10.png",
            title: "You’re Ready to Go!",
            description: "Start exploring Quantum Doctor, and take control of your health today."
        }
    ]

    const handleNext = () => {
        if (currentStep >= 1 && currentStep < 10) {
            setCurrentStep(currentStep + 1);
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1 && currentStep <= 10) {
            setCurrentStep(currentStep - 1);
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="flex flex-col md:flex-row w-full max-w-6xl mx-4 p-4 md:p-0 overflow-hidden shadow-lg md:h-[80vh]">
                {/* Left side with image */}
                <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-white">
                    <Image
                        src={steps[currentStep - 1].image}
                        alt={steps[currentStep - 1].title}
                        width={400}
                        height={400}
                        className={"object-contain h-auto " + (currentStep === 1 ? "md:w-3/4" : "md:w-full")}
                    />
                </div>

                {/* Right side with content */}
                <div className="w-full md:w-1/2 p-8 bg-white flex flex-col">
                    {/* Top navigation */}
                    <div className="flex justify-between items-center mb-16">
                        {/* Progress dots */}
                        <div className="flex items-center gap-2">
                            {steps.map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <div 
                                        className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                            index + 1 === currentStep 
                                                ? "bg-quantum-blue" 
                                                : "bg-gray-200"
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Skip button */}
                        <Button 
                            variant="outline" 
                            className="text-quantum-blue border-quantum-blue"
                            onClick={() => setCurrentStep(10)}
                        >
                            Skip
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        { steps.map((step, index) => {
                            return currentStep === index + 1 && (
                                <div key={index} className="space-y-4">
                                    <h1 className="text-3xl font-semibold text-gray-900">
                                        {step.title}
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between items-center mt-16">
                        {currentStep > 1 ? (
                            <Button 
                                variant="outline"
                                className="text-quantum-blue border-quantum-blue"
                                onClick={handlePrevious}
                            >
                                Previous
                            </Button>
                        ) : <div />}
                        
                        {currentStep < 10 && (
                            <Button 
                                className="bg-quantum-blue text-white hover:bg-blue-700"
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Onboarding