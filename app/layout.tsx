import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🎋 おみくじコネクト | 毎日1問・運勢パズル",
  description: "毎日1問・おみくじワードを正しいカテゴリに分類しよう！AI運勢診断付き。全問正解で大吉！",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
