import type { Metadata } from "next";
import { company } from "../company";
import { PageHead, PageHeadBackdrop } from "../components/Block";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Icon from "../components/Icon";
import RequestSection, { ContactRow } from "../components/RequestSection";

export const metadata: Metadata = {
  title: "Контакты — Велдинг Тайм, Новополоцк",
  description: `Контакты ООО «Велдинг Тайм»: ${company.phone}, ${company.email}. Производство: ${company.addressFull}. Режим работы ${company.hours}, заявки с сайта принимаем круглосуточно.`,
  alternates: { canonical: "/kontakty" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-line pt-28 pb-16 md:pt-36 md:pb-20">
          <PageHeadBackdrop />
          <div className="container-x">
            <PageHead
              eyebrow={`${company.city} · Витебская область`}
              title="Контакты"
              lead="Производство находится в Новополоцке, работаем по всей Беларуси: детали и узлы отправляем транспортными компаниями. Быстрее всего получить ответ — позвонить напрямую и параллельно отправить чертёж на почту."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <ul className="space-y-3">
                <ContactRow
                  icon="phone"
                  label="Телефон"
                  value={company.phone}
                  note={company.phoneRole}
                  href={company.phoneHref}
                />
                <ContactRow
                  icon="mail"
                  label="Электронная почта"
                  value={company.email}
                  note="Чертежи, эскизы, фотографии деталей"
                  href={company.emailHref}
                />
                <ContactRow
                  icon="pin"
                  label="Адрес производства"
                  value={`${company.city}, ${company.address}`}
                  note={`${company.zip}, ${company.region}`}
                />
                <ContactRow
                  icon="clock"
                  label="Режим работы"
                  value={company.hours}
                  note="Заявки с сайта и почту принимаем круглосуточно"
                />
              </ul>

              <div className="flex flex-col gap-5">
                <div className="rounded-md border border-line bg-base p-7">
                  <span className="mb-5 grid size-11 place-items-center rounded-sm bg-spark-50 text-spark-600">
                    <Icon name="draft" className="size-5" />
                  </span>
                  <h2 className="display text-lg text-head">Как прислать чертёж</h2>
                  <p className="mt-3 leading-relaxed text-body">
                    Отправьте файл на{" "}
                    <a
                      href={company.emailHref}
                      className="font-semibold text-spark-700 hover:text-spark-600"
                    >
                      {company.email}
                    </a>{" "}
                    — подойдёт DWG, PDF, скан или фотография чертежа. В письме
                    укажите марку стали, количество и требования к твёрдости, если
                    они есть.
                  </p>
                </div>

                <div className="rounded-md border border-line bg-base p-7">
                  <span className="mb-5 grid size-11 place-items-center rounded-sm bg-spark-50 text-spark-600">
                    <Icon name="factory" className="size-5" />
                  </span>
                  <h2 className="display text-lg text-head">Юридические данные</h2>
                  <p className="mt-3 leading-relaxed text-body">
                    {company.name}
                    <br />
                    {company.addressFull}
                  </p>
                  {company.unp ? (
                    <p className="mt-2 leading-relaxed text-body">УНП {company.unp}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <RequestSection
          eyebrow="Заявка"
          title={
            <>
              Опишите задачу —
              <br />
              вернём <span className="text-spark-600">цену и срок</span>
            </>
          }
          text="Расчёт бесплатный. Если не уверены, что задача наша по габаритам, просто позвоните и опишите её словами — скажем сразу."
        />
      </main>
      <Footer />
    </>
  );
}
