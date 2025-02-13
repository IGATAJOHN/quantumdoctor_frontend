import { Bell, Heart, Plus, ThermometerIcon } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/layouts/dashboard"

const DashboardPage = () => {
  return (
    <DashboardLayout>
        <div className="p-6 space-y-6 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          A snapshot of the essentials - consultations, to vitals, upcoming appointments, and test results.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Blood Test Result</p>
                <div className="text-sm text-muted-foreground">
                  20-10-2054 10:00 AM
                </div>
              </div>
              <Button size="sm">
                View result
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Malaria Test</p>
                <div className="text-sm text-muted-foreground">
                  20-10-2054 10:00 AM
                </div>
              </div>
              <Button size="sm">
                View result
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Appointments</CardTitle>
            <Bell className="w-5 h-5 text-red-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                Your video consultation with Dr. Ahmed Khan is just 1 hour away. Prepare any questions you have before your
                session.
              </p>
              <div className="border-t pt-2">
                <p className="text-sm">
                  Don&rsquo;t forget! Your&rsquo;ve got an appointment with Dr. Mark Wilson on October 20th at 11:30 AM.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Consultations</CardTitle>
            <Button size="icon" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                Your consultation with Dr. Sarah Lee went well! Review the doctor&rsquo;s notes and next steps to continue your
                care.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">Need to revisit a question? Schedule a follow-up consultation with just one click</p>
            </div>
            <div className="border-l-4 border-red-500 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                You&rsquo;ve got a new consultation with Dr. John Smith tomorrow at 10:00 AM. Make sure you&rsquo;re ready!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Vitals</CardTitle>
              <p className="text-sm text-muted-foreground">Weekly Summary</p>
            </div>
            <Button>Update Vitals</Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span className="text-sm font-medium">Heart Rate</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">98</span>
                    <span className="text-sm text-muted-foreground">bpm</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Normal</div>
                  <div className="mt-4 h-24 bg-gradient-to-t from-rose-100 to-transparent rounded-lg" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerIcon className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Temperature</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">35</span>
                    <span className="text-sm text-muted-foreground">°C</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Normal</div>
                  <div className="mt-4 h-24 bg-gradient-to-t from-purple-100 to-transparent rounded-lg" />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
            </div>
        </div>      
    </DashboardLayout>
  )
}

export default DashboardPage;