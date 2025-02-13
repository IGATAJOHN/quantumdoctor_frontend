import React from 'react';
import MobileHeader from './MobileHeader';

interface Step {
  name: string
}

interface SidebarProps {
  steps: Step[]
  currentStep: number
}

export default function Sidebar({ steps, currentStep }: SidebarProps) {
  return (
    <>
      <MobileHeader currentStep={currentStep} totalSteps={steps.length} />
      <div className="hidden md:inline-flex w-64 md:w-96 min-h-screen px-4 md:px-12 pt-8 md:pt-12 pb-24 md:pb-96 bg-[#f5f8fc] flex-col justify-start items-start gap-4 md:gap-6">
        <img className="w-12 h-12 md:w-14 md:h-14" src="/images/logo.png" alt="Logo" />
        <div className="text-center text-[#3b392d] text-lg md:text-xl font-medium font-['Inter']">Registration Form</div>
        <div className="w-full md:w-72 flex flex-col gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-4">
              <div className="w-6 h-6 md:w-8 md:h-8 relative">
                <div className={`w-6 h-6 md:w-8 md:h-8 absolute rounded-full ${index <= currentStep ? 'bg-[#004ba8]' : 'bg-[#b0b0ab]'}`} />
                <div className="w-3 h-3 md:w-4 md:h-4 absolute left-[6px] top-[6px] md:left-[8px] md:top-[8px] bg-[#fffafb] rounded-full" />
              </div>
              <div className={`text-center text-sm md:text-base font-normal font-['Inter'] ${index <= currentStep ? 'text-[#3b392d]' : 'text-[#b0b0ab]'}`}>
                {step.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

