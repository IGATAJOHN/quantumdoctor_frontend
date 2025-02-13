import React from 'react'
import { CheckCircleIcon, CalendarIcon, UserIcon } from 'lucide-react'

export default function Overview() {
  const stats = [
    { title: 'Completed Consultations', value: 12, icon: CheckCircleIcon },
    { title: 'Upcoming Appointments', value: 10, icon: CalendarIcon },
    { title: 'Patient Requests', value: 18, icon: UserIcon },
  ]

  return (
    <div className="mt-8">
      <h2 className="text-[#3b392d] text-xl font-medium mb-4">Overview</h2>
      <div className="grid grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.title} className="h-20 px-3 py-3.5 bg-[#fffafb] rounded-lg border border-[#d0cfcc] flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#004ba8]" />
              </div>
              <div>
                <p className="text-[#626157] text-xl font-medium">{stat.value}</p>
                <p className="text-[#626157] text-sm">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

