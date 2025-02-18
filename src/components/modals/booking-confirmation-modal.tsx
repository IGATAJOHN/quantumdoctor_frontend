'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Calendar, Clock, Star } from 'lucide-react'
import Image from "next/image"
import BookingSuccessModal from './booking-success-modal'

// interface BookingConfirmationModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

const BookingConfirmationModal = () => {

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button 
                className="w-full" size="lg"
            >
                Proceed
            </Button>
        </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Booking confirmation</DialogTitle>
          <div className="text-sm text-primary">
            <span>Schedule a doctor</span> {'>'}
            <span className="font-semibold text"> Confirm booking</span>
          </div>
        </DialogHeader>
        
        <div className="mt-4 rounded-lg border">
          <div className="grid md:grid-cols-[250px,1fr]">
            <div className="bg-quantum-blue p-6 text-white rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Roseline Michael"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Roseline Michael</h3>
                  <p className="text-primary/80">Oncologist</p>
                </div>
                <div className="flex items-center space-x-1">
                  {Array(5).fill(null).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'fill-primary' : ''}`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-primary/80">Available</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between group">
                  <div className="flex gap-3">
                    <Calendar className="w-6 h-6 text-foreground" />
                    <div>
                      <p className="text-sm text-foreground">Scheduled Date</p>
                      <p className="font-semibold text-lg">24 November 2024</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between group">
                  <div className="flex gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-foreground">Scheduled Time</p>
                      <p className="font-semibold text-lg">14:30 PM</p>
                    </div>
                  </div>
                  {/* <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-4 h-4" />
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-0">
          <DialogClose asChild>
            <Button 
                variant="outline" 
                className="flex-1"
            >
                Back
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button asChild>
                <BookingSuccessModal
                    appointmentDate='24 November 2024'
                    appointmentTime='14:45 PM'
                />
            </Button>
          </DialogClose>
          {/* <Button 
            className="flex-1"
            onClick={() => handleSubmit}
        >
            Confirm booking
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingConfirmationModal