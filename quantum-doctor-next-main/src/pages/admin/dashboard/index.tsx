import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ROUTES } from '@/lib/routes';
import { toast } from 'sonner';

interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  unverifiedDoctors: number;
  totalAppointments: number;
  activeConsultations: number;
  monthlyGrowth: number;
}

interface UnverifiedDoctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  registrationNumber: string;
  submittedAt: string;
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalDoctors: 0,
    totalPatients: 0,
    unverifiedDoctors: 0,
    totalAppointments: 0,
    activeConsultations: 0,
    monthlyGrowth: 0,
  });
  const [unverifiedDoctors, setUnverifiedDoctors] = useState<UnverifiedDoctor[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard stats
        const statsRes = await fetch(ROUTES.API.ADMIN.GET_STATS);
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch unverified doctors
        const doctorsRes = await fetch(ROUTES.API.ADMIN.UNVERIFIED_DOCTORS);
        const doctorsData = await doctorsRes.json();
        setUnverifiedDoctors(doctorsData);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleVerifyDoctor = async (doctorId: string) => {
    try {
      const response = await fetch(ROUTES.API.ADMIN.VERIFY_DOCTOR, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doctorId })
      });

      if (!response.ok) throw new Error('Failed to verify doctor');

      // Update local state
      setUnverifiedDoctors(doctors => doctors.filter(d => d.id !== doctorId));
      setStats(prev => ({
        ...prev,
        totalDoctors: prev.totalDoctors + 1,
        unverifiedDoctors: prev.unverifiedDoctors - 1,
      }));

      toast.success('Doctor verified successfully');
    } catch (error) {
      toast.error('Failed to verify doctor');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Monitor platform activity and manage verifications
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDoctors}</div>
              <p className="text-xs text-muted-foreground">Verified doctors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Registered patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unverifiedDoctors}</div>
              <p className="text-xs text-muted-foreground">Doctors awaiting verification</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">All-time appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeConsultations}</div>
              <p className="text-xs text-muted-foreground">Ongoing consultations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">User growth this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Unverified Doctors Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Doctor Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unverifiedDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">
                      {doctor.email} | {doctor.specialization}
                    </p>
                    <p className="text-sm text-gray-500">
                      Registration: {doctor.registrationNumber}
                    </p>
                    <p className="text-xs text-gray-400">
                      Submitted: {new Date(doctor.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleVerifyDoctor(doctor.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.location.href = ROUTES.ADMIN.VIEW_DOCTOR(doctor.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              {unverifiedDoctors.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No pending verifications
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
