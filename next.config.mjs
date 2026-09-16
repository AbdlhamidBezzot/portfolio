/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
  },
  typescript: {
    // Ignore type errors if needed during tight build constraints
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
