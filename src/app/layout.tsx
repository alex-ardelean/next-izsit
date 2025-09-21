"use client";
import "../../utils/globalFetch";

import { Inter, DM_Sans, Rajdhani } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Configure DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

// Configure Rajdhani font
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-rajdhani",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    })
  }, []);
  return (
    <html
      lang="en"
      className={clsx(
        "h-full bg-white antialiased",
        inter.variable,
        dmSans.variable
      )}
    >
      <body className="font-sans">{children}</body>
      <GoogleTagManager gtmId="GTM-WVD7N2FP" />
    </html>
  );
}
