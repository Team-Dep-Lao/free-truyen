import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/CommonLayout/Header";
import Footer from "@/components/CommonLayout/Footer";
import ScrollButton from "@/components/CommonLayout/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
// import { DataCommonContextProvider } from "@/context/dataCommonContext";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Free Truyen",
  description: "Truyện free cho mọi người!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-200`}
      >
        <React.Suspense fallback={<></>}>
          {/* <DataCommonContextProvider> */}
            <Toaster />
            <Header />
            {children}
            <Footer />
            <ScrollButton />
          {/* </DataCommonContextProvider> */}
        </React.Suspense>
      </body>
    </html>
  );
}
