import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/layout/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GreenCrate — Fresh Workplace Food Delivery",
    template: "%s | GreenCrate",
  },
  description:
    "Premium fruit boxes, catering, and corporate gifts delivered fresh to your workplace. Sustainable, local, and delicious.",
  keywords: ["workplace food", "office fruit delivery", "corporate catering", "healthy office snacks", "Switzerland"],
  openGraph: {
    title: "GreenCrate — Fresh Workplace Food Delivery",
    description: "Premium fruit boxes, catering, and corporate gifts delivered fresh to your workplace.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "GreenCrate",
    locale: "en_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenCrate — Fresh Workplace Food Delivery",
    description: "Premium fruit boxes, catering, and corporate gifts delivered fresh to your workplace.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
