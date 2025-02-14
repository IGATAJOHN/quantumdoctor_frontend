import connectDB from '../../../../lib/db';
import LabTest from '../../../../models/LabTest';
import { verifyDoctorToken } from '../../../../lib/middleware/auth';
import { getFileFromCloudinary } from '../../../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify doctor token
    const decoded = verifyDoctorToken(req);
    if (!decoded) {
      return res.status(403).json({ message: 'Only doctors can download test results' });
    }

    const { file_name } = req.query;
    const testResult = await LabTest.findOne({ file_name, doctor_id: decoded.userId });

    if (!testResult) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Get file from Cloudinary
    const fileUrl = await getFileFromCloudinary(file_name);
    
    // Redirect to file URL
    res.redirect(fileUrl);
  } catch (error) {
    console.error('Download test result error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
