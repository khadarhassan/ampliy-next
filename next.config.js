const withSVGR = require('next-svgr');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  //   images: {
  //     domains: ['images.prismic.io', 'prismic-io.s3.amazonaws.com'],
  //   },
};

module.exports = withPlugins([withSVGR], nextConfig);
