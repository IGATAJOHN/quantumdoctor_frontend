import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

const HEART_RATE_TIPS = {
  low: "Your heart rate is lower than normal. If you feel dizzy or short of breath, consult your healthcare provider.",
  normal: "Your heart rate is within the normal range. Keep up the good work!",
  high: "Your heart rate is higher than normal. Consider relaxation techniques and consult your healthcare provider if this persists."
};

function getHeartRateCategory(heartRate) {
  if (heartRate < 60) return 'low';
  if (heartRate <= 100) return 'normal';
  return 'high';
}

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
    const heartRate = latestVitals.heart_rate || 0;
    const category = getHeartRateCategory(heartRate);

    return res.status(200).json({
      heart_rate: heartRate,
      health_tip: HEART_RATE_TIPS[category]
    });
  } catch (error) {
    console.error('Get heart rate error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
