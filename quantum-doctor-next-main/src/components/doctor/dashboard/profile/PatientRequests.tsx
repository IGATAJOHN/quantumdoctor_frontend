import React from 'react'
export default function PatientRequests() {
    const requests = [
      { id: 1, name: 'Reuben Sampson', time: '2min' },
      { id: 2, name: 'Jane Doe', time: '5min' },
      { id: 3, name: 'John Smith', time: '10min' },
    ]
  
    return (
      <div>
        <h2 className="text-[#3b392d] text-xl font-medium mb-6">Patient Requests</h2>
        <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-4 space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="flex justify-between items-end">
              <div className="flex items-start gap-3.5">
                <img className="w-12 h-12 rounded-full" src={`https://via.placeholder.com/50x50?text=${request.name[0]}`} alt={request.name} />
                <div>
                  <p className="text-[#3b392d] text-base mb-3.5">{request.name} sent you a Consultation Request</p>
                  <div className="flex gap-5">
                    <button className="w-24 h-8 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium">Accept</button>
                    <button className="w-24 h-8 bg-stone-100 rounded-lg border border-[#d0cfcc] text-[#626157] text-base font-medium">Decline</button>
                  </div>
                </div>
              </div>
              <span className="text-[#626157] text-sm">{request.time}</span>
            </div>
          ))}
          <button className="w-full pt-4 pb-3.5 bg-[#f4f9fe] rounded-lg text-[#004ba8] text-sm">See all</button>
        </div>
      </div>
    )
  }
  
  