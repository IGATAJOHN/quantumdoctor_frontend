import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify user token
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    const {
      diastolic_blood_pressure,
      systolic_blood_pressure,
      heart_rate,
      temperature,
      height,
      weight
    } = req.body;

    // Validate input
    if (
      (diastolic_blood_pressure && typeof diastolic_blood_pressure !== 'number') ||
      (systolic_blood_pressure && typeof systolic_blood_pressure !== 'number') ||
      (heart_rate && typeof heart_rate !== 'number') ||
      (temperature && typeof temperature !== 'number') ||
      (height && typeof height !== 'number') ||
      (weight && typeof weight !== 'number')
    ) {
      return res.status(400).json({ message: 'Invalid input: all values must be numbers' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add new vitals record
    user.vitals.push({
      diastolic_blood_pressure,
      systolic_blood_pressure,
      heart_rate,
      temperature,
      height,
      weight,
      updated_at: new Date()
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Vitals updated successfully'
    });
  } catch (error) {
    console.error('Update vitals error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
