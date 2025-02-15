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

        // Check if this is the first admin
        const adminCount = await db.collection('admins').countDocuments();
        console.log('Current admin count:', adminCount);
        const isFirstAdmin = adminCount === 0;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare admin document
        const adminDoc = {
            email,
            password: hashedPassword,
            first_name,
            last_name,
            phone,
            dateOfBirth,
            is_approved: isFirstAdmin,
            is_super_admin: isFirstAdmin, // First admin is super admin
            created_at: new Date(),
            updated_at: new Date()
        };

        // Create new admin
        const result = await db.collection('admins').insertOne(adminDoc);

        // Log the created admin for debugging
        console.log('Created admin:', {
            id: result.insertedId,
            email,
            is_approved: isFirstAdmin,
            is_super_admin: isFirstAdmin
        });

        res.status(201).json({
            message: isFirstAdmin 
                ? 'Admin registered and approved as super admin' 
                : 'Admin registered successfully. Waiting for approval',
            admin: {
                id: result.insertedId,
                email,
                first_name,
                last_name,
                is_approved: isFirstAdmin,
                is_super_admin: isFirstAdmin
            }
        });
    } catch (error) {
        console.error('Admin signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
