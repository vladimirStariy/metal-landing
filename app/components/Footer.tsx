import Link from "next/link";
import { company } from "../company";
import { groupMeta, pagesOf, pageHref } from "../content/pages";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="hazard h-1.5" />
      <div className="container-x py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <p className="display text-lg text-white">{company.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {company.tagline}. {company.addressFull}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn
              title={groupMeta.uslugi.label}
              links={pagesOf("uslugi").map((p) => ({
                href: pageHref(p),
                label: p.navLabel,
              }))}
            />
            <FooterColumn
              title={groupMeta.izdeliya.label}
              links={pagesOf("izdeliya").map((p) => ({
                href: pageHref(p),
                label: p.navLabel,
              }))}
            />
            <FooterColumn
              title="О производстве"
              links={[
                { href: "/proizvodstvo", label: "Производственные возможности" },
                { href: "/kak-rabotaem", label: "Как проходит заказ и цены" },
                { href: "/kontakty", label: "Контакты" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2 text-sm md:items-end">
            <a
              href={company.phoneHref}
              className="text-lg font-bold text-white hover:text-spark-400"
            >
              {company.phone}
            </a>
            <a href={company.emailHref} className="hover:text-white">
              {company.email}
            </a>
            <p className="text-white/55">{company.hours}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. Все права защищены.
          </p>
          <p>
            Информация на сайте не является публичной офертой. Стоимость
            уточняйте при расчёте.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
