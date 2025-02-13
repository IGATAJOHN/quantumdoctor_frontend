import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transaction_ref: { type: String, required: true, unique: true },
  payment_link: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
