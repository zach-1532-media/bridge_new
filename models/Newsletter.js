const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: String,
  newsletter: Boolean,
  dateSubscribed: Date,
  dateUnsubscribed: Date,
});

module.exports =
  mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
