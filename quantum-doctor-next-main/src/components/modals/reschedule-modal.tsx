'use client';
import React from 'react';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (date: Date, time: string) => void;
}

export default function RescheduleModal({ isOpen, onClose, onReschedule }: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedHour, setSelectedHour] = useState("02");
  const [selectedMinute, setSelectedMinute] = useState("51");
  const [selectedPeriod, setSelectedPeriod] = useState("PM");

  const handleReschedule = () => {
    if (selectedDate) {
      const timeString = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
      onReschedule(selectedDate, timeString);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gray-800 font-normal">Reschedule Consultation</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-gray-800 text-sm font-medium">Pick a date</label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-800 text-sm font-medium">Pick a time</label>
            <div className="flex gap-2 ">
              <Select  value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent className="text-gray-800 text-sm font-medium">
                  {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((hour) => (
                    <SelectItem key={hour} value={hour}>
                   <p className="text-gray-800 text-sm font-medium"> {hour} </p>  
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent >
                  {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map((minute) => (
                    <SelectItem className="text-gray-800" key={minute} value={minute}>
                    <p className="text-gray-800 text-sm font-medium"> {minute}</p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[70px] text-gray-80">
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent className="text-gray-800">
                  <SelectItem  value="AM"><p className="text-gray-800 text-sm font-medium">AM</p></SelectItem>
                  <SelectItem value="PM"><p className="text-gray-800 text-sm font-medium">PM</p></SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button onClick={handleReschedule} className="w-full bg-[#004ba8]">
          Reschedule
        </Button>
      </DialogContent>
    </Dialog>
  );
}

