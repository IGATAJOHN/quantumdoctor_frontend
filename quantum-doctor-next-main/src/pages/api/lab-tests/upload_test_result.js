import connectDB from '../../../lib/db';
import LabTest from '../../../models/LabTest';
import { verifyToken } from '../../../lib/middleware/auth';
import { IncomingForm } from 'formidable';
import { uploadToCloudinary } from '../../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: false
  }
};

const MAX_FILE_SIZE = 1024 * 1024; // 1 MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: MAX_FILE_SIZE
    });
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

    // Verify user token
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { fields, files } = await parseForm(req);
    const { consultation_id } = fields;

    if (!files.file) {
      return res.status(400).json({ message: 'Test result file is required' });
    }

    const file = files.file;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Allowed types: PDF, JPG, JPEG, PNG' });
    }

    // Upload file to Cloudinary
    const result = await uploadToCloudinary(file);
    const fileName = `${decoded.userId}_${Date.now()}_${file.originalFilename}`;

    // Update lab test record
    await LabTest.findOneAndUpdate(
      { consultation_id, patient_id: decoded.userId },
      {
        file_name: fileName,
        status: 'uploaded',
        uploaded_at: new Date()
      }
    );

    return res.status(201).json({
      message: 'Test result uploaded successfully',
      file_name: fileName
    });
  } catch (error) {
    console.error('Upload test result error:', error);
    if (error.message.includes('maxFileSize exceeded')) {
      return res.status(400).json({ message: 'File too large. Maximum allowed size is 1 MB.' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}
