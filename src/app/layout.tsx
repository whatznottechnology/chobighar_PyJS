import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StickyWhatsApp from "../../components/StickyWhatsApp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chabighar - Photography & Videography",
  description: "Professional photography and videography services by Chabighar",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/img/chabighar.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/img/chabighar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/chabighar.png" type="image/png" />
        <link rel="shortcut icon" href="/img/chabighar.png" type="image/png" />
        <link rel="apple-touch-icon" href="/img/chabighar.png" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
