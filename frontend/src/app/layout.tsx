import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-anthracite-soft bg-ivory-soft">
        {children}
      </body>
    </html>
  );
}

