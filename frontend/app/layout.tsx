import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileNavigation from "../components/layout/MobileNavigation";
import PageTransition from "../components/layout/PageTransition";
import { festivalConfig } from "../data/festival";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  variable: "--font-noto-telugu",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${festivalConfig.festivalName} | ${festivalConfig.villageName} ${festivalConfig.year}`,
  description: festivalConfig.themeMessage,
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoTelugu.variable} antialiased min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <MobileNavigation />
        </LanguageProvider>
      </body>
    </html>
  );
}
