import Link from "next/link";
import { company } from "./company";
import { Block } from "./components/Block";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Icon from "./components/Icon";
import RequestSection from "./components/RequestSection";
import { contentPages, groupMeta, pageHref } from "./content/pages";
import { advantages } from "./content/site";

const keyNumbers = [
  { label: "Точность обработки", value: "до 0,01 мм" },
  { label: "Токарный участок", value: "Ø 300 × 2000 мм" },
  { label: "Фрезерный участок", value: "1200 × 600 × 140 мм" },
  { label: "Закалка", value: "до 250 кг" },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        {/* ── Почему к нам ─────────────────────────────── */}
        <Block
          eyebrow="Почему к нам"
          title="Что у нас стоит на площадке"
          text="Не «полный цикл» в общих словах, а конкретные участки и цифры, которые можно проверить до заказа."
          surface
        >
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="bg-base p-8 transition-colors hover:bg-spark-50/60"
              >
                <span className="mb-6 grid size-12 place-items-center rounded-sm bg-spark-50 text-spark-600">
                  <Icon name={a.icon} className="size-6" />
                </span>
                <h3 className="display text-xl text-head">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{a.text}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* ── Направления ──────────────────────────────── */}
        <Block
          eyebrow="Услуги и изделия"
          title="Выберите направление"
          text="У каждого направления своя страница: габариты, состав работ, материалы и порядок расчёта по конкретной задаче."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {contentPages.map((p) => (
              <Link
                key={pageHref(p)}
                href={pageHref(p)}
                className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-base p-7 transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)]"
              >
                <span className="hazard-open absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="mb-6 grid size-12 place-items-center rounded-sm border border-line bg-surface text-spark-600 transition-colors group-hover:border-spark-100 group-hover:bg-spark-50">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <span className="text-xs font-semibold tracking-[0.14em] text-soft uppercase">
                  {groupMeta[p.group].label}
                </span>
                <h3 className="display mt-1.5 text-lg text-head">{p.navLabel}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                  {p.navNote}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-bold text-spark-700">
                  Подробнее
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <SecondaryLink href="/uslugi">Все услуги</SecondaryLink>
            <SecondaryLink href="/izdeliya">Что изготавливаем</SecondaryLink>
          </div>
        </Block>

        {/* ── Производство ─────────────────────────────── */}
        <Block
          eyebrow="Производство"
          title="Габариты, по которым стоит проверять подрядчика"
          text="Шесть участков в Новополоцке: токарный, фрезерный, термический, раскрой, гибка и сварка. Полная таблица габаритов и материалы — на странице производства."
          surface
        >
          <div className="overflow-hidden rounded-md border border-line bg-base">
            <div className="hazard h-2" />
            <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {keyNumbers.map((n) => (
                <div key={n.label} className="bg-base p-6">
                  <dt className="text-sm text-body">{n.label}</dt>
                  <dd className="display mt-2 text-2xl normal-case text-spark-600">
                    {n.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <SecondaryLink href="/proizvodstvo">Производственные возможности</SecondaryLink>
            <SecondaryLink href="/kak-rabotaem">Как проходит заказ</SecondaryLink>
          </div>
        </Block>

        {/* ── CTA-полоса ───────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-md bg-ink-900">
              <div className="hazard-open absolute inset-x-0 top-0 h-2.5" />
              <div className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-spark-600/25 blur-[100px]" />
              <div className="relative flex flex-col items-start justify-between gap-8 p-8 pt-11 sm:p-12 sm:pt-14 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <h2 className="display text-2xl text-white sm:text-3xl">
                    Пришлите чертёж — вернём цену и срок
                  </h2>
                  <p className="mt-4 text-white/70">
                    Расчёт бесплатный. Подойдёт чертёж в DWG или PDF, скан или
                    фотография с размерами. Чертежа нет — пришлите фото детали,
                    скажем, что можем повторить.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Link
                    href="/kontakty"
                    className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-500 px-7 py-4 font-semibold whitespace-nowrap text-white transition-colors hover:bg-spark-400"
                  >
                    Заказать расчёт
                  </Link>
                  <a
                    href={company.emailHref}
                    className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-white/25 px-7 py-4 font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/10"
                  >
                    <Icon name="mail" className="size-4 text-spark-400" />
                    Написать на почту
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RequestSection
          title={
            <>
              Обсудим вашу
              <br />
              <span className="text-spark-600">задачу</span>
            </>
          }
          text="Заполните форму или свяжитесь с нами напрямую — как вам удобнее. Чертежи, эскизы и фотографии деталей присылайте на почту."
        />
      </main>

      <Footer />
    </>
  );
}

function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 rounded-sm border border-line-strong bg-base px-6 py-3.5 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
    >
      {children}
      <Icon name="arrow" className="size-4 text-spark-600" />
    </Link>
  );
}
