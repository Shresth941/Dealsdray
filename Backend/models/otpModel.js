import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  otpCreatedTime: {
    type: Date,
  }
}, { strict: true });

export default mongoose.model('OOtp', otpSchema);
