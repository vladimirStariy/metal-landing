import Link from "next/link";
import { park } from "../content/production";
import { groupMeta, pagesOf, pageHref, type PageGroup } from "../content/pages";
import { Block, DataTable, PageHead, PageHeadBackdrop } from "./Block";
import Footer from "./Footer";
import Header from "./Header";
import Icon from "./Icon";
import RequestSection from "./RequestSection";

export default function GroupPage({ group }: { group: PageGroup }) {
  const meta = groupMeta[group];
  const pages = pagesOf(group);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-line pt-28 pb-16 md:pt-36 md:pb-20">
          <PageHeadBackdrop />

          <div className="container-x">
            <PageHead title={meta.label} lead={meta.lead} />

            <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {pages.map((p) => (
                <Link
                  key={pageHref(p)}
                  href={pageHref(p)}
                  className="group flex flex-col bg-base p-8 transition-colors hover:bg-spark-50/60"
                >
                  <h2 className="display text-xl text-head">{p.navLabel}</h2>
                  <p className="mt-2.5 text-sm text-soft">{p.navNote}</p>
                  <p className="mt-4 leading-relaxed text-body">{p.lead.split(". ")[0]}.</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-spark-700">
                    Открыть страницу
                    <Icon
                      name="arrow"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Block
          eyebrow="Производство"
          title="Габариты обработки"
          text="Все участки находятся на одной площадке в Новополоцке. Деталь не передаётся между подрядчиками: обработка, закалка, раскрой и сварка выполняются у нас."
          surface
        >
          <DataTable head={park.head} rows={park.rows} />
        </Block>

        <RequestSection
          title={
            <>
              Пришлите чертёж —
              <br />
              вернём <span className="text-spark-600">цену и срок</span>
            </>
          }
          text="Расчёт бесплатный. Достаточно чертежа, скана или фотографии с размерами. Если не уверены, что задача наша — просто позвоните и опишите её словами."
        />
      </main>
      <Footer />
    </>
  );
}
