import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/app-ui/Navigation";
import Footer from "@/components/app-ui/footer-design/Footer";
import Ads from "@/components/app-ui/Ads";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skin care brand",
  description: "Afordable skincare cilinc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f2f1]`}
      >
        <Ads />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
