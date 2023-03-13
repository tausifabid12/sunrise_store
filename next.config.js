/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    imageBB_api_key: process.env.IMAGEBB_API_KEY,
  },
};

module.exports = nextConfig;
