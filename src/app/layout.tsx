import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { site } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFloat } from "@/components/whatsapp-button";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Clean Air for Homes, Gyms, Schools & Clinics | ${site.brand}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "clean air referral network",
    "YOGa Clean Air",
    "Y-CAB",
    "indoor air quality India",
    "IAQ assessment",
    "PM2.5",
    "fresh air ventilation system",
    "architects",
    "interior designers",
    "HVAC companies",
    "MEP consultants",
    "luxury homes",
    "school air purification",
    "gym air quality",
    "air purification India",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name} — Hospital-grade clean air for the spaces that matter`,
    description: site.description,
    siteName: site.name,
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Hospital-grade clean air, across India`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060d1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <head>
        <noscript>
          {/* If JS is unavailable, never leave scroll-reveal content hidden */}
          <style>{`.ph-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
