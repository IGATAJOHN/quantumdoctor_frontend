import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import Image from 'next/image';

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
    <div className="relative">
      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-blue-600 to-blue-800 pb-20 pt-10">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/50" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Your Health, <br />
                <span className="text-blue-200">Powered by AI</span>
              </h1>
              <p className="mt-6 text-lg text-blue-100">
                Experience the future of healthcare with our AI-powered platform. Get personalized health insights, connect with doctors, and manage your health journey seamlessly.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={ROUTES.PUBLIC.SIGNUP}
                  className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="rounded-full bg-blue-700 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative mt-16 lg:mt-0">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="relative aspect-[4/3] rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20" />
                  {/* Add your hero image here */}
                  <div className="absolute inset-0 rounded-2xl bg-grid-white/[0.025] bg-[size:20px_20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div id="features" className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your health
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform combines cutting-edge AI technology with healthcare expertise to provide you with the best possible care.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-4 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to take control of your health?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
              Join thousands of users who have already transformed their healthcare experience with Quantum Doctor.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={ROUTES.PUBLIC.SIGNUP}
                className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default Home;
