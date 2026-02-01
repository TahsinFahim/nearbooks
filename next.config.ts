/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remote hosts
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],

    // Dev mode এ unoptimized
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
