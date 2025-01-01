/** @format */
import type { Metadata } from 'next';

export const appInfo = {
    logo: '/image_logo.png',  // Remove `{ }` to correctly reference the logo
    title: 'Marists Champagnat',
    description: 'Chào mừng đến với Hội Dòng Anh Em Đức Maria Việt Nam',
};

// Use `appInfo` properties in `metadata` directly
export const metadata: Metadata = {
    title: appInfo.title,
    description: appInfo.description,
    // If the logo is used as an icon, you can add it here, if not, skip this field
    icons: {
        icon: appInfo.logo,
    },
};