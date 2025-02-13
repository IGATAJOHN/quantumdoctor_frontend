import mongoose from 'mongoose';

const labTestSchema = new mongoose.Schema({
  consultation_id: { type: String, required: true },
  test_name: { type: String, required: true },
  instructions: { type: String },
  file_name: { type: String },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['requested', 'uploaded', 'reviewed'], default: 'requested' },
  uploaded_at: { type: Date },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.LabTest || mongoose.model('LabTest', labTestSchema);
