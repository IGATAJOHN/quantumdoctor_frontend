import React from 'react'
import { CameraIcon } from 'lucide-react'

export default function PersonalInfoTab() {
  return (
    <div className="flex flex-col items-start gap-6">
      <div className="relative w-28 h-28">
        <img
          className="w-28 h-28 rounded-full"
          src="/images/doctor.png"
          alt="Profile"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#004ba8] bg-opacity-25 rounded-full">
          <CameraIcon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="w-full max-w-2xl space-y-8">
        <FormField label="Fullname" value="Wilson Akintunde Ajayi" />
        <FormField label="Bio" value="I am Dedicated to Excellence" />
        <FormField label="Years of Experience" value="10 years" />
        <FormField label="Area of Specialization" value="Optomology" />
      </div>
    </div>
  )
}

interface FormFieldProps {
  label: string
  value: string
}

function FormField({ label, value }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#344053] text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc] text-[#626157] text-base"
      />
    </div>
  )
}

