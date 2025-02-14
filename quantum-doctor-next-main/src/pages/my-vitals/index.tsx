import { Droplets, Heart, ThermometerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/DashboardLayout"
import TrendsChart from '@/components/common/TrendsChart'
import HealthInsightCard from "@/components/common/health-insight-cards"

const insights = [
  {
    id: 1,
    title: 'Blood Pressure Insight',
    description:
      'Your blood pressure readings have been consistently above the normal range for the past 2 weeks. Consider scheduling a consultation with a cardiologist to discuss medication adjustments or lifestyle changes.',
    color: 'bg-red-400',
    buttonText: 'Book a Consultation',
  },
  {
    id: 2,
    title: 'Consistent Blood Pressure',
    description:
      'Your blood pressure readings have remained steady at 120/80 mmHg for the last two weeks. Great job managing your stress and diet!',
    color: 'bg-green-400',
  },
  {
    id: 3,
    title: 'Healthy Heart Rate',
    description:
      'Your resting heart rate has improved and is now within a healthy range (60-70 bpm). Keep maintaining your regular exercise routine to sustain this progress.',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Rapid Weight Gain',
    description:
      'You’ve gained 6 lbs in the past month. This may indicate water retention or other underlying issues. A consultation with your doctor may help identify the cause.',
    color: 'bg-orange-400',
    buttonText: 'Book an Appointment',
  },
];

const MyVitalsPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto h-full overflow-y-auto w-full">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">My Vitals</h1>
            <p className="text-muted-foreground">
              This tab serves as the entry point for managing and tracking vitals
            </p>
          </div>
          <Button>Update Vitals</Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History and Trends</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <Heart className="w-4 h-4 text-rose-500" />
                    </div>
                    <span className="font-medium">Heart Rate</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">98</span>
                    <span className="text-muted-foreground">bpm</span>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs bg-rose-100 text-rose-700 mt-2">
                    Normal
                  </div>
                  <div className="mt-4 h-24 bg-gradient-to-t from-rose-100 to-transparent rounded-lg" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ThermometerIcon className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="font-medium">Temperature</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">35</span>
                    <span className="text-muted-foreground">°C</span>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700 mt-2">
                    Normal
                  </div>
                  <div className="mt-4 h-24 bg-gradient-to-t from-purple-100 to-transparent rounded-lg" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="font-medium mb-1">Body Mass Index (BMI)</div>
                    <div className="text-3xl font-bold">24.9</div>
                    <div className="inline-flex px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 mt-2">
                      You're Healthy
                    </div>
                  </div>
                  <div className="relative h-3 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full">
                    <div className="absolute -top-1 left-[50%] w-2 h-2 bg-black rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <Droplets className="w-4 h-4 text-cyan-500" />
                    </div>
                    <span className="font-medium">Blood Pressure</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">102</span>
                    <span className="text-xl text-muted-foreground">/</span>
                    <span className="text-xl">72</span>
                    <span className="text-muted-foreground">mmHg</span>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs bg-cyan-100 text-cyan-700 mt-2">
                    Normal
                  </div>
                  <div className="mt-4 h-24 bg-gradient-to-t from-cyan-100 to-transparent rounded-lg" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M2 12h2" />
                        <path d="M14 12h8" />
                        <path d="M7 12a5 5 0 0 1 5-5" />
                        <path d="M7 12a5 5 0 0 0 5 5" />
                      </svg>
                    </div>
                    <span className="font-medium">Blood Oxygen</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">90</span>
                    <span className="text-muted-foreground">%</span>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700 mt-2">
                    Normal
                  </div>
                  <div className="mt-4 h-24 bg-gradient-to-t from-orange-100 to-transparent rounded-lg" />
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center relative z-10">
                  <div className="mb-4">
                    <img
                      alt="Quantum Doctor Logo"
                      className="mx-auto h-16"
                      src="/images/logo-horizontal.svg"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">We are committed to saving lives</p>
                  <Button className="w-full">Book an Appointment</Button>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-tr-full -mb-12 mr-16" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -mt-12 -ml-16" />
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="history">History and trends content
            <TrendsChart />
            <div className="mt-4 bg-gray-100 p-2 rounded-lg text-gray-700">
              Blood pressure dropped by 5 mmHg since last month
            </div>
          </TabsContent>
          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {insights.map((insight) => (
                <HealthInsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MyVitalsPage;