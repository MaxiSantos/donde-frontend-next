/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
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
    return config
  }
};
