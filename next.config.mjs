/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hcm03.vstorage.vngcloud.vn', // Đã cấu hình trước
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Thêm images.unsplash.com
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
