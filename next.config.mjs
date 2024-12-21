/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hcm03.vstorage.vngcloud.vn',
            },
        ],
    },
};

export default nextConfig;
