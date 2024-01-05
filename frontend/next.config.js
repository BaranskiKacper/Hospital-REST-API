/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
};

module.exports = nextConfig;
