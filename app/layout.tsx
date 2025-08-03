import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MetApps - Ethiopian Tools & Utilities",
    template: "%s | MetApps"
  },
  description: "Discover a collection of Ethiopian-focused tools including Amharic alphabet, Geez converters, timezone converter, and cultural utilities. Free online tools for Ethiopian language and culture.",
  keywords: [
    "Ethiopian tools",
    "Amharic alphabet",
    "Geez converter",
    "Ethiopian calendar",
    "Amharic keyboard",
    "Ethiopian timezone",
    "Ethiopian culture",
    "Amharic language",
    "Ethiopian utilities",
    "Ethiopian apps"
  ],
  authors: [{ name: "MetApps" }],
  creator: "MetApps",
  publisher: "MetApps",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://metapps.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://metapps.com',
    title: 'MetApps - Ethiopian Tools & Utilities',
    description: 'Discover a collection of Ethiopian-focused tools including Amharic alphabet, Geez converters, timezone converter, and cultural utilities.',
    siteName: 'MetApps',
    images: [
      {
        url: '/api/og?title=MetApps&description=Ethiopian Tools & Utilities',
        width: 1200,
        height: 630,
        alt: 'MetApps - Ethiopian Tools & Utilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetApps - Ethiopian Tools & Utilities',
    description: 'Discover a collection of Ethiopian-focused tools including Amharic alphabet, Geez converters, timezone converter, and cultural utilities.',
    images: ['/api/og?title=MetApps&description=Ethiopian Tools & Utilities'],
    creator: '@metapps',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
