import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

const BLOOD_PRESSURE_TIPS = {
  normal: "Your blood pressure is normal. Keep maintaining a healthy lifestyle!",
  elevated: "Your blood pressure is slightly elevated. Consider reducing sodium intake and exercising regularly.",
  high: "Your blood pressure is high. Please consult with your healthcare provider for proper guidance.",
  low: "Your blood pressure is low. Stay hydrated and consult your healthcare provider if you feel dizzy."
};

function getBloodPressureCategory(systolic, diastolic) {
  if (systolic < 90 || diastolic < 60) return 'low';
  if (systolic < 120 && diastolic < 80) return 'normal';
  if (systolic < 130 && diastolic < 80) return 'elevated';
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
    const systolic = latestVitals.systolic_blood_pressure || 0;
    const diastolic = latestVitals.diastolic_blood_pressure || 0;

    const category = getBloodPressureCategory(systolic, diastolic);
    const blood_pressure = `${systolic}/${diastolic}`;

    return res.status(200).json({
      blood_pressure,
      health_tip: BLOOD_PRESSURE_TIPS[category]
    });
  } catch (error) {
    console.error('Get blood pressure error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
