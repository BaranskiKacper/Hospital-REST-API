import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Header } from "@/layout/header/Header";
import { Inter } from "next/font/google";
import { PageContent } from "@/layout/PageContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <PageContent>{children}</PageContent>
      </body>
    </html>
  );
}
