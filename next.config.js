module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-cdn.com', 'another-cdn.com'], // Add your image domains here
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Set your public API URL
    NEXT_PUBLIC_VERSION: '1.0.0',
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Handle 'fs' module for client-side (works in Node.js)
      };
    }
    return config;
  },
  experimental: {
    images: {
      unoptimized: true, // Allows unoptimized images in production
    },
  },
};
