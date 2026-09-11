import Header from "./components/Header";
import Hero from "./components/Hero";
import Icon from "./components/Icon";
import RequestForm from "./components/RequestForm";
import {
  advantages,
  company,
  faq,
  materials,
  products,
  services,
  steps,
} from "./company";

function SectionHead({
  eyebrow,
  title,
  text,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase ${
          center ? "justify-center" : ""
        } ${dark ? "text-spark-400" : "text-spark-700"}`}
      >
        {!center && <span className="h-px w-8 bg-spark-500" />}
        {eyebrow}
      </p>
      <h2
        className={`display text-3xl sm:text-4xl ${dark ? "text-white" : "text-head"}`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            dark ? "text-white/70" : "text-body"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        {/* ── Преимущества ─────────────────────────────── */}
        <section className="border-y border-line bg-surface py-20 md:py-24">
          <div className="container-x">
            <SectionHead
              eyebrow="Почему к нам"
              title={
                <>
                  Один подрядчик на весь&nbsp;
                  <span className="text-spark-600">цикл работ</span>
                </>
              }
              text="Мы закрываем задачу целиком — от идеи на салфетке до смонтированной конструкции на вашем объекте."
            />

            <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
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
          </div>
        </section>

        {/* ── Услуги ───────────────────────────────────── */}
        <section id="services" className="py-20 md:py-28">
          <div className="container-x">
            <SectionHead
              eyebrow="Услуги"
              title="Что мы делаем"
              text="Механическая обработка, раскрой, формообразование, сварка, проектирование и монтаж — на собственных производственных площадях."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <article
                  key={s.id}
                  className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-base p-7 transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)]"
                >
                  <span className="hazard-open absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="mb-6 grid size-12 place-items-center rounded-sm border border-line bg-surface text-spark-600 transition-colors group-hover:border-spark-100 group-hover:bg-spark-50">
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <h3 className="display text-lg text-head">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{s.text}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-body">
                    {s.items.map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-spark-600" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Возможности и материалы ──────────────────── */}
        <section
          id="capabilities"
          className="relative overflow-hidden border-y border-line bg-surface py-20 md:py-28"
        >
          <div className="pointer-events-none absolute top-1/2 -left-40 size-[28rem] -translate-y-1/2 rounded-full bg-spark-100/50 blur-[120px]" />
          <div className="container-x relative">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <SectionHead
                  eyebrow="Возможности"
                  title="Габариты и материалы"
                  text="Если деталь больше наших габаритов — разбиваем конструкцию на секции и собираем её сваркой. Решение предложим на этапе расчёта."
                />
                <a
                  href="#request"
                  className="mt-8 inline-flex items-center gap-2.5 text-sm font-bold text-spark-700 hover:text-spark-600"
                >
                  Проверить вашу задачу
                  <Icon name="arrow" className="size-4" />
                </a>
              </div>

              <div className="space-y-5">
                <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
                  {[
                    { t: "Вальцовка листа", v: "до 2 000 мм", n: "обечайки, царги, конусы" },
                    { t: "Гибка листа", v: "до 2 500 мм", n: "короба, отбортовки, профили" },
                    { t: "Резка", v: "лазер · плазма", n: "точный контур, чистый рез" },
                    { t: "Рубка", v: "гильотина", n: "быстрый раскрой листа" },
                    { t: "Токарные работы", v: "по чертежу", n: "валы, втулки, фланцы" },
                    { t: "Фрезерные работы", v: "по чертежу", n: "корпусные детали, пазы" },
                    { t: "Наплавка", v: "восстановление", n: "изношенные поверхности" },
                    { t: "Сварка", v: "нерж. · чёрный металл", n: "конструкции и сборки" },
                  ].map((row) => (
                    <div key={row.t} className="bg-base p-6">
                      <p className="text-sm text-body">{row.t}</p>
                      <p className="display mt-1.5 text-xl normal-case text-head">{row.v}</p>
                      <p className="mt-1 text-xs text-soft">{row.n}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  {materials.map((m) => (
                    <div
                      key={m.title}
                      className="relative overflow-hidden rounded-md border border-line bg-base p-6 pt-7"
                    >
                      <span className="absolute inset-x-0 top-0 h-1 bg-spark-500" />
                      <h3 className="font-bold text-head">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Что изготавливаем ────────────────────────── */}
        <section id="products" className="py-20 md:py-28">
          <div className="container-x">
            <SectionHead
              eyebrow="Продукция"
              title="Что чаще всего заказывают"
              text="Список не закрытый: если изделия нет в перечне — опишите задачу, скорее всего мы её решим."
              center
            />
            <ul className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2">
              {products.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3.5 rounded-sm border border-line bg-base px-5 py-4 font-medium text-head transition-colors hover:border-spark-300 hover:bg-spark-50/60"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-spark-50 text-spark-600">
                    <Icon name="check" className="size-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Как работаем ─────────────────────────────── */}
        <section id="process" className="border-y border-line bg-surface py-20 md:py-28">
          <div className="container-x">
            <SectionHead
              eyebrow="Процесс"
              title="Как проходит заказ"
              text="Прозрачные этапы: вы всегда знаете, на какой стадии находится ваш заказ."
            />
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
                  <h3 className="display mt-3 text-lg text-head">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

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
                    Расчёт бесплатный. Достаточно чертежа, эскиза или описания
                    задачи: посчитаем материал, работу и предложим оптимальную
                    технологию изготовления.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <a
                    href="#request"
                    className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-500 px-7 py-4 font-semibold whitespace-nowrap text-white transition-colors hover:bg-spark-400"
                  >
                    Заказать расчёт
                  </a>
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

        {/* ── FAQ ──────────────────────────────────────── */}
        <section id="faq" className="py-20 md:py-28">
          <div className="container-x">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <SectionHead
                eyebrow="Вопросы и ответы"
                title="Коротко о главном"
                text="Не нашли свой вопрос? Позвоните — ответим сразу."
              />
              <div className="divide-y divide-line border-y border-line">
                {faq.map((item) => (
                  <details key={item.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-head marker:content-none">
                      {item.q}
                      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-sm border border-line-strong text-spark-600 transition-transform group-open:rotate-45">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl leading-relaxed text-body">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Заявка + контакты ────────────────────────── */}
        <section
          id="request"
          className="relative scroll-mt-24 overflow-hidden border-t border-line bg-surface py-20 md:py-28"
        >
          <div className="pointer-events-none absolute -top-32 right-0 size-[32rem] rounded-full bg-spark-100/50 blur-[130px]" />
          <div className="container-x relative">
            <div id="contacts" className="grid scroll-mt-24 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHead
                  eyebrow="Бесплатный расчёт"
                  title={
                    <>
                      Обсудим вашу
                      <br />
                      <span className="text-spark-600">задачу</span>
                    </>
                  }
                  text="Заполните форму или свяжитесь с нами напрямую — как вам удобнее. Чертежи, эскизы и фото присылайте на почту."
                />

                <ul className="mt-10 space-y-3">
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
                    note="Чертежи, эскизы, техзадание"
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
                    note="Заявки с сайта принимаем круглосуточно"
                  />
                </ul>
              </div>

              <RequestForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  note,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  note?: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-spark-50 text-spark-600">
        <Icon name={icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold tracking-[0.14em] text-soft uppercase">
          {label}
        </span>
        <span className="mt-1 block font-bold break-words text-head">{value}</span>
        {note && <span className="mt-0.5 block text-sm text-soft">{note}</span>}
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex items-start gap-4 rounded-md border border-line bg-base p-5 transition-colors hover:border-spark-300 hover:bg-spark-50/60"
        >
          {inner}
        </a>
      ) : (
        <div className="flex items-start gap-4 rounded-md border border-line bg-base p-5">
          {inner}
        </div>
      )}
    </li>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="hazard h-1.5" />
      <div className="container-x py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="display text-lg text-white">{company.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {company.tagline}. {company.addressFull}
            </p>
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
