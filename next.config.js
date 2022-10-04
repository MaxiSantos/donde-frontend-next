/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = require('./app/common/config/nextConfig')

module.exports = {
  ...nextConfig,
  i18n  
};
