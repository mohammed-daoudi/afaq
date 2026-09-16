import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "AFAQ Health | Plateforme Digitale B2B & Vitrine",
  description: "Plateforme digitale unifiée d'AFAQ Health - Distribution de marques de santé et nutrition en Afrique de l'Ouest.",
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${inter.variable}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="font-sans antialiased text-anthracite-soft bg-ivory-soft">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
