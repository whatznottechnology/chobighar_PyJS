import type { Metadata } from "next";
import { Inter, Playfair_Display, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StickyWhatsApp from "../../components/StickyWhatsApp";
import FirstTimePopup from "../../components/FirstTimePopup";
import PWAInstallBanner from "../../components/PWAInstallBanner";
import ClientOnly from "../../components/ClientOnly";
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/img/chobighar.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/img/chobighar.png",
  },
  themeColor: "#B22222",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chobighar",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#B22222" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chobighar" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${hindSiliguri.variable} antialiased`}
      >
        <DisableRightClick />
        <ClientOnly>
          <PWAInstallBanner />
        </ClientOnly>
        <Navbar />
        {children}
        <Footer />
        <StickyWhatsApp />
        <FirstTimePopup />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(reg => console.log('✅ SW registered'))
                  .catch(err => console.error('❌ SW failed:', err));
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
