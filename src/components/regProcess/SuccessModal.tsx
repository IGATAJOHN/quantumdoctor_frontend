import React, { useEffect, useState } from 'react'

interface SuccessModalProps {
  onClose: () => void
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 1
      })
    }, 30)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-[320px] sm:max-w-[384px] h-64 sm:h-72 relative bg-[#fffafb] rounded-lg">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-6 sm:gap-8 w-full px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="30" stroke="#004ba8" strokeWidth="4"/>
              <path d="M20 32L28 40L44 24" stroke="#004ba8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-center text-[#141204] text-xl sm:text-2xl font-medium font-['Inter']">Registration Successful</div>
        </div>
        <div 
          className="absolute bottom-0 left-0 h-2.5 bg-[#004ba8] rounded-bl-lg rounded-br-lg transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  )
}

