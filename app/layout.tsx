import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basementplays.com"),
  title: {
    default: "Basement Plays | Visual Guessing Games",
    template: "%s | Basement Plays",
  },
  description:
    "Play visual guessing games and hidden-object style challenges inspired by gaming and pop culture.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Basement Plays | Visual Guessing Games",
    description:
      "Play visual guessing games and hidden-object style challenges inspired by gaming and pop culture.",
    url: "https://basementplays.com",
    siteName: "Basement Plays",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basement Plays | Visual Guessing Games",
    description:
      "Play visual guessing games and hidden-object style challenges inspired by gaming and pop culture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}