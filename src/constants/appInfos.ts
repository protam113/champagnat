/** @format */
import type { Metadata } from 'next';

interface CustomOpenGraphImage {
    url: string;
    width: number;
    height: number;
    alt: string;
}

interface CustomOpenGraph {
    type: string;
    url: string;
    title: string;
    description: string;
    images: CustomOpenGraphImage[];
    siteName: string;
}

interface CustomTwitter {
    card: string;
    title: string;
    description: string;
    images: string[];
    creator?: string;
}

export interface CustomMetadata extends Metadata {
    title: string; // Ensure title is always a string
    description: string; // Ensure description is always a string
    icons: {
        icon: string;
    };
    openGraph: CustomOpenGraph;
    twitter: CustomTwitter;
}

export const appInfo = {
    logo: '/image_logo.png',
    title: 'Champagnat',
    description: 'Chào mừng đến với Champagnat',
    url: 'https://yourwebsite.com', // Replace with your actual URL
};

export const metadata: CustomMetadata = {
    title: appInfo.title,
    description: appInfo.description,
    icons: {
        icon: appInfo.logo,
    },
    openGraph: {
        type: 'website',
        url: appInfo.url,
        title: appInfo.title,
        description: appInfo.description,
        images: [
            {
                url: `${appInfo.url}${appInfo.logo}`,
                width: 800,
                height: 600,
                alt: `${appInfo.title} Logo`,
            },
        ],
        siteName: appInfo.title,
    },
    twitter: {
        card: 'summary_large_image',
        title: appInfo.title,
        description: appInfo.description,
        images: [`${appInfo.url}${appInfo.logo}`],
        creator: '@yourtwitterhandle', // Replace with your actual Twitter handle
    },
};
