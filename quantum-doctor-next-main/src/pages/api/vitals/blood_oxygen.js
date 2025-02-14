import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

const BLOOD_OXYGEN_TIPS = {
  low: "Your blood oxygen level is low. Seek immediate medical attention if you experience difficulty breathing.",
  borderline: "Your blood oxygen level is borderline. Monitor closely and consult your healthcare provider.",
  normal: "Your blood oxygen level is normal. Keep maintaining a healthy lifestyle!"
};

function getBloodOxygenCategory(level) {
  if (level < 92) return 'low';
  if (level < 95) return 'borderline';
  return 'normal';
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
    const bloodOxygen = latestVitals.blood_oxygen || 0;
    const category = getBloodOxygenCategory(bloodOxygen);

    return res.status(200).json({
      blood_oxygen: bloodOxygen,
      health_tip: BLOOD_OXYGEN_TIPS[category]
    });
  } catch (error) {
    console.error('Get blood oxygen error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
