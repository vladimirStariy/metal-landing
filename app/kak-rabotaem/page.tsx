import type { Metadata } from "next";
import Link from "next/link";
import { company } from "../company";
import { Block, FaqList, PageHead, PageHeadBackdrop } from "../components/Block";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Icon from "../components/Icon";
import RequestSection from "../components/RequestSection";
import { pricing } from "../content/production";
import { generalFaq, steps } from "../content/site";

export const metadata: Metadata = {
  title: "Как проходит заказ и из чего складывается цена | Велдинг Тайм",
  description:
    "Порядок работы с ООО «Велдинг Тайм»: что прислать для расчёта, как считается стоимость механообработки, этапы от заявки до отгрузки. Расчёт бесплатный, принимаем чертёж в DWG, PDF, сканом или фотографией.",
  alternates: { canonical: "/kak-rabotaem" },
};

const forQuote = [
  {
    title: "Чертёж или размеры",
    text: "DWG, PDF, скан или фотография чертежа. Главное, чтобы читались размеры и допуски, которые нужно выдержать.",
  },
  {
    title: "Марка стали",
    text: "Если марка не определена — опишите, в каких условиях работает деталь, и мы подберём вариант при расчёте.",
  },
  {
    title: "Количество",
    text: "Одна деталь или партия. Для повторяющегося заказа технологию проработаем отдельно — вторая деталь в партии считается дешевле первой.",
  },
  {
    title: "Требования к твёрдости",
    text: "Если деталь нужно закалить, укажите требуемую твёрдость: закалка выполняется на нашей площадке, в печи до 250 кг.",
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
              eyebrow="Порядок работы"
              title="Как проходит заказ"
              lead="Пять шагов от заявки до отгрузки. Расчёт бесплатный и ни к чему не обязывает: на входе достаточно чертежа или фотографии детали с размерами, всё остальное — наша работа."
            >
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakty"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-600 px-7 py-4 font-semibold text-white shadow-[0_14px_34px_-14px_var(--color-spark-600)] transition-colors hover:bg-spark-700"
                >
                  Отправить заявку
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href={company.emailHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-line-strong bg-base px-7 py-4 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
                >
                  <Icon name="mail" className="size-4 text-spark-600" />
                  Прислать чертёж на почту
                </a>
              </div>
            </PageHead>

            <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="relative overflow-hidden rounded-md border border-line bg-base p-7 pt-8"
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-spark-500/70" />
                  <span className="display text-4xl text-spark-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-3 text-lg text-head">{s.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Block
          eyebrow="Заявка"
          title="Что прислать для расчёта"
          text="Чем полнее исходные данные, тем точнее цена и срок. Но начать можно и с одной фотографии — уточняющие вопросы задаст технолог."
          surface
        >
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {forQuote.map((q) => (
              <div key={q.title} className="bg-base p-7">
                <h3 className="display text-lg text-head">{q.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{q.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          eyebrow="Цена"
          title="Как считается стоимость"
          text="Цена в механообработке всегда индивидуальна: она складывается из трудоёмкости, материала и требований чертежа. Поэтому мы не публикуем прайс за метр или за килограмм, а считаем по конкретной позиции."
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

        <Block
          eyebrow="Вопросы и ответы"
          title="Что спрашивают чаще всего"
          surface
        >
          <FaqList items={[...generalFaq]} />
        </Block>

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
