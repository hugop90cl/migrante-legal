/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
    ],
  },
  output: 'standalone', // Solo si vuelves a producción
};

module.exports = nextConfig;
