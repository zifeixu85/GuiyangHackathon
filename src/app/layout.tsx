import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "黔客管家 · 贵客松公开验收版",
  description: "可运行、可核验、全合成数据的黔客管家公开演示代码。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
