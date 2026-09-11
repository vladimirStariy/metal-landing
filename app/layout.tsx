import type { Metadata, Viewport } from "next";
import { Manrope, Oswald } from "next/font/google";
import { company } from "./company";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Велдинг Тайм — металлообработка и металлоконструкции в Новополоцке",
  description:
    "ООО «Велдинг Тайм»: токарные и фрезерные работы, лазерная и плазменная резка, гибка до 2,5 м, вальцовка до 2 м, сварные металлоконструкции из нержавеющей и чёрной стали, шнеки, ёмкости, транспортёры. Проектирование, монтаж, ремонт. Бесплатный расчёт.",
  keywords: [
    "металлообработка Новополоцк",
    "металлоконструкции Витебская область",
    "лазерная резка металла",
    "плазменная резка",
    "токарные работы",
    "фрезерные работы",
    "вальцовка листа",
    "гибка металла",
    "сварка нержавейки",
    "изготовление шнеков",
    "нестандартное оборудование",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.name,
    title: "Велдинг Тайм — металлообработка и металлоконструкции",
    description:
      "Изготовление деталей по чертежам, сварные металлоконструкции и нестандартное оборудование. Новополоцк, Витебская область. Бесплатный расчёт стоимости.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description:
    "Металлообработка, производство сварных металлоконструкций и нестандартного оборудования.",
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "Новополоцк",
    addressRegion: "Витебская область",
    postalCode: company.zip,
    addressCountry: "BY",
  },
  areaServed: "BY",
  openingHours: "Mo-Fr 08:00-17:00",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
