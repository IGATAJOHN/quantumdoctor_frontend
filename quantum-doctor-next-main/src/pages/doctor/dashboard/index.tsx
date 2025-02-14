import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Users,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ROUTES } from '@/lib/routes';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  patient_name: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  type: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
}

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingReports: 0,
    completedConsultations: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch appointments
        const appointmentsRes = await fetch(ROUTES.API.DOCTOR.APPOINTMENTS);
        const appointmentsData = await appointmentsRes.json();
        setAppointments(appointmentsData.slice(0, 5)); // Show only latest 5 appointments

        // Fetch patients
        const patientsRes = await fetch(ROUTES.API.DOCTOR.PATIENTS);
        const patientsData = await patientsRes.json();
        setPatients(patientsData.slice(0, 5)); // Show only latest 5 patients

        // Fetch stats
        const statsRes = await fetch(ROUTES.API.DOCTOR.STATS);
        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAppointmentAction = async (appointmentId: string, action: 'confirm' | 'cancel') => {
    try {
      const response = await fetch(ROUTES.API.DOCTOR.UPDATE_APPOINTMENT(appointmentId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: action === 'confirm' ? 'confirmed' : 'cancelled' })
      });

      if (!response.ok) throw new Error('Failed to update appointment');

      // Update local state
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: action === 'confirm' ? 'confirmed' : 'cancelled' }
          : apt
      ));

      toast.success(`Appointment ${action}ed successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} appointment`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-gray-600">
            Manage your appointments and patient consultations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Lifetime patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReports}</div>
              <p className="text-xs text-muted-foreground">Reports to be completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <FileText className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedConsultations}</div>
              <p className="text-xs text-muted-foreground">Consultations completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{appointment.patient_name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at{' '}
                      {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                  <div className="flex gap-2">
                    {appointment.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleAppointmentAction(appointment.id, 'confirm')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAppointmentAction(appointment.id, 'cancel')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <span className="text-green-500 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirmed
                      </span>
                    )}
                    {appointment.status === 'cancelled' && (
                      <span className="text-red-500 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-500">
                      Age: {patient.age} | Last Visit:{' '}
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Condition: {patient.condition}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.location.href = ROUTES.DOCTOR.VIEW_PATIENT(patient.id)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
