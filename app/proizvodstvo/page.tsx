import type { Metadata } from "next";
import Link from "next/link";
import { company } from "../company";
import { Block, DataTable, PageHead, PageHeadBackdrop } from "../components/Block";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Icon from "../components/Icon";
import RequestSection from "../components/RequestSection";
import { park, stock } from "../content/production";
import { documents } from "../content/site";
import { contentPages, pageHref } from "../content/pages";

export const metadata: Metadata = {
  title:
    "Производственные возможности — станки, габариты, материалы | Велдинг Тайм",
  description:
    "Производственные возможности ООО «Велдинг Тайм»: токарная обработка Ø до 300 мм и длиной до 2000 мм, фрезеровка до 1200×600×140 мм с точностью 0,01 мм, закалка до 250 кг, лазер до 20 мм и плазма до 60 мм на поле 1500×6000, гибка и вальцовка до 2500 мм.",
  alternates: { canonical: "/proizvodstvo" },
};

const areas = [
  {
    icon: "lathe",
    title: "Токарный участок",
    value: "Ø 300 × 2000 мм",
    text: "Детали вращения диаметром до 300 мм и длиной до 2000 мм: валы, оси, втулки, фланцы, кольца. Точность до 0,01 мм.",
  },
  {
    icon: "gear",
    title: "Фрезерный участок",
    value: "1200 × 600 × 140 мм",
    text: "Плиты, корпусные детали, пазы и посадочные места. Для мелких позиций работает второй участок с полем 450 × 300 мм.",
  },
  {
    icon: "shield",
    title: "Термическая печь",
    value: "до 250 кг",
    text: "Рабочее пространство 2000 × 750 × 750 мм. По длине проходят детали до двух метров — столько же, сколько берёт токарный станок.",
  },
  {
    icon: "laser",
    title: "Лазерная и плазменная резка",
    value: "до 20 и 60 мм",
    text: "Поле 1500 × 6000 мм. Лазер — до 20 мм, плазма — до 60 мм, поэтому толстый металл режется здесь же, а не у подрядчика.",
  },
  {
    icon: "bend",
    title: "Гибка и вальцовка листа",
    value: "до 2500 мм",
    text: "Длина до 2500 мм при толщине листа до 20 мм — заметно выше типового предложения по рынку.",
  },
  {
    icon: "weld",
    title: "Сварочный участок",
    value: "сталь и нержавейка",
    text: "Сварка металлоконструкций из чёрного металла и нержавеющей стали с действующими сертификатами и свидетельствами.",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-line pt-28 pb-16 md:pt-36 md:pb-20">
          <PageHeadBackdrop />
          <div className="container-x">
            <PageHead
              eyebrow="Одна площадка в Новополоцке"
              title="Производственные возможности"
              lead="Шесть участков на одной площадке: токарный, фрезерный, термический, раскрой, гибка и сварка. Деталь не передаётся между подрядчиками — от заготовки до закалки она остаётся у нас, поэтому сроки и геометрию контролируем мы, а не чужая очередь."
            />

            <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((a) => (
                <div key={a.title} className="bg-base p-7">
                  <span className="mb-6 grid size-12 place-items-center rounded-sm bg-spark-50 text-spark-600">
                    <Icon name={a.icon} className="size-6" />
                  </span>
                  <h2 className="display text-lg text-head">{a.title}</h2>
                  <p className="display mt-2 text-xl normal-case text-spark-600">
                    {a.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Block
          eyebrow="Габариты"
          title="Что проходит по размерам"
          text="Габариты — главный критерий, по которому стоит проверять подрядчика. Если деталь выходит за эти пределы, напишите: часть задач решается разбивкой конструкции на составные части со сваркой."
          surface
        >
          <DataTable head={park.head} rows={park.rows} />
        </Block>

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

        <Block eyebrow="Подтверждение" title="Чем подкреплено качество" surface>
          <div className="grid gap-5 sm:grid-cols-2">
            {documents.map((d) => (
              <div key={d.title} className="rounded-md border border-line bg-base p-7">
                <span className="mb-5 grid size-11 place-items-center rounded-sm bg-spark-50 text-spark-600">
                  <Icon name="shield" className="size-5" />
                </span>
                <h3 className="display text-lg text-head">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{d.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          eyebrow="Направления"
          title="Что делаем на этих участках"
          text="Каждая страница отвечает за одно направление: там габариты, состав работ и порядок расчёта по конкретной задаче."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contentPages.map((p) => (
              <Link
                key={pageHref(p)}
                href={pageHref(p)}
                className="group flex flex-col rounded-md border border-line bg-base p-6 transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)]"
              >
                <span className="display text-lg text-head">{p.navLabel}</span>
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

        <RequestSection
          title={
            <>
              Проверим вашу задачу
              <br />
              по <span className="text-spark-600">габаритам</span>
            </>
          }
          text={`Пришлите чертёж — скажем сразу, проходит деталь по нашим участкам или нет. Если не проходит, предложим, как разбить конструкцию. Площадка: ${company.city}, ${company.address}.`}
        />
      </main>
      <Footer />
    </>
  );
}
