import Link from "next/link";
import { company } from "../company";
import { Block, DataTable, FaqList, PageHead, PageHeadBackdrop } from "./Block";
import Footer from "./Footer";
import Header from "./Header";
import Icon from "./Icon";
import RequestSection from "./RequestSection";
import { park } from "../content/production";
import { contentPages, groupMeta, pageHref } from "../content/pages";
import { geoHref, geoPages, type GeoPage as GeoPageData } from "../content/geo";

const specs = [
  { label: "Точность обработки", value: "до 0,01 мм" },
  { label: "Токарный участок", value: "Ø 300 × 2000 мм" },
  { label: "Фрезерный участок", value: "1200 × 600 × 140 мм" },
  { label: "Закалка", value: "до 250 кг" },
];

export default function GeoPage({ page }: { page: GeoPageData }) {
  const others = geoPages.filter((g) => g.slug !== page.slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(page)) }}
        />

        <section className="relative overflow-hidden border-b border-line pt-28 pb-16 md:pt-36 md:pb-20">
          <PageHeadBackdrop />
          <div className="container-x">
            <PageHead
              eyebrow={page.eyebrow}
              title={`Металлообработка в ${page.city.in}`}
              crumbLabel={page.city.nom}
              lead={page.lead}
            >
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakty"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-600 px-7 py-4 font-semibold text-white shadow-[0_14px_34px_-14px_var(--color-spark-600)] transition-colors hover:bg-spark-700"
                >
                  Прислать чертёж на расчёт
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-line-strong bg-base px-7 py-4 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
                >
                  <Icon name="phone" className="size-4 text-spark-600" />
                  {company.phone}
                </a>
              </div>
            </PageHead>

            <div className="mt-14 overflow-hidden rounded-md border border-line bg-base">
              <div className="hazard h-2" />
              <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                {specs.map((s) => (
                  <div key={s.label} className="bg-base p-6">
                    <dt className="text-sm text-body">{s.label}</dt>
                    <dd className="display mt-2 text-2xl normal-case text-spark-600">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <Block
          eyebrow="Логистика"
          title={`Как это работает для заказчика из ${page.city.from}`}
          text={`Производство находится в Новополоцке — ${page.distance}.`}
          surface
        >
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {page.logistics.map((l) => (
              <div key={l.title} className="bg-base p-7">
                <span className="mb-5 grid size-11 place-items-center rounded-sm bg-spark-50 text-spark-600">
                  <Icon name="pin" className="size-5" />
                </span>
                <h2 className="display text-lg text-head">{l.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{l.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          eyebrow="Задачи"
          title="С чем обращаются чаще всего"
          text="Ниже — типовые задачи для промышленности региона, а не перечень заказчиков. Если вашей задачи здесь нет, опишите её: скажем сразу, проходит она по нашим участкам или нет."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {page.demand.map((d) => (
              <div key={d.title} className="rounded-md border border-line bg-base p-7">
                <span className="mb-5 grid size-11 place-items-center rounded-sm bg-spark-50 text-spark-600">
                  <Icon name="gear" className="size-5" />
                </span>
                <h2 className="display text-lg text-head">{d.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{d.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          eyebrow="Производство"
          title="Габариты обработки"
          text="Главный критерий, по которому стоит проверять подрядчика до заказа. Если деталь выходит за эти пределы, напишите — часть задач решается разбивкой конструкции на составные части со сваркой."
          surface
        >
          <DataTable head={park.head} rows={park.rows} />
        </Block>

        <Block
          eyebrow="Направления"
          title="Что именно делаем"
          text="У каждого направления своя страница: состав работ, материалы и порядок расчёта."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contentPages.map((p) => (
              <Link
                key={pageHref(p)}
                href={pageHref(p)}
                className="group flex flex-col rounded-md border border-line bg-base p-6 transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)]"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-soft uppercase">
                  {groupMeta[p.group].label}
                </span>
                <span className="display mt-1.5 text-lg text-head">{p.navLabel}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-body">
                  {p.navNote}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-spark-700">
                  Подробнее
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Block>

        <Block eyebrow="Вопросы и ответы" title={`Заказчики ${page.city.from} спрашивают`} surface>
          <FaqList items={page.faq} />
        </Block>

        <Block eyebrow="Другие города" title="Куда ещё работаем">
          <div className="flex flex-wrap gap-3">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={geoHref(g)}
                className="inline-flex items-center gap-2.5 rounded-sm border border-line-strong bg-base px-6 py-3.5 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
              >
                Металлообработка в {g.city.in}
                <Icon name="arrow" className="size-4 text-spark-600" />
              </Link>
            ))}
          </div>
        </Block>

        <RequestSection
          title={
            <>
              Пришлите чертёж —
              <br />
              вернём <span className="text-spark-600">цену и срок</span>
            </>
          }
          text={`Расчёт бесплатный. Достаточно чертежа, скана или фотографии с размерами. Площадка: ${company.city}, ${company.address}.`}
        />
      </main>
      <Footer />
    </>
  );
}

function jsonLd(page: GeoPageData) {
  const url = `${company.site}${geoHref(page)}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Металлообработка в ${page.city.in}`,
      description: page.description,
      url,
      serviceType: "Механическая обработка металла",
      areaServed: { "@type": "City", name: page.city.nom },
      provider: {
        "@type": "LocalBusiness",
        name: company.name,
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
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: company.site },
        { "@type": "ListItem", position: 2, name: page.city.nom, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}
