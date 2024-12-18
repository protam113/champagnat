// app/layout.tsx
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { appInfo, metadata } from '@/constants/appInfos';
import ReactQueryProvider from '@/app/ReactQueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {' '}
      {/* Set language to Vietnamese */}
      <ReactQueryProvider>
        <head>
          <title>{metadata.title || 'Tiêu đề Mặc định'}</title>
          <meta
            name="description"
            content={metadata.description || 'Mô tả mặc định'}
          />
          <link
            rel="icon"
            href={
              typeof appInfo.logo === 'string'
                ? appInfo.logo
                : '/fallback-icon.svg'
            }
            type="image/svg+xml"
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={metadata.openGraph?.title} />
          <meta
            property="og:description"
            content={metadata.openGraph?.description}
          />
          <meta property="og:type" content={metadata.openGraph?.type} />
          <meta property="og:url" content={metadata.openGraph?.url} />
          {metadata.openGraph?.images?.map((image, index) => (
            <meta
              property="og:image"
              content={image.url}
              key={`og-image-${index}`}
            />
          ))}
          <meta
            property="og:site_name"
            content={metadata.openGraph?.siteName}
          />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content={metadata.twitter?.card} />
          <meta name="twitter:title" content={metadata.twitter?.title} />
          <meta
            name="twitter:description"
            content={metadata.twitter?.description}
          />
          {metadata.twitter?.images?.map((image, index) => (
            <meta
              name="twitter:image"
              content={image}
              key={`twitter-image-${index}`}
            />
          ))}
          {metadata.twitter?.creator && (
            <meta name="twitter:creator" content={metadata.twitter.creator} />
          )}
        </head>
        <body>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
