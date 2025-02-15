import React, { useState } from 'react'

interface TermsAndConditionsProps {
  onNext: () => void
  onPrevious: () => void
}

export default function TermsAndConditions({ onNext, onPrevious }: TermsAndConditionsProps) {
  const [agreed, setAgreed] = useState(false)

  const termsText = `
    You will provide accurate and truthful information during registration and document uploads.
    Professional Credentials
    All documents submitted (e.g., Medical License, Certificates) are authentic and valid.
    Confidentiality
    You will maintain strict confidentiality regarding patient information in accordance with medical ethics and privacy laws.
    Platform Usage
    The platform will be used solely for professional medical consultations and related activities.
    Consultation Fees
    Fees for consultations must be transparently set and adhered to as displayed in your profile.
    Patient Interaction
    You agree to respond to patient requests in a timely and professional manner.
    Prohibited Actions
    You will not engage in fraudulent activities, provide false diagnoses, or solicit patients for non-professional purposes.
    Compliance with Laws
    All services provided must comply with relevant medical and legal regulations.
    Document Verification
    You acknowledge that uploaded documents will be reviewed by the platform for authenticity.
    Account Security
    You are responsible for maintaining the security of your login credentials and account.
    Data Ownership
    Patient records and data remain confidential and cannot be shared outside the platform without explicit consent.
    Service Termination
    The platform reserves the right to suspend or terminate your account for violations of these terms.
    Liability
    The platform is not liable for medical decisions made during consultations; you retain full professional responsibility.
    Dispute Resolution
    Any disputes arising from your use of the platform will be resolved through mediation or arbitration, as specified.
    Modifications
    The platform may update these Terms & Conditions, and continued use implies acceptance of the revised terms.
  `

  const handleRegister = () => {
    if (agreed) {
      onNext()
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="h-96 overflow-y-auto p-4 bg-white rounded-lg border border-[#d0cfcc]">
        <p className="text-[#626157] text-sm whitespace-pre-line">{termsText}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-6 h-6"
        />
        <label htmlFor="agree" className="text-[#141204] text-base">
          I have read & I agree to all the Terms & Conditions
        </label>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="w-32 h-12 px-5 py-4 bg-gray-200 rounded-lg text-center text-[#3b392d] text-base font-medium"
        >
          Previous
        </button>
        <button
          onClick={handleRegister}
          disabled={!agreed}
          className={`w-32 h-12 px-5 py-4 rounded-lg text-center text-base font-medium ${
            agreed ? 'bg-[#004ba8] text-[#fffafb]' : 'bg-[#d0cfcc] text-[#626157]'
          }`}
        >
          Register
        </button>
      </div>
    </div>
  )
}

