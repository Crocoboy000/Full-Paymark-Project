import type { Metadata, Viewport } from "next";

import "./globals.css";
import SmoothScroll from "@/utils/SmoothScroll";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://paymark.com";
const SITE_NAME = "Paymark";
const SITE_DESCRIPTION =
  "Paymark is a modern financial management platform that helps you track accounts, manage transactions, and grow your money with AI-powered insights.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0E0E",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Modern Financial Management Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "financial management",
    "banking",
    "payments",
    "money management",
    "fintech",
    "Paymark",
    "account tracking",
    "transfers",
    "personal finance",
    "business finance",
  ],
  authors: [{ name: "Paymark" }],
  creator: "Paymark",
  publisher: "Paymark",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Modern Financial Management Platform`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Modern Financial Management Platform`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@paymark",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-tight",
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
      )}
    >
      <head>
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}
        />
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.svg`,
              description: SITE_DESCRIPTION,
              foundingDate: "2024",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@paymark.com",
              },
              sameAs: [
                "https://twitter.com/paymark",
                "https://linkedin.com/company/paymark",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="bg-dark-bg flex font-tight h-full overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}