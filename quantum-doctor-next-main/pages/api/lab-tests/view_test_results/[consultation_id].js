import connectDB from '../../../../lib/db';
import LabTest from '../../../../models/LabTest';
import { verifyDoctorToken } from '../../../../lib/middleware/auth';

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

    const { consultation_id } = req.query;
    const testResults = await LabTest.find({ consultation_id, status: 'uploaded' })
      .select('file_name uploaded_at')
      .sort('-uploaded_at');

    if (!testResults.length) {
      return res.status(404).json({ message: 'No test results found for this consultation' });
    }

    return res.status(200).json(testResults);
  } catch (error) {
    console.error('View test results error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
