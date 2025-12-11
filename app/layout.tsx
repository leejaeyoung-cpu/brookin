import type { Metadata } from "next";
import "./globals.css";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

