import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI PM 学习旅程 | 从零到 Inspire",
  description: "基于费曼学习法的 AI 产品经理成长路径，系统化学习 AI PM 技能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
