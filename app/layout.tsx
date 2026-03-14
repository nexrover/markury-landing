import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.markury.app"),
  title: {
    default: "Markury | Screen Annotation Made Simple",
    template: "%s | Markury",
  },
  description:
    "Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.",
  keywords: [
    "screen annotation",
    "drawing tool",
    "presentation software",
    "screen marker",
    "digital whiteboard",
    "teaching tool",
    "screen recording",
    "pdf annotation",
    "pdf highlighter",
    "slide annotation",
    "slide highlighter",
    "presentation tool",
  ],
  authors: [{ name: "NexRover Team", url: "https://www.nexrover.com" }],
  creator: "NexRover",
  publisher: "NexRover",
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    url: "https://www.markury.app",
    title: "Markury | Screen Annotation Made Simple",
    description:
      "Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.",
    type: "website",
    locale: "en_US",
    siteName: "Markury",
    images: [
      {
        url: "/markury_og.png",
        width: 1200,
        height: 630,
        alt: "Markury - Screen Annotation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markury | Screen Annotation Made Simple",
    description:
      "Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.",
    images: ["/markury_og.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": "https://www.markury.app/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className="bg-white text-gray-900 font-sans"
        suppressHydrationWarning
      >
        {children}
        <Script id="crisp-chat" strategy="lazyOnload">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID="c5564772-c0c5-464c-8f4d-d8cf3baad833";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
        </Script>
        <Script id="item-json-ld" type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Markury",
                "url": "https://www.markury.app/"
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Markury",
                "operatingSystem": "Windows 10, Windows 11, macOS 12+",
                "applicationCategory": "ProductivityApplication",
                "description": "The modern, lightweight screen annotation tool. Draw, highlight, and present over any app.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "120"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "offerCount": "2",
                  "lowPrice": "19.00",
                  "highPrice": "39.00",
                  "priceCurrency": "USD",
                  "offers": [
                    {
                      "@type": "Offer",
                      "name": "Markury Pro — Yearly",
                      "price": "19.00",
                      "priceCurrency": "USD",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "referenceQuantity": {
                          "@type": "QuantitativeValue",
                          "value": "1",
                          "unitCode": "ANN"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "name": "Markury Pro — Lifetime Access",
                      "price": "39.00",
                      "priceCurrency": "USD"
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Markury Demo — Screen Annotation Tool",
                "description": "See Markury in action. Draw, highlight, and annotate directly on your screen with the modern, lightweight annotation tool for Mac and Windows.",
                "thumbnailUrl": "https://www.markury.app/markury_og.png",
                "contentUrl": "https://ftp.markury.app/demo-final.webm",
                "uploadDate": "2026-02-14T00:00:00+00:00",
                "duration": "PT1M30S",
                "embedUrl": "https://www.markury.app/",
                "publisher": {
                  "@type": "Organization",
                  "name": "Markury",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.markury.app/favicon/favicon-96x96.png"
                  }
                }
              }
            ]
          `}
        </Script>
        <GoogleAnalytics />
        <CookieBanner />
      </body>
    </html>
  );
}
