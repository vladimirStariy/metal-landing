import { capabilities, company } from "../company";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-spark-50 via-base to-base" />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_10%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-spark-300/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-spark-100/60 blur-[120px]" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="rise">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-spark-100 bg-spark-50 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-spark-700 uppercase">
              <span className="size-1.5 rounded-full bg-spark-500" />
              {company.city} · Витебская область
            </p>

            <h1 className="display text-[clamp(1.9rem,7.2vw,3.65rem)] break-words text-head">
              Металлообработка
              <br />и сварные
              <br />
              <span className="text-spark-600">металлоконструкции</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">
              Изготавливаем детали по вашим чертежам, сварные конструкции из
              нержавеющей и чёрной стали, а также нестандартное оборудование —
              шнеки, ёмкости, транспортёры. Нет чертежа — разработаем сами.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#request"
                className="group inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-600 px-7 py-4 font-semibold text-white shadow-[0_14px_34px_-14px_var(--color-spark-600)] transition-colors hover:bg-spark-700"
              >
                Получить бесплатный расчёт
                <Icon
                  name="arrow"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href={company.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-line-strong bg-base px-7 py-4 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
              >
                <Icon name="phone" className="size-4 text-spark-600" />
                {company.phone}
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-body">
              {[
                "Работаем по чертежу и по эскизу",
                "Единичные заказы и серии",
                "Расчёт — бесплатно",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" className="size-4 shrink-0 text-spark-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Карточка возможностей */}
          <div className="rise [animation-delay:120ms]">
            <div className="overflow-hidden rounded-md border border-line bg-base shadow-[0_24px_60px_-30px_rgba(15,20,25,0.35)]">
              <div className="hazard h-2.5" />
              <div className="p-7 sm:p-8">
                <p className="display text-sm tracking-[0.18em] text-soft">
                  Производственные возможности
                </p>
                <dl className="mt-6 divide-y divide-line">
                  {capabilities.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="max-w-[200px]">
                        <dt className="font-semibold text-head ">{c.label}</dt>
                      </div>
                      <div className="flex flex-col items-end">
                        <dd className="display shrink-0 text-right text-lg normal-case text-spark-600">
                          {c.value}
                        </dd>
                        <div className="max-w-[200px] text-right">
                          <p className="mt-0.5 text-xs text-soft">{c.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
