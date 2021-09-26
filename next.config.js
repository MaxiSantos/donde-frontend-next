/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false
    return config
  }
}
