import type { Metadata } from "next";
import GeoPage from "../components/GeoPage";
import { findGeo } from "../content/geo";

const page = findGeo("metalloobrabotka-novopolotsk")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/metalloobrabotka-novopolotsk" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: `Металлообработка в ${page.city.in} — Велдинг Тайм`,
    description: page.description,
    url: "/metalloobrabotka-novopolotsk",
  },
};

export default function Page() {
  return <GeoPage page={page} />;
}
