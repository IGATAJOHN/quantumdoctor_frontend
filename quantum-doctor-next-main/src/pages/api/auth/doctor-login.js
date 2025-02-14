import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const doctor = await User.findOne({ email, role: 'doctor' });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, doctor.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!doctor.isApproved) {
      return res.status(403).json({ message: 'Doctor not approved' });
    }

    const accessToken = jwt.sign(
      { userId: doctor._id, role: 'doctor' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: doctor._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      access_token: accessToken,
      refresh_token: refreshToken,
      doctor: {
        id: doctor._id,
        email: doctor.email,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        isVerified: doctor.isVerified
      }
    });
  } catch (error) {
    console.error('Doctor login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
