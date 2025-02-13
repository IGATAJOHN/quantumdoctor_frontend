import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify user token
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the latest vitals
    const latestVitals = user.vitals[user.vitals.length - 1] || {};

    return res.status(200).json({
      diastolic_blood_pressure: latestVitals.diastolic_blood_pressure || 0,
      systolic_blood_pressure: latestVitals.systolic_blood_pressure || 0,
      heart_rate: latestVitals.heart_rate || 0,
      temperature: latestVitals.temperature || 0,
      height: latestVitals.height || 0,
      weight: latestVitals.weight || 0,
      updated_at: latestVitals.updated_at || new Date()
    });
  } catch (error) {
    console.error('Get vitals error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
