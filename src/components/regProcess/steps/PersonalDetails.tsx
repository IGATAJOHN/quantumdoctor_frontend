import React, { useState } from 'react'


type PersonalDetailsProps = {

    onNext: () => void
  
    onPrevious: () => void
  
  }
  

export default function PersonalDetails({ onNext }: PersonalDetailsProps) {
  const [fullName, setFullName] = useState('')
  const [experience, setExperience] = useState('')
  const [specialization, setSpecialization] = useState('')

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5">
          <span className="text-[#d91f11] text-base">*</span>
          <span className="text-[#344053] text-sm font-medium">Fullname</span>
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter Full Name"
          className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc] text-base"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5">
          <span className="text-[#d91f11] text-base">*</span>
          <span className="text-[#344053] text-sm font-medium">Years of Experience</span>
        </label>
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter Years of Experience"
          className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc] text-base"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5">
          <span className="text-[#d91f11] text-base">*</span>
          <span className="text-[#344053] text-sm font-medium">Area of Specialization</span>
        </label>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc] text-base"
        >
          <option value="">Choose Area</option>
          <option value="general">General Practice</option>
          <option value="cardiology">Cardiology</option>
          <option value="neurology">Neurology</option>
          <option value="pediatrics">Pediatrics</option>
        </select>
      </div>
      <button
        onClick={onNext}
        className="w-64 h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-center text-[#fffafb] text-base font-medium mx-auto"
      >
        Next
      </button>
    </div>
  )
}

