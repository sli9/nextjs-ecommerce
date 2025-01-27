import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

export default nextConfig
