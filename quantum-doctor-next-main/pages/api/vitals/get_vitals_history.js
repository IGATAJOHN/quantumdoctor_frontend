import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';

function getDateRange(filterType) {
  const now = new Date();
  const startDate = new Date();

  switch (filterType) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'yesterday':
      startDate.setDate(now.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      now.setDate(now.getDate() - 1);
      now.setHours(23, 59, 59, 999);
      break;
    case 'last_week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'last_month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'last_year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return null;
  }

  return { startDate, endDate: now };
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

    const {
      start_date,
      end_date,
      date_filter_type,
      page = 1,
      per_page = 10,
      limit
    } = req.query;

    let dateFilter = {};

    if (date_filter_type) {
      const range = getDateRange(date_filter_type);
      if (range) {
        dateFilter = {
          'vitals.updated_at': {
            $gte: range.startDate,
            $lte: range.endDate
          }
        };
      }
    } else if (start_date && end_date) {
      dateFilter = {
        'vitals.updated_at': {
          $gte: new Date(start_date),
          $lte: new Date(end_date)
        }
      };
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter and sort vitals
    let filteredVitals = user.vitals;
    if (Object.keys(dateFilter).length > 0) {
      filteredVitals = user.vitals.filter(vital => 
        vital.updated_at >= dateFilter['vitals.updated_at'].$gte &&
        vital.updated_at <= dateFilter['vitals.updated_at'].$lte
      );
    }

    // Sort by date descending
    filteredVitals.sort((a, b) => b.updated_at - a.updated_at);

    // Apply pagination
    const startIndex = (page - 1) * per_page;
    const endIndex = limit ? Math.min(startIndex + per_page, limit) : startIndex + per_page;
    const paginatedVitals = filteredVitals.slice(startIndex, endIndex);

    return res.status(200).json(paginatedVitals);
  } catch (error) {
    console.error('Get vitals history error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
