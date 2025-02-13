import React from 'react';

interface Step {
  name: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-72 flex flex-col gap-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-8 h-8 relative">
            <div className={`w-8 h-8 absolute rounded-full ${index <= currentStep ? 'bg-[#004ba8]' : 'bg-[#b0b0ab]'}`} />
            <div className="w-4 h-4 absolute left-[8px] top-[8px] bg-[#fffafb] rounded-full" />
          </div>
          <div className={`text-center text-base font-normal font-['Inter'] ${index <= currentStep ? 'text-[#3b392d]' : 'text-[#b0b0ab]'}`}>
            {step.name}
          </div>
        </div>
      ))}
    </div>
  )
}

