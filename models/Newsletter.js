const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  newsletter: Boolean,
});

module.exports =
  mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
