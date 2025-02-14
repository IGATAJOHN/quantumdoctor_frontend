import connectDB from '../../../lib/db';
import LabTest from '../../../models/LabTest';
import User from '../../../models/User';
import { verifyDoctorToken } from '../../../lib/middleware/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify doctor token
    const decoded = verifyDoctorToken(req);
    if (!decoded) {
      return res.status(403).json({ message: 'Only doctors can view test results' });
    }

    const testResults = await LabTest.find({ doctor_id: decoded.userId, status: 'uploaded' })
      .populate('patient_id', 'firstName lastName')
      .select('consultation_id file_name uploaded_at patient_id')
      .sort('-uploaded_at');

    if (!testResults.length) {
      return res.status(404).json({ message: 'No test results found' });
    }

    const formattedResults = testResults.map(result => ({
      consultation_id: result.consultation_id,
      file_name: result.file_name,
      patient_name: `${result.patient_id.firstName} ${result.patient_id.lastName}`,
      uploaded_at: result.uploaded_at.toUTCString()
    }));

    return res.status(200).json(formattedResults);
  } catch (error) {
    console.error('View all test results error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
