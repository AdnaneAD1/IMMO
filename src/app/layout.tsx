import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImmoMarket - Marketplace Immobilière",
  description: "La marketplace qui réunit particuliers et professionnels pour des transactions immobilières transparentes et sécurisées.",
  keywords: ["immobilier", "vente", "location", "appartement", "maison", "marketplace"],
  authors: [{ name: "ImmoMarket" }],
  openGraph: {
    title: "ImmoMarket - Marketplace Immobilière",
    description: "Trouvez votre bien immobilier idéal sur ImmoMarket",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
