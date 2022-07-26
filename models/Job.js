const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  job: String,
  city: String,
  state: String,
  salary: String,
  benefits: Boolean,
  workType: String,
  description: String,
  hourlyRate: String,
  travel: Boolean,
  jobTitle: String,
  freelanceType: String,
  dateCreated: Date,
  applicants: Array,
  businessID: {
    type: mongoose.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  responsibilities: mongoose.Schema.Types.Mixed,
  qualifications: mongoose.Schema.Types.Mixed,
  initialPaymentIntentId: String,
});

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
