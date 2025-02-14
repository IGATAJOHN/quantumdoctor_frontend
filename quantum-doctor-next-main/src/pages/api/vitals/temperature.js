import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

const TEMPERATURE_TIPS = {
  low: "Your body temperature is lower than normal. Keep warm and monitor for any other symptoms.",
  normal: "Your body temperature is normal. Continue maintaining good health practices!",
  fever: "You have a fever. Rest, stay hydrated, and consult your healthcare provider if it persists or worsens.",
  high: "Your temperature is very high. Seek immediate medical attention."
};

function getTemperatureCategory(temp) {
  if (temp < 36.5) return 'low';
  if (temp <= 37.2) return 'normal';
  if (temp <= 38.3) return 'fever';
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
    const temperature = latestVitals.temperature || 0;
    const category = getTemperatureCategory(temperature);

    return res.status(200).json({
      temperature,
      health_tip: TEMPERATURE_TIPS[category]
    });
  } catch (error) {
    console.error('Get temperature error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
