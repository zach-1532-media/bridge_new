const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
require('dotenv').config();

const nextConfig = {
  env: {
    MONGO_URL: process.env.MONGO_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET: process.env.SECRET,
    DO_SPACES_ID: process.env.DO_SPACES_ID,
    DO_SPACES_SECRET: process.env.DO_SPACES_SECRET,
    DO_SPACES_URL: process.env.DO_SPACES_URL,
    DO_SPACES_BUCKET: process.env.DO_SPACES_BUCKET,
    SENDGRID: process.env.SENDGRID,
    STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_WEBHOOK_SIGNING_SECRET: process.env.STRIPE_WEBHOOK_SIGNING_SECRET,
  },
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '/_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ['connectatthebridge.nyc3.cdn.digitaloceanspaces.com'],
  },
};

module.exports = withPlugins([withImages], nextConfig);
