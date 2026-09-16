import Link from "next/link";
import { company } from "../company";
import { park, pricing, stock } from "../content/production";
import { findByKey, groupMeta, pageHref, type ContentPage } from "../content/pages";
import { Block, DataTable, FaqList, PageHead, PageHeadBackdrop } from "./Block";
import Footer from "./Footer";
import Header from "./Header";
import Icon from "./Icon";
import RequestSection from "./RequestSection";

export default function ServicePage({ page }: { page: ContentPage }) {
  const group = groupMeta[page.group];
  const related = page.related
    .map(findByKey)
    .filter((p): p is ContentPage => Boolean(p));

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(page)) }}
        />

        {/* ── Заголовок ─────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-line pt-28 pb-16 md:pt-36 md:pb-20">
          <PageHeadBackdrop />

          <div className="container-x">
            <PageHead
              crumbs={[{ href: `/${page.group}`, label: group.label }]}
              eyebrow={page.eyebrow}
              title={page.h1}
              crumbLabel={page.navLabel}
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

            {/* Цифры */}
            <div className="mt-14 overflow-hidden rounded-md border border-line bg-base">
              <div className="hazard h-2" />
              <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                {page.specs.map((s) => (
                  <div key={s.label} className="bg-base p-6">
                    <dt className="text-sm text-body">{s.label}</dt>
                    <dd className="display mt-2 text-2xl normal-case text-spark-600">
                      {s.value}
                    </dd>
                    {s.note && <p className="mt-1.5 text-xs text-soft">{s.note}</p>}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Что делаем ────────────────────────────────── */}
        <Block eyebrow="Состав работ" title="Что делаем на этой услуге">
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {page.works.map((w) => (
              <div key={w.title} className="bg-base p-7 transition-colors hover:bg-spark-50/60">
                <h3 className="display text-lg text-head">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{w.text}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* ── Типовые позиции ───────────────────────────── */}
        {page.items && (
          <Block
            eyebrow="Номенклатура"
            title={page.items.caption}
            text="Список не закрытый: если нужной позиции здесь нет, опишите задачу — скажем сразу, берём или нет."
            surface
          >
            <DataTable head={page.items.head} rows={page.items.rows} />
          </Block>
        )}

        {/* ── Парк и габариты ───────────────────────────── */}
        {page.showPark && (
          <Block
            eyebrow="Производство"
            title="Габариты обработки"
            text="Габариты — главный критерий, по которому стоит проверять подрядчика. Если ваша деталь выходит за эти пределы, напишите: часть задач решается разбивкой конструкции на составные части со сваркой."
            surface={!page.items}
          >
            <DataTable head={park.head} rows={park.rows} />
          </Block>
        )}

        {/* ── Материалы ─────────────────────────────────── */}
        {page.showStock && (
          <Block eyebrow="Материалы" title="С чем работаем">
            <div className="grid gap-5 sm:grid-cols-2">
              {stock.map((m) => (
                <div
                  key={m.title}
                  className="relative overflow-hidden rounded-md border border-line bg-base p-7 pt-8"
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-spark-500" />
                  <h3 className="display text-lg text-head">{m.title}</h3>
                  <p className="mt-3 leading-relaxed text-body">{m.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm text-soft">
              Марку стали указывайте в заявке: от неё зависят режим обработки,
              возможность закалки и стоимость. Если марка не определена — опишите
              условия работы детали, подберём вариант при расчёте.
            </p>
          </Block>
        )}

        {/* ── Применение ────────────────────────────────── */}
        {page.applications && (
          <Block eyebrow="Когда обращаются" title="Типовые задачи" surface>
            <div className="grid gap-5 md:grid-cols-3">
              {page.applications.map((a) => (
                <div key={a.title} className="rounded-md border border-line bg-base p-7">
                  <span className="mb-5 grid size-11 place-items-center rounded-sm bg-spark-50 text-spark-600">
                    <Icon name="gear" className="size-5" />
                  </span>
                  <h3 className="display text-lg text-head">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{a.text}</p>
                </div>
              ))}
            </div>
          </Block>
        )}

        {/* ── Порядок расчёта ───────────────────────────── */}
        <Block
          eyebrow="Расчёт"
          title="Как считается стоимость"
          text="Цена в механообработке всегда индивидуальна: она складывается из трудоёмкости, материала и требований чертежа. Поэтому мы не публикуем прайс, а считаем по вашей позиции."
        >
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((step, i) => (
              <li
                key={step}
                className="relative overflow-hidden rounded-md border border-line bg-base p-7 pt-8"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-spark-500/70" />
                <span className="display text-4xl text-spark-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-body">{step}</p>
              </li>
            ))}
          </ol>
        </Block>

        {/* ── FAQ ───────────────────────────────────────── */}
        <Block eyebrow="Вопросы и ответы" title="Что спрашивают чаще всего" surface>
          <FaqList items={page.faq} />
        </Block>

        {/* ── Смежные страницы ──────────────────────────── */}
        {related.length > 0 && (
          <Block eyebrow="Смежные направления" title="Что ещё делаем на этой площадке">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={pageHref(r)}
                  href={pageHref(r)}
                  className="group flex flex-col rounded-md border border-line bg-base p-6 transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)]"
                >
                  <span className="text-xs font-semibold tracking-[0.14em] text-soft uppercase">
                    {groupMeta[r.group].label}
                  </span>
                  <span className="display mt-2 text-lg text-head">{r.navLabel}</span>
                  <span className="mt-2 text-sm leading-relaxed text-body">{r.navNote}</span>
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
        )}

        <RequestSection
          title={
            <>
              Пришлите чертёж —
              <br />
              вернём <span className="text-spark-600">цену и срок</span>
            </>
          }
          text="Расчёт бесплатный. Достаточно чертежа, скана или фотографии с размерами. Чертежи и фото деталей присылайте на почту — так расчёт начнётся быстрее."
          defaultTopic={page.navLabel}
        />
      </main>
      <Footer />
    </>
  );
}

function jsonLd(page: ContentPage) {
  const url = `${company.site}${pageHref(page)}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.description,
      url,
      serviceType: page.navLabel,
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
      areaServed: { "@type": "Country", name: "Беларусь" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: company.site },
        {
          "@type": "ListItem",
          position: 2,
          name: groupMeta[page.group].label,
          item: `${company.site}/${page.group}`,
        },
        { "@type": "ListItem", position: 3, name: page.navLabel, item: url },
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
