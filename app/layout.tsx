import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon-192x192.png`,
  image: `${site.url}/opengraph-image.png`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  sameAs: [site.instagram],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Escape "<" so content can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
