import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Check if test admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@test.com' });
    if (existingAdmin) {
      return res.status(200).json({ message: 'Test admin already exists' });
    }

    // Create test admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@test.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'Admin',
      phone: '1234567890',
      dateOfBirth: new Date('1990-01-01'),
      role: 'admin',
      isApproved: true,
      isVerified: true
    });

    return res.status(201).json({
      success: true,
      message: 'Test admin created successfully',
      adminId: admin._id
    });
  } catch (error) {
    console.error('Create test admin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
