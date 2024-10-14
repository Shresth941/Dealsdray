import otpGenerator from 'otp-generator';
import OOtp from '../models/otpModel.js';

// Constants
const OTP_LENGTH = 6;
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

// Error messages
const ERROR_MESSAGES = {
  OTP_GENERATION_ERROR: 'Error generating OTP',
  OTP_VERIFICATION_ERROR: 'Error verifying OTP',
  OOtp_NOT_FOUND: 'OOtp not found',
  OTP_EXPIRED: 'OTP expired',
  INVALID_OTP: 'Invalid OTP',
};

// Helper function to generate OTP
const generateOTP = () => otpGenerator.generate(OTP_LENGTH, { upperCase: false, specialChars: false });

// Helper function to check if OTP is expired
const isOtpExpired = (otpCreatedTime) => Date.now() - new Date(otpCreatedTime).getTime() > OTP_EXPIRATION_TIME;

// API endpoint to send OTP
export const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

   
    const existingOOtp = await OOtp.findOne({ phone });

   
    const otp = generateOTP();

    if (existingOOtp) {
      // Update OTP and created time for the existing OOtp
      existingOOtp.otp = otp;
      existingOOtp.otpCreatedTime = new Date();
      await existingOOtp.save();

      console.log(`OTP for existing OOtp ${phone}: ${otp}`);
      res.status(200).send({ message: 'OTP generated and sent to existing OOtp (logged in console).' });
    } else {
      // Create a new OOtp with the phone number and OTP
      const newOOtp = new OOtp({
        phone,
        otp,
        otpCreatedTime: new Date(),
      });
      await newOOtp.save();

      console.log(`OTP for new OOtp ${phone}: ${otp}`);
      res.status(200).send({ message: 'OTP generated and sent to new OOtp (logged in console).' });
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).send({ message: ERROR_MESSAGES.OTP_GENERATION_ERROR, error: error.message });
  }
};

// API endpoint to verify OTP

export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const existingOOtp = await OOtp.findOne({ phone }); 

    if (!existingOOtp) {
      return res.status(404).send({ message: ERROR_MESSAGES.OOtp_NOT_FOUND });
    }

    if (isOtpExpired(existingOOtp.otpCreatedTime)) {
      return res.status(400).send({ message: ERROR_MESSAGES.OTP_EXPIRED });
    }

    if (existingOOtp.otp !== otp) {
      return res.status(400).send({ message: ERROR_MESSAGES.INVALID_OTP });
    }

    res.status(200).send({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).send({ message: ERROR_MESSAGES.OTP_VERIFICATION_ERROR, error: error.message });
  }
};
