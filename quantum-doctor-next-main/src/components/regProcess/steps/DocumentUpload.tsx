import React, { useState } from 'react'

interface DocumentUploadProps {
  onNext: () => void
  onPrevious: () => void
}

export default function DocumentUpload({ onNext, onPrevious }: DocumentUploadProps) {
  const [documents, setDocuments] = useState({
    medicalLicense: null,
    schoolCertificate: null,
    nyscCertificate: null,
  })

  const handleFileChange = (documentType: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [documentType]: file }))
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <p className="text-center text-[#3b392d] text-lg font-normal">
        Upload the necessary documents to confirm your medical qualifications.
      </p>
      {['medicalLicense', 'schoolCertificate', 'nyscCertificate'].map((docType) => (
        <div key={docType} className="flex flex-col gap-2">
          <label className="text-[#344053] text-sm font-medium">
            {docType === 'medicalLicense' ? 'Medical License' :
             docType === 'schoolCertificate' ? 'Medical School Certificate' :
             'NYSC Discharge Certificate'}
          </label>
          <div className="w-full h-28 relative bg-white rounded-lg border border-[#d0cfcc]">
            {documents[docType] ? (
              <div className="flex items-center justify-between p-4">
                <span className="text-[#3b392d] text-base">{documents[docType].name}</span>
                <button
                  onClick={() => handleFileChange(docType, null)}
                  className="text-[#004ba8] text-base font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                <span className="text-[#3b392d] text-base">Upload Document</span>
                <span className="text-[#626157] text-base">or Drag and Drop</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(docType, e.target.files?.[0] || null)}
                />
              </label>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="w-32 h-12 px-5 py-4 bg-gray-200 rounded-lg text-center text-[#3b392d] text-base font-medium"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="w-32 h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-center text-[#fffafb] text-base font-medium"
        >
          Next
        </button>
      </div>
    </div>
  )
}

