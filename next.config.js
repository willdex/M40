/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'manzana40.com',
      },
      {
        protocol: 'https',
        hostname: '*.wsimg.com',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  distDir: '.next',
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
