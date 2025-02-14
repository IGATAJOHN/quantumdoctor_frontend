import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/middleware/auth';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify admin token
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { doctor_id } = req.query;
    if (!doctor_id) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const doctor = await User.findOne({ _id: doctor_id, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    doctor.isVerified = true;
    await doctor.save();

    return res.status(200).json({
      success: true,
      message: 'Doctor verified successfully'
    });
  } catch (error) {
    console.error('Verify doctor error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
