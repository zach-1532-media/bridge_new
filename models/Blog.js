const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  date: Date,
  author: {
    name: String,
    avatar: String,
  },
  description: String,
  content: {
    main: {
      content: String,
      header: String,
    },
    second: {
      content: String,
      header: String,
    },
  },
  mainPhoto: String,
  secondaryPhoto: String,
  imageBunch: Array,
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
