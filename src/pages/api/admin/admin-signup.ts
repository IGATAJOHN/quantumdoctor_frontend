import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, password, first_name, last_name, phone, dateOfBirth } = req.body;

        const { db } = await connectToDatabase();
        
        // Check if email already exists
        const existingAdmin = await db.collection('admins').findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const result = await db.collection('admins').insertOne({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            phone,
            dateOfBirth,
            is_approved: false,
            created_at: new Date(),
            updated_at: new Date()
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: result.insertedId,
                email,
                first_name,
                last_name
            }
        });
    } catch (error) {
        console.error('Admin signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
