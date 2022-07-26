const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
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
