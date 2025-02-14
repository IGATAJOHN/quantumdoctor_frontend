import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      dateOfBirth,
    } = req.body;

    // Validate required fields
    if (!email || !password || !first_name || !last_name || !phone || !dateOfBirth) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await User.create({
      email,
      password: hashedPassword,
      firstName: first_name,
      lastName: last_name,
      phone,
      dateOfBirth: new Date(dateOfBirth),
      role: 'admin',
      isApproved: false
    });

    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      adminId: admin._id
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}
