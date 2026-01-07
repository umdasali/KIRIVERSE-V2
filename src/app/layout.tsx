// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MainLayout from "@/components/Layout/MainLayout";
import Script from "next/script";

const siteUrl = "https://www.kiriverse.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
    template: "%s",
  },
  description:
    "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
  keywords: [
    "anime news",
    "manga updates",
    "gaming news",
    "video game reviews",
    "technology news",
    "tech trends",
    "entertainment news",
    "pop culture",
    "anime gaming website",
    "geek culture",
    "fandom news",
    "KiriVerse",
  ],
  authors: [{ name: "KiriVerse Editorial Team", url: `${siteUrl}/about` }],
  creator: "KiriVerse",
  publisher: "KiriVerse Media",
  category: "News & Media",
  classification: "Anime and Gaming News Publication",
  openGraph: {
    title: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
    description:
      "Read the latest on anime, games, cosplay, and Japanese pop culture. KiriVerse delivers global coverage for otaku and gamers alike.",
    url: siteUrl,
    siteName: "KiriVerse",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-images/home.jpg`,
        width: 1200,
        height: 630,
        alt: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kiriverse",
    creator: "@kiriverse",
    title: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
    description:
      "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
    images: [`${siteUrl}/og-images/Home.webp`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#e64c70",
    "msapplication-TileColor": "#e64c70",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "KiriVerse",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "KiriVerse",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://www.reddit.com/user/FateArt/",
      "https://x.com/KIRI_VERSE",
      "https://www.instagram.com/kiriverseofficial/",
    ],
    description:
      "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
    founder: {
      "@type": "Person",
      name: "KiriVerse Team",
    },
    inLanguage: "en-US",
  };

  return (
    <html lang="en">
      <head>
        {/* General Meta */}
        <meta name="theme-color" content="#e64c70" />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="google-adsense-account" content="ca-pub-1317494719665209" />

        {/* Verification */}
        <meta name="msvalidate.01" content="FDB30E06DE1EEC231EE5C1A071AAF3C2" />
        <meta name="yandex-verification" content="592c3a6dab54dd68" />

        {/* google Ads */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1317494719665209"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T6M2DEYBJ5"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T6M2DEYBJ5');
          `}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="9fblO84AwHYZceJRFHZtog"
          async
        ></Script>

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="site-root">
        <Header />
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}
