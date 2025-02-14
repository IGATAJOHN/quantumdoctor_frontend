import connectDB from '../../../lib/db';
import Payment from '../../../models/Payment';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/middleware/auth';
import { v4 as uuidv4 } from 'uuid';
import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

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

    const { doctor_id } = req.body;
    if (!doctor_id) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const doctor = await User.findOne({ _id: doctor_id, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const patient = await User.findById(decoded.userId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Generate unique transaction reference
    const tx_ref = `TX-${uuidv4()}`;
    const amount = 5000; // Set your consultation fee

    // Create payment record
    const payment = await Payment.create({
      patient_id: decoded.userId,
      doctor_id,
      amount,
      transaction_ref: tx_ref,
      status: 'pending'
    });

    // Generate Flutterwave payment link
    const paymentData = {
      tx_ref,
      amount,
      currency: 'NGN',
      redirect_url: `${process.env.FRONTEND_URL}/payment/callback`,
      customer: {
        email: patient.email,
        name: `${patient.firstName} ${patient.lastName}`,
        phone_number: patient.phone
      },
      customizations: {
        title: 'Doctor Consultation Payment',
        description: `Consultation payment for Dr. ${doctor.lastName}`,
        logo: process.env.LOGO_URL
      }
    };

    const response = await flw.Charge.create(paymentData);

    // Update payment record with payment link
    payment.payment_link = response.data.link;
    await payment.save();

    return res.status(200).json({
      success: true,
      payment_link: response.data.link,
      tx_ref
    });
  } catch (error) {
    console.error('Make payment error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
