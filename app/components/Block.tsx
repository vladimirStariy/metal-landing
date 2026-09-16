import Link from "next/link";
import { Fragment } from "react";

/** Заголовок страницы: хлебные крошки, H1 и лид. */
export function PageHead({
  crumbs,
  title,
  crumbLabel,
  lead,
  eyebrow,
  children,
}: {
  /** Промежуточные звенья без «Главная» и без текущей страницы. */
  crumbs?: { href: string; label: string }[];
  title: string;
  /** Подпись текущей страницы в крошках, если H1 слишком длинный. */
  crumbLabel?: string;
  lead: string;
  eyebrow?: string;
  /** Кнопки или дополнительный контент под лидом. */
  children?: React.ReactNode;
}) {
  return (
    <>
      <nav aria-label="Навигация по сайту" className="mb-8 text-sm text-soft">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-spark-700">
              Главная
            </Link>
          </li>
          {crumbs?.map((c) => (
            <Fragment key={c.href}>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={c.href} className="hover:text-spark-700">
                  {c.label}
                </Link>
              </li>
            </Fragment>
          ))}
          <li aria-hidden="true">/</li>
          <li className="text-body">{crumbLabel ?? title}</li>
        </ol>
      </nav>

      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-spark-100 bg-spark-50 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-spark-700 uppercase">
            <span className="size-1.5 rounded-full bg-spark-500" />
            {eyebrow}
          </p>
        )}
        <h1 className="display text-[clamp(1.8rem,5.4vw,3rem)] break-words normal-case text-head">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-body">{lead}</p>
        {children}
      </div>
    </>
  );
}

/** Фоновая подложка для шапки внутренней страницы. */
export function PageHeadBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-spark-50 via-base to-base" />
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_10%,transparent_75%)]" />
    </div>
  );
}

/** Смысловой блок страницы с заголовком второго уровня. */
export function Block({
  eyebrow,
  title,
  text,
  surface = false,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  surface?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`py-16 md:py-20 ${surface ? "border-y border-line bg-surface" : ""}`}
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-spark-700 uppercase">
            <span className="h-px w-8 bg-spark-500" />
            {eyebrow}
          </p>
          <h2 className="display text-2xl text-head sm:text-3xl">{title}</h2>
          {text && <p className="mt-5 leading-relaxed text-body">{text}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/** Таблица с горизонтальной прокруткой на узких экранах. */
export function DataTable({
  head,
  rows,
}: {
  head: readonly string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-line bg-base">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-6 py-4 text-xs font-bold tracking-[0.14em] text-soft uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-line last:border-0">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`px-6 py-4 align-top ${
                    i === 0 ? "font-semibold text-head" : "text-body"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Раскрывающийся список вопросов и ответов. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
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
          <p className="mt-3 max-w-3xl leading-relaxed text-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
