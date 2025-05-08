const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  companyDescription: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }

});

module.exports = mongoose.model('Jobsposts', jobSchema); // ✅ FIXED: Changed 'Jobspost' → 'Job'
