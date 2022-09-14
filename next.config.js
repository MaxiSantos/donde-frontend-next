/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/lab',
  '@mui/icons-material', // If @mui/icons-material is being used
]);

module.exports = withTM({
  reactStrictMode: false,
  i18n,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  /*env: {
    ENDPOINT: process.env.ENDPOINT,
    WS_ENDPOINT: process.env.WS_ENDPOINT,
    SUBSCRIPTION_TIME: process.env.SUBSCRIPTION_TIME
  },*/
  typescript:{
    ignoreBuildErrors: true
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ],
  },
  // using env instead of publicRuntimeConfig
  // https://github.com/vercel/next.js/discussions/11493#discussioncomment-14606
  env: {
    version: process.env.npm_package_version,
  },
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config
  }
});
