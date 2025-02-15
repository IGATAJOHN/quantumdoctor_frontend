'use client'

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog"
// import Lottie from "lottie-react"
// import SuccessAnimation from "../animations/success-animation"
import { useRouter } from "next/router"

interface BookingSuccessModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
  appointmentTime: string
  appointmentDate: string
}

// declare const document;

const BookingSuccessModal = ({
  appointmentTime = "14:30 PM",
  appointmentDate = "24 November 2024"
}: BookingSuccessModalProps) => {

    const router = useRouter();

    const handleViewBooking = () => {
        // Navigate to the booking details page
        // or trigger a callback function to open the booking details modal
        router.push('/consultations');
    };

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button 
                className="flex-1" size="lg"
            >
              Confirm Booking
            </Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4 py-8">
            <div className="w-36 h-36">
              {/* {SuccessAnimation && document && (
                // <Lottie
                //   animationData={SuccessAnimation}
                //   loop={false}
                //   autoplay={true}
                // />
              )} */}
            </div>
            
            <h2 className="text-2xl font-bold">
              Confirmed
            </h2>
            
            <p className="text-foreground text-center max-w-[250px]">
              You have successfully booked an appointment for
            </p>
            
            <p className="font-semibold text-quantum-blue">
              {appointmentTime}, {appointmentDate}
            </p>
            
            <DialogClose asChild>
                <Button className="w-full mt-4" size="lg"
                    onClick={() => handleViewBooking}
                >
                    View Booking
                </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>   
)
}
export default BookingSuccessModal;