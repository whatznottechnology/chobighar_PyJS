import type { Metadata } from "next";
import { Inter, Playfair_Display, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StickyWhatsApp from "../../components/StickyWhatsApp";
import FirstTimePopup from "../../components/FirstTimePopup";
import DisableRightClick from "./DisableRightClick";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "Chobighar - Photography & Videography",
  description: "Professional photography and videography services by Chobighar",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/img/chobighar.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/img/chobighar.png",
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
        <link rel="icon" href="/img/chobighar.png" type="image/png" />
        <link rel="shortcut icon" href="/img/chobighar.png" type="image/png" />
        <link rel="apple-touch-icon" href="/img/chobighar.png" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${hindSiliguri.variable} antialiased`}
      >
        <DisableRightClick />
        <Navbar />
        {children}
        <Footer />
        <StickyWhatsApp />
        <FirstTimePopup />
      </body>
    </html>
  );
}
