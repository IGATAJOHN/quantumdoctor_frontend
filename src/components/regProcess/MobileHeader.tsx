import React from 'react';

interface MobileHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function MobileHeader({ currentStep, totalSteps }: MobileHeaderProps) {
  return (
    <div className="md:hidden w-full bg-[#f5f8fc] p-4">
      <div className="flex items-center justify-between">
        <img className="w-10 h-10" src="/images/logo.png" alt="Logo" />
        <div className="text-[#3b392d] text-sm font-medium">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>
      <div className="mt-4 w-full bg-[#e0e0e0] h-2 rounded-full">
        <div 
          className="bg-[#004ba8] h-2 rounded-full" 
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

