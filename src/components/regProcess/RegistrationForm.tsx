'use client'

import React, { useState } from 'react'
import PersonalDetails from './steps/PersonalDetails'
import DocumentUpload from './steps/DocumentUpload'
import TermsAndConditions from './steps/TermsAndConditions'
import RegistrationComplete from './steps/RegistrationComplete'
import Sidebar from './Sidebar'
import SuccessModal from './SuccessModal'

const steps = [
  { name: 'Personal Details', component: PersonalDetails },
  { name: 'Document Upload', component: DocumentUpload },
  { name: 'Terms & Conditions Agreement', component: TermsAndConditions },
]

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSuccessModal(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return <RegistrationComplete />
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fffafb]">
      <Sidebar steps={steps} currentStep={currentStep} />
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-center text-[#3b392d] text-xl font-medium font-['Inter'] mb-4 md:mb-6">
          {steps[currentStep].name}
        </h1>
        <hr className="w-full border-[#cfd4dc] mb-4 md:mb-6" />
        <CurrentStepComponent onNext={handleNext} onPrevious={handlePrevious} />
      </main>
      {showSuccessModal && <SuccessModal onClose={handleModalClose} />}
    </div>
  )
}

