import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        const { db } = await connectToDatabase();
        const admin = await db.collection('admins').findOne({ email });

        // Log the found admin for debugging
        console.log('Found admin:', admin ? {
            email: admin.email,
            is_approved: admin.is_approved,
            is_super_admin: admin.is_super_admin
        } : 'No admin found');

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!admin.is_approved) {
            return res.status(403).json({ message: 'Admin account not approved' });
        }

        const token = jwt.sign(
            { 
                userId: admin._id, 
                role: 'admin',
                is_super_admin: admin.is_super_admin 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                firstName: admin.first_name,
                lastName: admin.last_name,
                is_super_admin: admin.is_super_admin
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
