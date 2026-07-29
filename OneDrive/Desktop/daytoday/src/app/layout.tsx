import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ninety",
  description: "Track your 90-day challenge and build new habits with Ninety.",
};

export const viewport: Viewport = {
  themeColor: "#f8f9fa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col md:flex-row bg-background text-text-primary">
        <Navigation />
        <main className="flex-1 max-w-3xl mx-auto w-full pb-24 md:pb-8 pt-6 px-4 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
