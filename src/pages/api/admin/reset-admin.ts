import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { db } = await connectToDatabase();
        await db.collection('admins').deleteMany({});
        res.status(200).json({ message: 'Admin collection reset successfully' });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
