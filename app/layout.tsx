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
  metadataBase: new URL(company.site),
  title: {
    default:
      "Велдинг Тайм — механическая обработка деталей и изготовление металлоконструкций в Новополоцке",
    template: "%s",
  },
  description:
    "ООО «Велдинг Тайм»: изготовление металлоконструкций до 100 тонн в месяц, токарные и фрезерные работы по чертежам с точностью до 0,01 мм, термообработка до 250 кг, лазерная и плазменная резка до 20 и 60 мм, гибка и вальцовка листа до 12 мм, ремонт и производство нестандартного оборудования. Новополоцк, работаем по всей Беларуси.",
  keywords: [
    "механическая обработка металла",
    "изготовление металлоконструкций",
    "сборка и сварка металлоконструкций",
    "лазерная и плазменная резка металла",
    "гибка и вальцовка листа",
    "токарные работы",
    "фрезерные работы по металлу",
    "изготовление деталей по чертежам",
    "изготовление валов",
    "изготовление пресс-форм и штампов",
    "термообработка и закалка деталей",
    "ремкомплекты для оборудования",
    "изготовление шнеков",
    "нестандартное оборудование",
    "металлообработка Новополоцк",
    "металлообработка Беларусь",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.name,
    title: "Велдинг Тайм — механическая обработка деталей и изготовление металлоконструкций",
    description:
      "Токарные и фрезерные работы с точностью до 0,01 мм, металлоконструкции до 100 тонн в месяц, закалка до 250 кг на своей площадке. Новополоцк, Витебская область.",
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
    "Механическая обработка деталей и изготовление металлоконструкций: токарно-фрезерные работы, лазерная и плазменная резка, гибка и вальцовка, сборка и сварка, термообработка, ремонт и производство нестандартного оборудования.",
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
