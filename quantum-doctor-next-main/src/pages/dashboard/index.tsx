import React, { useEffect, useState, useCallback } from 'react';
import {
  Bell,
  Heart,
  ThermometerIcon,
  Activity,
  Calendar,
  FileText,
  TrendingUp,
  Brain,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import apiClient from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';
import { toast } from 'sonner';

interface VitalsData {
  heart_rate: number;
  temperature: number;
  blood_pressure: string;
  blood_oxygen: number;
  last_updated: string;
}

interface TestResult {
  id: string;
  name: string;
  date: string;
  status: string;
}

interface Appointment {
  id: string;
  doctor_name: string;
  date: string;
  time: string;
  status: string;
}

interface HealthInsight {
  message: string;
  severity: 'info' | 'warning' | 'critical';
  recommendation: string;
}

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [vitals, setVitals] = useState<VitalsData | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [wsConnected, setWsConnected] = useState(false);

  // WebSocket connection for real-time vitals
  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/vitals`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setWsConnected(true);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'vitals_update') {
        setVitals(data.vitals);
      }
    };

    ws.onclose = () => {
      setWsConnected(false);
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        console.log('Attempting to reconnect...');
      }, 5000);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Fetch AI-powered health insights
  const fetchHealthInsights = useCallback(async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.VITALS.CHATBOT, {
        vitals: vitals
      });
      setInsights(response.data.insights);
    } catch (error) {
      console.error('Error fetching health insights:', error);
      toast.error('Failed to fetch health insights');
    }
  }, [vitals]);

  useEffect(() => {
    if (vitals) {
      fetchHealthInsights();
    }
  }, [vitals, fetchHealthInsights]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vitalsRes, testsRes] = await Promise.all([
          apiClient.get(API_ENDPOINTS.VITALS.GET_VITALS),
          apiClient.get(API_ENDPOINTS.LAB_TESTS.VIEW_ALL_RESULTS),
        ]);

        setVitals(vitalsRes.data);
        setTestResults(testsRes.data.slice(0, 3)); // Show only latest 3 results
      } catch (error: any) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      name: 'Heart Rate',
      value: vitals?.heart_rate || '--',
      unit: 'bpm',
      icon: Heart,
      color: 'text-red-500',
    },
    {
      name: 'Temperature',
      value: vitals?.temperature || '--',
      unit: '°C',
      icon: ThermometerIcon,
      color: 'text-orange-500',
    },
    {
      name: 'Blood Pressure',
      value: vitals?.blood_pressure || '--',
      unit: 'mmHg',
      icon: Activity,
      color: 'text-blue-500',
    },
    {
      name: 'Blood Oxygen',
      value: vitals?.blood_oxygen || '--',
      unit: '%',
      icon: TrendingUp,
      color: 'text-green-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-600">
            Here's an overview of your health metrics and upcoming activities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className={`${!wsConnected && 'opacity-70'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className={`h-4 w-4 ${vitals?.heart_rate > 100 ? 'text-red-500' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals?.heart_rate || '--'} BPM</div>
              <p className="text-xs text-muted-foreground">
                Last updated: {vitals?.last_updated ? new Date(vitals.last_updated).toLocaleTimeString() : 'N/A'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <ThermometerIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals?.temperature || '--'}°C</div>
              <p className="text-xs text-muted-foreground">
                Last updated: {vitals?.last_updated ? new Date(vitals.last_updated).toLocaleTimeString() : 'N/A'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals?.blood_pressure || '--'} mmHg</div>
              <p className="text-xs text-muted-foreground">
                Last updated: {vitals?.last_updated ? new Date(vitals.last_updated).toLocaleTimeString() : 'N/A'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Oxygen</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals?.blood_oxygen || '--'}%</div>
              <p className="text-xs text-muted-foreground">
                Last updated: {vitals?.last_updated ? new Date(vitals.last_updated).toLocaleTimeString() : 'N/A'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Health Insights */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            AI Health Insights
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => (
              <Card key={index} className={`border-l-4 ${
                insight.severity === 'critical' ? 'border-l-red-500' :
                insight.severity === 'warning' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              }`}>
                <CardContent className="pt-4">
                  <p className="font-medium mb-2">{insight.message}</p>
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Test Results Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Test Results</CardTitle>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/test-results'}>
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : testResults.length > 0 ? (
                testResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{result.name}</p>
                      <div className="text-sm text-gray-500">{result.date}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Result
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No test results available</div>
              )}
            </CardContent>
          </Card>

          {/* Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/schedule'}>
                Book New
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">Dr. {appointment.doctor_name}</p>
                      <div className="text-sm text-gray-500">
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No upcoming appointments</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;