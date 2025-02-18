import React from 'react';

export default function UpcomingConsultations() {
    const consultations = [
      { id: 1, name: 'Esther Azima', date: '20th Nov, 2024', time: '9:00 - 10:00pm' },
      { id: 2, name: 'John Doe', date: '21st Nov, 2024', time: '2:00 - 3:00pm' },
      { id: 3, name: 'Jane Smith', date: '22nd Nov, 2024', time: '11:00 - 12:00pm' },
    ]
  
    return (
      <div>
        <h2 className="text-[#3b392d] text-xl font-medium mb-6">Upcoming Consultations (3)</h2>
        <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-4 space-y-6">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="flex items-start gap-3.5">
              <img className="w-10 h-10 rounded" src={`https://via.placeholder.com/40x40?text=${consultation.name[0]}`} alt={consultation.name} />
              <div>
                <p className="text-[#3b392d] text-base mb-3.5">{consultation.name}</p>
                <div className="w-80 px-3.5 py-1.5 bg-stone-100 rounded-lg flex justify-between items-center">
                  <span className="text-[#3b392d] text-sm">{consultation.date}</span>
                  <span className="text-[#3b392d] text-sm">{consultation.time}</span>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full pt-4 pb-3.5 bg-[#f4f9fe] rounded-lg text-[#004ba8] text-sm">See all</button>
        </div>
      </div>
    )
  }