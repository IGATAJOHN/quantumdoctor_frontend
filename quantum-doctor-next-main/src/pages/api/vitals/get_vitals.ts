import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = await getToken({ req });
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Mock data - replace with actual database query
    const vitals = {
      heart_rate: 75,
      temperature: 98.6,
      blood_pressure: '120/80',
      blood_oxygen: 98,
      last_updated: new Date().toISOString()
    };

    return res.status(200).json(vitals);
  } catch (error) {
    console.error('Get vitals error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
