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

export const metadata: Metadata = {
  title: "AFAQ Health | Laboratoire & Compléments Alimentaires au Maroc",
  description: "AFAQ HEALTH est votre partenaire de confiance en compléments alimentaires et produits de santé au Maroc et en Afrique.",
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { DisableInspect } from '@/components/ui/DisableInspect';

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
