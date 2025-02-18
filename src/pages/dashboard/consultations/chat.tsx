'use client'

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Download, PaperclipIcon, SendHorizontal } from 'lucide-react'
import { useState } from "react"

interface Message {
  id: number
  content: string
  sender: 'user' | 'doctor'
  timestamp: string
  attachment?: {
    name: string
    size: string
    date: string
  }
}

const ChatDialogInterface = () => {
  const [message, setMessage] = useState("")
//   const [attachment, setAttachment] = useState<File | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Dolor sit amet, consectetur adipiscing elit. Hendrerit vulputate viverra commodo tincidunt",
      sender: "doctor",
      timestamp: "5min ago"
    },
    {
      id: 2,
      content: "Can you send the file of Martins UX case study and the link to wireframe ?",
      sender: "doctor",
      timestamp: "5min ago"
    },
    {
      id: 3,
      content: "Yes. Here it is",
      sender: "user",
      timestamp: "Now"
    },
    {
      id: 4,
      content: "",
      sender: "user",
      timestamp: "Now",
      attachment: {
        name: "Martins UX case study",
        size: "2.38 KB",
        date: "22 JUN 2022"
      }
    },
    {
      id: 5,
      content: "Thank you 🙂",
      sender: "doctor",
      timestamp: "5min ago"
    },
    {
      id: 6,
      content: "You are welcome 😊",
      sender: "user",
      timestamp: "Now"
    }
  ])

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 bg-pink-100">
            <AvatarImage src="/placeholder.svg" alt="Monday James" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Monday James</h2>
            <p className="text-sm text-muted-foreground">Oncologist</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-4",
                message.sender === "user" ? "bg-quantum-blue/20 text-foreground" : "bg-quantum-blue text-white"
              )}
            >
              {message.content && <p className="text-sm">{message.content}</p>}
              
              {message.attachment && (
                <div className="bg-background rounded-md p-3 mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded">
                      <PaperclipIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{message.attachment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.attachment.size} • {message.attachment.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="p-4 border-t">
        <div className="grid grid-cols-12 space-x-2 w-full">
          <Button 
            variant="outline" 
            size="icon"
            className="col-span-1"
        >
            <PaperclipIcon className="w-4 h-4" />
          </Button>
          <div className="col-span-10">
            <Input 
                    placeholder="Enter your message" 
                    className="w-full" 
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setMessage && setMessages([...messages, {
                        id: messages.length + 1,
                        content: message,
                        sender: "user",
                        timestamp: "Now"
                    }])}
                />
          </div>
          <Button 
            variant={message.length > 0 ? "primary" : "outline"} 
            size="icon"
            className="col-span-1"
            disabled={message.length === 0}
        >
            <SendHorizontal
                className="w-4 h-4"
            />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ChatDialogInterface;