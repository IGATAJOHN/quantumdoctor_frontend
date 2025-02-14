import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { uploadToCloudinary } from '../../../lib/cloudinary';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { fields, files } = await parseForm(req);
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      location,
      role = 'patient'
    } = fields;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Handle profile picture upload
    let pictureUrl = null;
    if (files.picture) {
      const uploadResult = await uploadToCloudinary(files.picture);
      pictureUrl = uploadResult.secure_url;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      dateOfBirth: new Date(dateOfBirth),
      location,
      role,
      picture: pictureUrl,
      isApproved: role === 'patient', // Auto-approve patients
      isVerified: role === 'patient' // Auto-verify patients
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
