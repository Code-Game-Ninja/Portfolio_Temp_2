import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Rivera — Creative Developer",
  description:
    "High-performance web experiences blending motion, storytelling, and engineering craft.",
  metadataBase: new URL("https://portfolio.example.com"),
  openGraph: {
    title: "Alex Rivera — Creative Developer",
    description:
      "High-performance web experiences blending motion, storytelling, and engineering craft.",
    type: "website",
    url: "https://portfolio.example.com",
    siteName: "Alex Rivera Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera — Creative Developer",
    description:
      "High-performance web experiences blending motion, storytelling, and engineering craft.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        {children}
        <AnimatedBlobs />
        <Cursor />
      </body>
    </html>
  );
}
