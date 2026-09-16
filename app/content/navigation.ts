import { pagesOf, pageHref } from "./pages";
import { geoPages, geoHref } from "./geo";

export type NavLink = {
  href: string;
  label: string;
  /** Подпись под ссылкой в выпадающем меню. */
  note?: string;
};

export type NavItem = NavLink & {
  /** Если заданы — пункт раскрывается выпадающим списком. */
  children?: NavLink[];
};

/** Главное меню. Раскрываются только разделы с дочерними страницами. */
export const mainNav: NavItem[] = [
  {
    href: "/uslugi",
    label: "Услуги",
    children: pagesOf("uslugi").map((p) => ({
      href: pageHref(p),
      label: p.navLabel,
      note: p.navNote,
    })),
  },
  {
    href: "/izdeliya",
    label: "Что изготавливаем",
    children: pagesOf("izdeliya").map((p) => ({
      href: pageHref(p),
      label: p.navLabel,
      note: p.navNote,
    })),
  },
  { href: "/proizvodstvo", label: "Производство" },
  { href: "/kak-rabotaem", label: "Как работаем" },
  { href: "/kontakty", label: "Контакты" },
];

/** Города — в подвале, чтобы не раздувать меню. */
export const geoNav: NavLink[] = geoPages.map((g) => ({
  href: geoHref(g),
  label: g.city.nom,
}));
