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
    const testResults = [
      {
        id: '1',
        name: 'Complete Blood Count',
        date: '2025-02-14',
        status: 'completed',
        result: 'Normal',
        doctor: 'Dr. Smith'
      },
      {
        id: '2',
        name: 'Lipid Panel',
        date: '2025-02-10',
        status: 'completed',
        result: 'Slightly elevated cholesterol',
        doctor: 'Dr. Johnson'
      }
    ];

    return res.status(200).json(testResults);
  } catch (error) {
    console.error('Get test results error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
