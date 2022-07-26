const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  newsletter: Boolean,
  dateCreated: Date,
});

module.exports =
  mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
