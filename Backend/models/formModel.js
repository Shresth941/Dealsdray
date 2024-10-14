import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  department: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobile: { type: Number, required: true },
  reportingHead: { type: String, required: true, trim: true },
  pinCode: { type: Number, required: true },
  state: { type: String, required: true, trim: true },
  townArea: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  otherReportingHead: { type: String, required: true, trim: true },
  deactivationTime: { type: String, required: true, trim: true },
  assignmentRule: { type: String, required: true, trim: true },
  teamMemberName: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  userHierarchy: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  referralType: { type: String, required: true, enum: ['B2B', 'B2R', 'B2A'] },
  image: { type: String },  // Make image optional
}, { timestamps: true });

const FormModel = mongoose.model('form', formSchema);

export default FormModel;
