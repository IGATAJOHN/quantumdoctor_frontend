import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { uploadMiddleware } from '../../../lib/middleware/multer';
import { uploadToCloudinary } from '../../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      dateOfBirth
    } = req.body;

    // Validate required fields
    if (!email || !password || !first_name || !last_name || !phone || !dateOfBirth) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if doctor already exists
    const existingDoctor = await User.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Handle file uploads
    const documents = {};
    const requiredDocs = ['medical_license', 'medical_school_cert', 'nysc_cert'];
    let pictureUrl = null;

    for (const [fieldName, files] of Object.entries(req.files)) {
      if (fieldName === 'picture') {
        const result = await uploadToCloudinary(files[0]);
        pictureUrl = result.secure_url;
      } else if (requiredDocs.includes(fieldName)) {
        const result = await uploadToCloudinary(files[0]);
        documents[fieldName] = result.secure_url;
      }
    }

    // Validate required documents
    for (const doc of requiredDocs) {
      if (!documents[doc]) {
        return res.status(400).json({ message: `${doc.replace('_', ' ')} is required` });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const doctor = await User.create({
      email,
      password: hashedPassword,
      firstName: first_name,
      lastName: last_name,
      phone,
      dateOfBirth: new Date(dateOfBirth),
      role: 'doctor',
      picture: pictureUrl,
      documents,
      isApproved: false,
      isVerified: false
    });

    return res.status(201).json({
      success: true,
      message: 'Doctor registered successfully',
      doctorId: doctor._id
    });
  } catch (error) {
    console.error('Doctor signup error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Wrap the handler with multer middleware
export default async function (req, res) {
  try {
    await uploadMiddleware(req, res);
    return handler(req, res);
  } catch (error) {
    console.error('File upload error:', error);
    return res.status(400).json({ message: 'Invalid file format or size' });
  }
}
