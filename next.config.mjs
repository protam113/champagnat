/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true, // Thêm dòng này
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hcm03.vstorage.vngcloud.vn' },
    ],
  },
};

export default nextConfig;
