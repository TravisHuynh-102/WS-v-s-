import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Đăng Ký Workshop Mùa Hè - Art House's",
  description: "Trải nghiệm sáng tạo mùa hè cho bé tại Art House's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
