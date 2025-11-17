// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // <-- 1. IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrimTime App", // (Anda bisa ganti ini)
  description: "Booking Barbershop Modern", // (Anda bisa ganti ini)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 2. BUNGKUS 'children' DENGAN THEME PROVIDER */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}