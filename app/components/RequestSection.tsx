import { company } from "../company";
import Icon from "./Icon";
import RequestForm from "./RequestForm";

export default function RequestSection({
  eyebrow = "Бесплатный расчёт",
  title,
  text,
  defaultTopic,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text: string;
  /** Предзаполненное направление в форме. */
  defaultTopic?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-surface py-20 md:py-28">
      <div className="pointer-events-none absolute -top-32 right-0 size-[32rem] rounded-full bg-spark-100/50 blur-[130px]" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-spark-700 uppercase">
              <span className="h-px w-8 bg-spark-500" />
              {eyebrow}
            </p>
            <h2 className="display text-3xl text-head sm:text-4xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-body">{text}</p>

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
                note="Заявки с сайта принимаем круглосуточно"
              />
            </ul>
          </div>

          <RequestForm defaultTopic={defaultTopic} />
        </div>
      </div>
    </section>
  );
}

export function ContactRow({
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
