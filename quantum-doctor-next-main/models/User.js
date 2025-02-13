import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema({
  diastolic_blood_pressure: { type: Number },
  systolic_blood_pressure: { type: Number },
  heart_rate: { type: Number },
  temperature: { type: Number },
  blood_oxygen: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  updated_at: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  location: { type: String },
  picture: { type: String },
  role: { type: String, enum: ['user', 'doctor', 'admin'], required: true },
  isApproved: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  documents: {
    medical_license: String,
    medical_school_cert: String,
    nysc_cert: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  vitals: [vitalsSchema]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
