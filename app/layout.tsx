import type { Metadata } from "next";
import "./globals.css";
import OrbBackground from "@/components/OrbBackground";

const SITE_URL = "https://omikuji-connect.vercel.app";
const TITLE = "おみくじコネクト | 毎日1問・運勢パズル";
const DESC = "毎日1問・おみくじワードを正しいカテゴリに分類しよう！AI運勢診断付き。全問正解で大吉！仕事運・恋愛運・健康運・金運を予測するカジュアルパズル。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: ["おみくじ", "運勢パズル", "毎日1問", "AI運勢診断", "ブラウザゲーム", "無料ゲーム"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    url: SITE_URL,
    siteName: "おみくじコネクト",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0d0d1a" />
      </head>
      <body>
        <OrbBackground />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
