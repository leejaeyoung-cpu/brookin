import type { Metadata } from "next";
import "./globals.css";
import MobileLayout from "@/components/MobileLayout";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "소래포구 성당 알림 시스템",
  description: "천주교 인천교구 소래포구 성당 카카오톡 알림 발송 플랫폼",
  keywords: ["소래포구성당", "천주교", "인천교구", "카카오톡", "알림"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FEE500" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="소래포구 성당" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="antialiased" style={{ fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500
            }
          }}
        />
        <MobileLayout>
          {children}
        </MobileLayout>
      </body>
    </html>
  );
}
