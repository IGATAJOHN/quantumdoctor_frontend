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

    const {
      is_approved,
      is_verified,
      page = 1,
      per_page = 10
    } = req.query;

    // Build filter conditions
    const filter = { role: 'doctor' };
    if (is_approved !== undefined) {
      filter.isApproved = is_approved === 'true';
    }
    if (is_verified !== undefined) {
      filter.isVerified = is_verified === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(per_page);
    const limit = parseInt(per_page);

    // Get total count
    const total = await User.countDocuments(filter);

    // Get doctors with pagination
    const doctors = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: {
        doctors,
        pagination: {
          total,
          page: parseInt(page),
          per_page: parseInt(per_page),
          total_pages: Math.ceil(total / per_page)
        }
      }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
