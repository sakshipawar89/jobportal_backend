const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantType: { type: String, required: true },
  currentPackage: { type: Number },
  expectedPackage: { type: Number },
  coverLetter: { type: String, required: true },
  status: { type: String, default: 'pending' },
  appliedDate: { type: Date, default: Date.now },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobsposts' },
  cv: {
    filename: String,
    path: String,
    originalname: String,
    mimetype: String,
    size: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
