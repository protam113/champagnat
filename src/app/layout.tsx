import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { appInfo, metadata } from "@/constants/appInfos";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import {AuthProvider} from "@/context/authContext";
import {UserProvider} from "@/context/userContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
          <UserProvider>
            <html lang="en">
                <ReactQueryProvider>
                    <head>
                        <title>{metadata.title ? String(metadata.title) : 'Default Title'}</title>
                        <meta name="description" content={metadata.description || 'Default description'}/>
                        {/* Assuming logo is a valid image path, ensure it renders correctly */}
                        <link rel="icon" href={typeof appInfo.logo === "string" ? appInfo.logo : '/fallback-icon.svg'}
                            type="image/svg+xml"/>
                    </head>
                    <body>
                        <AntdRegistry>{children}</AntdRegistry>
                    </body>
                </ReactQueryProvider>
            </html>
          </UserProvider>
      </AuthProvider>
  );
}
