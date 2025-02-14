import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

const features = [
  {
    name: 'Virtual Consultations',
    description: 'Connect with healthcare professionals from the comfort of your home.',
    icon: '🏥',
  },
  {
    name: 'AI-Powered Health Assistant',
    description: 'Get instant health recommendations and insights powered by advanced AI.',
    icon: '🤖',
  },
  {
    name: 'Vital Monitoring',
    description: 'Track your health vitals and get personalized insights.',
    icon: '❤️',
  },
  {
    name: 'Lab Test Management',
    description: 'Book and manage your lab tests with ease.',
    icon: '🔬',
  },
  {
    name: 'Secure Health Records',
    description: 'Your medical records are stored securely and accessible anytime.',
    icon: '🔒',
  },
  {
    name: 'Smart Predictions',
    description: 'Get early warnings and predictions about potential health issues.',
    icon: '📊',
  },
];

const Home = () => {
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Hero section */}
        <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">Your Health,</span>
                    <span className="block text-blue-400">Powered by AI</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Experience the future of healthcare with our AI-powered platform. Get instant health insights, connect with doctors, and manage your health records - all in one place.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <div className="sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <Link
                          href="/auth/signup"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          Get Started
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                          href="/auth/login"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                        >
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="/images/hero-doctor.svg"
                    alt="Doctor illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="relative bg-white py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-blue-600 uppercase">Everything you need</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Comprehensive Healthcare Solutions
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              Our platform offers a complete suite of healthcare services, powered by advanced AI technology to provide you with the best possible care.
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg text-4xl">
                            {feature.icon}
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
