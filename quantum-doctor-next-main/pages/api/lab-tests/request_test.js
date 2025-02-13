import connectDB from '../../../lib/db';
import LabTest from '../../../models/LabTest';
import { verifyDoctorToken } from '../../../lib/middleware/auth';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false
  }
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

    // Verify doctor token
    const decoded = verifyDoctorToken(req);
    if (!decoded) {
      return res.status(403).json({ message: 'Only doctors can request tests' });
    }

    const { fields } = await parseForm(req);
    const { consultation_id, test_name, instructions } = fields;

    if (!consultation_id || !test_name) {
      return res.status(400).json({ message: 'Consultation ID and test name are required' });
    }

    // Create lab test request
    await LabTest.create({
      consultation_id,
      test_name,
      instructions,
      doctor_id: decoded.userId,
      patient_id: fields.patient_id // This should be passed from the consultation
    });

    return res.status(201).json({ message: 'Test request created successfully' });
  } catch (error) {
    console.error('Request test error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
