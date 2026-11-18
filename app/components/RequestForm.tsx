"use client";

import { useRef, useState } from "react";
import { Forminit } from "forminit";
import { company } from "../company";
import Icon from "./Icon";

const fieldClass =
  "w-full rounded-sm border border-line-strong bg-base px-4 py-3.5 text-head placeholder:text-soft outline-none transition-colors focus:border-spark-500 focus:ring-2 focus:ring-spark-100";

// Forminit form: inputs are named fi-{type}-{name}. Rules: https://forminit.com/setup.md
const FORM_ID = "s77orjj7w7j";
// Forminit ограничивает заявку 25 МБ вместе с полями — оставляем запас.
const MAX_FILES_BYTES = 24 * 1024 * 1024;
// Сообщения для полей, которые проверяет Forminit. Ключи — имена полей Forminit:
// sender.<name> для fi-sender-*, иначе {name} из fi-{type}-{name}.
const FIELD_ERRORS: Record<string, string> = {
  "sender.fullName":
    "Проверьте имя: можно использовать только буквы, пробелы, дефисы, апострофы и точки.",
};
// Forminit называет поле с ошибкой в error.fieldName или первым словом в кавычках в error.message
function errorText(error?: { error?: string; fieldName?: string; message?: string }) {
  const field = error?.fieldName ?? /['"]([^'"]+)['"]/.exec(error?.message ?? "")?.[1];
  if (field && FIELD_ERRORS[field]) return FIELD_ERRORS[field];
  if (error?.error === "TOO_MANY_REQUESTS")
    return "Подождите несколько секунд и попробуйте снова.";
  return "";
}
const forminit = new Forminit();

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
  // idle → sending → sent | error
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sendingRef = useRef(false); // синхронная защита от двойной отправки
  const [errorMessage, setErrorMessage] = useState("");
  const [mailHref, setMailHref] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const filesBytes = files.reduce((sum, f) => sum + f.size, 0);
  const tooBig = filesBytes > MAX_FILES_BYTES;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const fd = new FormData(e.currentTarget); // до того, как что-то станет disabled
    const name = String(fd.get("fi-sender-fullName") ?? "").trim();
    const phone = String(fd.get("fi-text-phone") ?? "").trim();
    const topic = String(fd.get("fi-text-topic") ?? "").trim();
    const task = String(fd.get("fi-text-task") ?? "").trim();
    // Кривой апостроф (iPhone) в имени Forminit отклоняет
    fd.set("fi-sender-fullName", name.replace(/[‘’]/g, "'"));

    // Запасной путь при ошибке — готовое письмо (файлы к mailto не прикрепить)
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
    setMailHref(
      `${company.emailHref}?subject=${encodeURIComponent(
        `Заявка на расчёт — ${name || "сайт"}`,
      )}&body=${encodeURIComponent(body)}`,
    );

    if (tooBig) return;

    sendingRef.current = true;
    setStatus("sending");
    setErrorMessage("");
    try {
      const { data, error } = await forminit.submit(FORM_ID, fd);
      if (error || typeof data?.hashId !== "string") {
        console.error("Forminit:", error ?? data);
        setErrorMessage(errorText(error));
        setStatus("error");
        return;
      }
      setFiles([]);
      setStatus("sent");
    } catch (err) {
      console.error("Forminit:", err);
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-base shadow-[0_24px_60px_-32px_rgba(15,20,25,0.4)]">
      <div className="hazard h-2.5" />
      <div className="p-6 sm:p-9">
        {status === "sent" ? (
          <div className="flex min-h-80 flex-col items-center justify-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-spark-50 text-spark-600">
              <Icon name="check" className="size-8" />
            </span>
            <h3 className="display mt-6 text-2xl text-head">Заявка отправлена</h3>
            <p className="mt-3 max-w-sm text-body">
              Спасибо! Мы свяжемся с вами в рабочее время ({company.hours}).
              Если вопрос срочный — позвоните.
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
                  name="fi-sender-fullName"
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
                  name="fi-text-phone"
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
                name="fi-text-task"
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
                    : "PDF, DWG, DXF, фото, архивы — до 24 МБ вместе"}
                </span>
                <input
                  type="file"
                  name="fi-file-files[]"
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
                  Файлы весят {formatSize(filesBytes)} — больше 24 МБ. Уберите часть
                  или пришлите их на {company.email}.
                </p>
              )}
            </div>

            {defaultTopic && (
              <input type="hidden" name="fi-text-topic" value={defaultTopic} />
            )}
            {/* Ловушка для ботов: Forminit отбрасывает заявки с заполненным _gotcha */}
            <input
              type="text"
              name="_gotcha"
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
                {errorMessage || (
                  <>
                    Не удалось отправить заявку. Попробуйте ещё раз,{" "}
                    <a href={mailHref} className="font-semibold text-spark-700 underline">
                      отправьте письмом
                    </a>{" "}
                    или позвоните{" "}
                    <a
                      href={company.phoneHref}
                      className="font-semibold text-spark-700 underline"
                    >
                      {company.phone}
                    </a>
                    .
                  </>
                )}
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
