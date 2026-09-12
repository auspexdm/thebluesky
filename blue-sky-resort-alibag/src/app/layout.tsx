import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { ConsentBanner } from "@/components/ConsentBanner";
import { JsonLd, organizationSchema, lodgingBusinessSchema, SITE_URL } from "@/lib/schema";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Blue Sky Resort Alibag — A Coastal Escape Near Varsoli Beach",
    template: "%s | The Blue Sky Resort Alibag",
  },
  description:
    "A boutique coastal resort near Varsoli Beach, Alibag — thoughtful rooms, poolside moments, and space to gather for couples, families, and groups.",
  openGraph: {
    type: "website",
    siteName: "The Blue Sky Resort Alibag",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#123a5c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <ConsentBanner />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={lodgingBusinessSchema()} />
      </body>
    </html>
  );
}
