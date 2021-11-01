/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
