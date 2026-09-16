"use client";

import { useState } from "react";
import { company } from "../company";
import { contentPages } from "../content/pages";
import Icon from "./Icon";

const fieldClass =
  "w-full rounded-sm border border-line-strong bg-base px-4 py-3.5 text-head placeholder:text-soft outline-none transition-colors focus:border-spark-500 focus:ring-2 focus:ring-spark-100";

export default function RequestForm({
  defaultTopic = "",
}: {
  /** Направление, выбранное заранее — со страницы услуги или изделия. */
  defaultTopic?: string;
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const task = String(data.get("task") ?? "").trim();

    const body = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      topic ? `Задача: ${topic}` : "",
      "",
      "Описание:",
      task || "—",
    ]
      .filter(Boolean)
      .join("\n");

    const href =
      `${company.emailHref}?subject=${encodeURIComponent(
        `Заявка на расчёт — ${name || "сайт"}`,
      )}&body=${encodeURIComponent(body)}`;

    // mailto: — внешний обработчик, а не маршрут Next.js
    const link = document.createElement("a");
    link.href = href;
    link.click();
    setSent(true);
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-base shadow-[0_24px_60px_-32px_rgba(15,20,25,0.4)]">
      <div className="hazard h-2.5" />
      <div className="p-6 sm:p-9">
        {sent ? (
          <div className="flex min-h-80 flex-col items-center justify-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-spark-50 text-spark-600">
              <Icon name="check" className="size-8" />
            </span>
            <h3 className="display mt-6 text-2xl text-head">Заявка сформирована</h3>
            <p className="mt-3 max-w-sm text-body">
              Должно открыться ваше почтовое приложение с готовым письмом — осталось
              нажать «Отправить». Если этого не произошло, напишите нам напрямую или
              позвоните.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={company.emailHref}
                className="rounded-sm border border-line-strong px-5 py-3 text-sm font-semibold text-head hover:bg-surface"
              >
                {company.email}
              </a>
              <a
                href={company.phoneHref}
                className="rounded-sm bg-spark-600 px-5 py-3 text-sm font-semibold text-white hover:bg-spark-700"
              >
                {company.phone}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm text-soft underline-offset-4 hover:text-head hover:underline"
            >
              Заполнить ещё раз
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-body">
                  Ваше имя *
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-body">
                  Телефон *
                </span>
                <input
                  name="phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="+375 (__) ___-__-__"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-body">
                Что нужно сделать
              </span>
              <select name="topic" defaultValue={defaultTopic} className={fieldClass}>
                <option value="">Выберите направление</option>
                {contentPages.map((p) => (
                  <option key={`${p.group}/${p.slug}`} value={p.navLabel}>
                    {p.navLabel}
                  </option>
                ))}
                <option value="Другое">Другое</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-body">
                Описание задачи
              </span>
              <textarea
                name="task"
                rows={4}
                placeholder="Материал, габариты, количество, сроки. Чертежи и фото можно прислать на почту или в мессенджер."
                className={`${fieldClass} resize-y`}
              />
            </label>

            <button
              type="submit"
              className="group mt-2 inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-600 px-7 py-4 font-semibold text-white shadow-[0_14px_34px_-16px_var(--color-spark-600)] transition-colors hover:bg-spark-700"
            >
              Отправить заявку
              <Icon
                name="arrow"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </button>

            <p className="text-xs leading-relaxed text-soft">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              Расчёт стоимости — бесплатный и ни к чему вас не обязывает.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
