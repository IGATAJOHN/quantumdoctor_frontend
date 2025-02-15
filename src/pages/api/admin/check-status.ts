import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { db } = await connectToDatabase();
        const admins = await db.collection('admins').find({}).toArray();
        
        res.status(200).json({
            totalAdmins: admins.length,
            admins: admins.map(admin => ({
                email: admin.email,
                is_approved: admin.is_approved,
                created_at: admin.created_at
            }))
        });
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
