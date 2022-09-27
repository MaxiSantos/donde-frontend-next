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
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    //domains: [],
    // path prefix for Image Optimization API, useful with `loader`
    path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: 'default',
    // disable static imports for image files
    disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
    formats: ['image/webp'],
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // limit of 50 objects
    remotePatterns: [],
    // when true, every image will be unoptimized
    unoptimized: false,
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
