import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify admin token
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get unverified doctors with their documents
    const doctors = await User.find({
      role: 'doctor',
      isVerified: false
    })
    .select('-password')
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: doctors
    });
  } catch (error) {
    console.error('Get unverified doctors error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
