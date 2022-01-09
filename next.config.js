/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
    WS_ENDPOINT: process.env.WS_ENDPOINT
  },
  typescript:{
    ignoreBuildErrors: true
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ],
  },
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false
    return config
  }
}
