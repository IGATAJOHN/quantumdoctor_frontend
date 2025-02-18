import React from 'react';

export default function RegistrationComplete() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffafb] p-4">
        <div className="w-full max-w-[320px] sm:max-w-[384px] text-center">
          <div className="mb-6 sm:mb-8">
            <div className="w-10 h-12 sm:w-12 sm:h-14 mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#004ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">Your Application is Under Review!</h2>
            <p className="text-sm sm:text-base text-[#3b392d]">
              Thank you for registering! Our team is currently reviewing your details and documents.
              You&apos;ll receive a notification once your account is approved. This process may take 24-48 hours.
            </p>
          </div>
          <p className="text-sm sm:text-base">
            Need assistance?{' '}
            <a href="#" className="text-[#004ba8] underline">Contact Support</a>.
          </p>
        </div>
      </div>
    )
  }

