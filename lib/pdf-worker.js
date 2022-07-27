/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/extensions */
if (process.env.NODE_ENV === 'production') {
  // use minified verion for production
  module.exports = require('pdfjs-dist/build/pdf.worker.min.js');
} else {
  module.exports = require('pdfjs-dist/build/pdf.worker.js');
}
