"use client";

import { useRef, useState } from "react";
import { company } from "../company";
import Icon from "./Icon";

const fieldClass =
  "w-full rounded-sm border border-line-strong bg-base px-4 py-3.5 text-head placeholder:text-soft outline-none transition-colors focus:border-spark-500 focus:ring-2 focus:ring-spark-100";

// FormSubmit принимает до 10 МБ файлов на заявку — оставляем запас на поля.
const MAX_FILES_BYTES = 9.5 * 1024 * 1024;

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} КБ`
    : `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} МБ`;
}

export default function RequestForm({
  defaultTopic = "",
}: {
  /** Направление, выбранное заранее — со страницы услуги или изделия. */
  defaultTopic?: string;
}) {
  // idle → sending → sent (ушло через FormSubmit) | mailed (открыт почтовый клиент) | error
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "mailed" | "error"
  >("idle");
  const sendingRef = useRef(false); // синхронная защита от двойной отправки
  const [mailHref, setMailHref] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const filesBytes = files.reduce((sum, f) => sum + f.size, 0);
  const tooBig = filesBytes > MAX_FILES_BYTES;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current || tooBig) return;
    // Имена полей — подписи в письме FormSubmit
    const data = new FormData(e.currentTarget);
    const name = String(data.get("Имя") ?? "").trim();
    const phone = String(data.get("Телефон") ?? "").trim();
    const topic = String(data.get("Направление") ?? "").trim();
    const task = String(data.get("Описание") ?? "").trim();
    const subject = `Заявка на расчёт — ${name || "сайт"}`;

    // Письмо для почтового клиента — запасной путь (файлы к mailto не прикрепить)
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

    const href = `${company.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setMailHref(href);

    const endpoint: string = company.formEndpoint;
    if (!endpoint) {
      // mailto: — внешний обработчик, а не маршрут Next.js
      const link = document.createElement("a");
      link.href = href;
      link.click();
      setStatus("mailed");
      return;
    }

    data.set("_subject", subject);
    data.set("_template", "table");
    // FormSubmit документирует несколько полей-файлов, а не несколько файлов
    // в одном поле — раскладываем каждый файл в своё поле
    data.delete("attachment");
    files.forEach((file, i) => data.append(`attachment${i + 1}`, file));

    sendingRef.current = true;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      // FormSubmit отвечает {"success": "true"} строкой; неподтверждённая почта — "false"
      const json = await res.json().catch(() => null);
      const ok = res.ok && String(json?.success) === "true";
      if (!ok) console.error("FormSubmit:", res.status, json);
      if (ok) setFiles([]);
      setStatus(ok ? "sent" : "error");
    } catch (err) {
      console.error("FormSubmit:", err);
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  const done = status === "sent" || status === "mailed";

  return (
    <div className="overflow-hidden rounded-md border border-line bg-base shadow-[0_24px_60px_-32px_rgba(15,20,25,0.4)]">
      <div className="hazard h-2.5" />
      <div className="p-6 sm:p-9">
        {done ? (
          <div className="flex min-h-80 flex-col items-center justify-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-spark-50 text-spark-600">
              <Icon name="check" className="size-8" />
            </span>
            {status === "sent" ? (
              <>
                <h3 className="display mt-6 text-2xl text-head">Заявка отправлена</h3>
                <p className="mt-3 max-w-sm text-body">
                  Спасибо! Мы свяжемся с вами в рабочее время ({company.hours}).
                  Если вопрос срочный — позвоните.
                </p>
              </>
            ) : (
              <>
                <h3 className="display mt-6 text-2xl text-head">Заявка сформирована</h3>
                <p className="mt-3 max-w-sm text-body">
                  Должно открыться ваше почтовое приложение с готовым письмом — осталось
                  нажать «Отправить». Если этого не произошло, напишите нам напрямую или
                  позвоните.
                </p>
              </>
            )}
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
              onClick={() => setStatus("idle")}
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
                  name="Имя"
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
                  name="Телефон"
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
                Описание задачи
              </span>
              <textarea
                name="Описание"
                rows={4}
                placeholder="Материал, габариты, количество, сроки."
                className={`${fieldClass} resize-y`}
              />
            </label>

            <div>
              <span className="mb-2 block text-sm font-medium text-body">
                Чертежи и фото
              </span>
              <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-dashed border-line-strong bg-base px-4 py-3.5 text-sm text-body transition-colors hover:border-spark-500 focus-within:border-spark-500 focus-within:ring-2 focus-within:ring-spark-100">
                <span className="shrink-0 rounded-sm bg-surface px-3 py-1.5 font-semibold text-head">
                  Выбрать файлы
                </span>
                <span className="text-soft">
                  {files.length
                    ? `${files.length} шт., ${formatSize(filesBytes)}`
                    : "PDF, DWG, DXF, фото, архивы — до 9,5 МБ вместе"}
                </span>
                <input
                  type="file"
                  name="attachment"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.currentTarget.files ?? []))}
                  className="sr-only"
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-2 grid gap-1 text-xs text-soft">
                  {files.map((f) => (
                    <li key={`${f.name}-${f.size}`} className="truncate">
                      {f.name} · {formatSize(f.size)}
                    </li>
                  ))}
                </ul>
              )}
              {tooBig && (
                <p className="mt-2 text-sm font-medium text-spark-700">
                  Файлы весят {formatSize(filesBytes)} — больше 9,5 МБ. Уберите часть
                  или пришлите их на {company.email}.
                </p>
              )}
            </div>

            {defaultTopic && (
              <input type="hidden" name="Направление" value={defaultTopic} />
            )}
            {/* Ловушка для ботов: FormSubmit молча отбрасывает заявки с заполненным _honey */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {status === "error" && (
              <p
                role="status"
                className="rounded-sm border border-spark-100 bg-spark-50 px-4 py-3 text-sm text-body"
              >
                Не удалось отправить заявку. Попробуйте ещё раз,{" "}
                <a href={mailHref} className="font-semibold text-spark-700 underline">
                  отправьте письмом
                </a>{" "}
                или позвоните{" "}
                <a href={company.phoneHref} className="font-semibold text-spark-700 underline">
                  {company.phone}
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || tooBig}
              className="group mt-2 inline-flex items-center justify-center gap-2.5 rounded-sm bg-spark-600 px-7 py-4 font-semibold text-white shadow-[0_14px_34px_-16px_var(--color-spark-600)] transition-colors hover:bg-spark-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Отправляем…" : "Отправить заявку"}
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
