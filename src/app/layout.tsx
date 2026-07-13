import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { site, services } from "@/lib/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Reliable Electrician — ${site.areaServed}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "electrician",
    "electrical contractor",
    "residential electrician",
    "commercial electrician",
    "fault finding",
    "electric fencing",
    "LED lighting",
    "solar installation",
    "inverter installation",
    "load shedding backup",
    site.areaServed,
    "Paul van der Merwe Electrical",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: `${site.name} — reliable electrician`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Structured data — helps Google understand the local business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: site.name,
  image: `${site.url}/og.svg`,
  "@id": site.url,
  url: site.url,
  telephone: site.phoneE164,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  areaServed: site.areaServed,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "17:00",
    },
  ],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
  })),
  sameAs: [site.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#quote"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bolt focus:px-5 focus:py-2 focus:font-display focus:font-bold focus:text-ink"
        >
          Skip to quote form
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
