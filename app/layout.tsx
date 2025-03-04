import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import {HeroUIProvider} from "@heroui/react";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anex Dashboard", // cspell: disable-line
  description: "Generated by Anex", // cspell: disable-line
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body className={inter.className}><HeroUIProvider>{children}</HeroUIProvider></body>
    </html>
  );
}
