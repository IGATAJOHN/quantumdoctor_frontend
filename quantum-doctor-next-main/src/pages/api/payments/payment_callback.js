import connectDB from '../../../lib/db';
import Payment from '../../../models/Payment';
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

    const { transaction_id, tx_ref } = req.body;

    // Verify transaction
    const transactionVerification = await flw.Transaction.verify({ id: transaction_id });
    
    if (
      transactionVerification.data.status === "successful" &&
      transactionVerification.data.tx_ref === tx_ref
    ) {
      // Update payment status
      await Payment.findOneAndUpdate(
        { transaction_ref: tx_ref },
        { status: 'completed' }
      );

      // You can add additional logic here, like creating a consultation record

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      // Update payment status to failed
      await Payment.findOneAndUpdate(
        { transaction_ref: tx_ref },
        { status: 'failed' }
      );

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
