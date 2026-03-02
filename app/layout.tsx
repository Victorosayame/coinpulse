/**
 * ROOT LAYOUT COMPONENT (app/layout.tsx)
 *
 * This is the entry point for the entire Next.js application.
 * Every page in the app/directory inherits this layout.
 *
 * ARCHITECTURE DECISIONS:
 * 1. Uses Next.js App Router with server components
 * 2. Global CSS imported here affects entire app
 * 3. Header component is global (shown on all pages)
 * 4. Dark mode enabled by default for entire app
 * 5. Metadata sets SEO info and browser tab title
 *
 * BUILD PROCESS:
 * Step 1: Initialize Next.js project with TypeScript
 * Step 2: Configure fonts for typography optimization
 * Step 3: Set up global styling with Tailwind
 * Step 4: Create root layout structure
 * Step 5: Enable dark mode with Tailwind config
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// Load Google Fonts with custom CSS variables
// Optimizes font loading and reduces Cumulative Layout Shift (CLS)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Monospace font for code/terminal displays
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO and browser tab configuration
// Controls what appears in browser tabs and search results
export const metadata: Metadata = {
  title: "CoinPulse",
  description:
    "Crypto Screener App with a built-in High-Frequency Terminal & Dashboard",
};

/**
 * RootLayout Component
 *
 * Main layout wrapper for entire application.
 * Accepts children prop which are page components from app directory.
 * All nested pages inherit this layout structure.
 *
 * STRUCTURE:
 * - HTML element with dark mode enabled
 * - Body with font variables applied
 * - Global Header component (navigation bar)
 * - Children prop renders page-specific content
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // dark class enables Tailwind dark mode for entire application
    // Font variables apply Geist typography throughout the app
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header component - Global navigation shown on all pages */}
        <Header />

        {/* Page-specific content renders here via children prop */}
        {children}
      </body>
    </html>
  );
}
