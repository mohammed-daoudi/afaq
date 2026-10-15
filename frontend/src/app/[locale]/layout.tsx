import type { Metadata } from "next";
import { Outfit, Inter, Poppins } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

import { getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "AFAQ HEALTH | Compléments Alimentaires & Santé au Maroc",
    template: "%s | AFAQ HEALTH",
  },
  description: "AFAQ HEALTH représente des marques européennes certifiées de compléments alimentaires au Maroc. Retrouvez nos produits en pharmacie.",
  alternates: {
    canonical: getSiteUrl(),
    languages: {
      'fr': getSiteUrl(),
      'en': `${getSiteUrl()}/en`,
      'ar': `${getSiteUrl()}/ar`,
      'x-default': getSiteUrl(),
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "ar_MA"],
    url: getSiteUrl(),
    siteName: "AFAQ HEALTH",
    title: "AFAQ HEALTH | Compléments Alimentaires & Santé au Maroc",
    description: "AFAQ HEALTH représente des marques européennes certifiées de compléments alimentaires au Maroc. Retrouvez nos produits en pharmacie.",
    images: [
      {
        url: `${getSiteUrl()}/icon.png`,
        width: 512,
        height: 512,
        alt: "AFAQ HEALTH Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFAQ HEALTH | Compléments Alimentaires & Santé au Maroc",
    description: "AFAQ HEALTH représente des marques européennes certifiées de compléments alimentaires au Maroc. Retrouvez nos produits en pharmacie.",
    images: [`${getSiteUrl()}/icon.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { DisableInspect } from '@/components/ui/DisableInspect';
import { CookiePreferencesProvider } from '@/context/CookiePreferencesContext';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${inter.variable} ${poppins.variable}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased text-anthracite-soft bg-ivory-soft">
        <DisableInspect />
        <NextIntlClientProvider messages={messages}>
          <CookiePreferencesProvider>
            {children}
          </CookiePreferencesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
