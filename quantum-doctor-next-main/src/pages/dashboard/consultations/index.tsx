import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Mic, Video } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DashboardLayout from "@/layouts/dashboard"
// import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
// import { DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
// import ChatInterface from "../chat-bot"
import ChatDialogInterface from "./chat"
import RecordingModal from "@/components/modals/recording-modal"

const ConsultationsPage = () => {
  const appointments = Array(4).fill({
    doctorName: "Roseline Michael",
    specialty: "Oncologist",
    date: "24 November 2024",
    time: "12:30 PM",
    image: "/placeholder.svg"
  })

  return (
    <DashboardLayout>
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Bookings</h1>
        <Tabs defaultValue="all" className="w-full sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={appointment.image} alt={appointment.doctorName} />
                    <AvatarFallback>RM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-semibold">{appointment.doctorName}</h2>
                      <span className="text-muted-foreground">({appointment.specialty})</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>Date of Appointment: <span className="font-semibold">{appointment.date}</span></p>
                      <p>Time of Appointment: <span className="font-semibold">{appointment.time}</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto space-x-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>Chat</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[400px] sm:w-[540px]">
                            <ChatDialogInterface />
                            {/* <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader> */}
                        </DialogContent>
                    </Dialog>
                    <RecordingModal 
                        type="audio"
                    />
                    <RecordingModal 
                        type="video"
                    />
                  {/* <Button variant="outline" className="w-full sm:w-auto space-x-2">
                    <Mic className="w-4 h-4" />
                    <span className="hidden sm:inline">Record a voice note</span>
                    <span className="sm:hidden">Voice note</span>
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto space-x-2">
                    <Video className="w-4 h-4" />
                    <span className="hidden sm:inline">Record a video</span>
                    <span className="sm:hidden">Video</span>
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hidden sm:inline-flex">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="hidden sm:inline-flex">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="hidden sm:inline-flex" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    </DashboardLayout>
  )
}

export default ConsultationsPage;