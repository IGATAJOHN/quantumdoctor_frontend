'use client'

import BookingConfirmationModal from "@/components/modals/booking-confirmation-modal"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/layouts/dashboard"
import { Star } from 'lucide-react'
import Image from "next/image"
import * as React from "react"

const ScheduleDoctorPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = React.useState<number | null>(null)

  const doctors = Array(8).fill({
    name: "Roseline Michael",
    specialty: "Oncologist",
    rating: 4,
    available: true,
    image: "/placeholder.svg?height=80&width=80"
  })

  return (
    <DashboardLayout>
    <div className="container w-full h-full overflow-hidden overflow-y-scroll mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Schedule a doctor</h1>
      <p className="text-muted-foreground mb-8">Pick a doctor, a perfect time and date for your appointment</p>
      
      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-6">
          <Input 
            type="search" 
            placeholder="Search doctor" 
            className="max-w-xl"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {doctors.map((doctor, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-colors ${selectedDoctor === index ? 'border-quantum-blue border-2' : ''}`}
                onClick={() => setSelectedDoctor(index)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array(5).fill(null).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < doctor.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm">Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Date and Time</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm mb-2">Pick a date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />
              </div>
              
              <div>
                <h3 className="text-sm mb-2">Pick a time</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="14" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 12}, (_, i) => i + 9).map(hour => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="30" />
                    </SelectTrigger>
                    <SelectContent>
                      {['00', '15', '30', '45'].map(minutes => (
                        <SelectItem key={minutes} value={minutes}>
                          {minutes}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>


                </div>

                <div className="w-full mt-4">
                    <BookingConfirmationModal />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default ScheduleDoctorPage;