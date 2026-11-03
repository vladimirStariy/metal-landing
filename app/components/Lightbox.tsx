"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxItem = {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
};

/** Сетка превью и полноэкранный просмотр: стрелки, Esc, свайп, клик по фону закрывает. */
export default function Lightbox({
  items,
  className,
  thumbClassName = "",
}: {
  items: LightboxItem[];
  className: string;
  thumbClassName?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className={className}>
        {items.map((it, i) => (
          <li key={it.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Открыть: ${it.alt}`}
              className={`group block w-full cursor-zoom-in overflow-hidden rounded-md border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)] ${thumbClassName}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.thumb}
                width={it.width}
                height={it.height}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <LightboxViewer items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}

/**
 * Один общий обработчик «Назад» для просмотра. Наши собственные history.back()
 * (при закрытии крестиком/Esc/по фону) тоже вызывают popstate — их считаем и пропускаем.
 */
let ownBacks = 0;
let closeOnBack: (() => void) | null = null;
let listening = false;
function onPopState() {
  if (ownBacks > 0) {
    ownBacks--;
    return;
  }
  const close = closeOnBack;
  closeOnBack = null;
  close?.();
}

/** Полноэкранный просмотр одного кадра из набора: стрелки, Esc, свайп, клик по фону закрывает. */
export function LightboxViewer({
  items,
  index,
  onChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const step = useCallback(
    (d: number) => onChange((index + d + items.length) % items.length),
    [index, items.length, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  // «Назад» в браузере (кнопка Android, свайп от края на iPhone) закрывает просмотр,
  // а не уводит со страницы: при открытии кладём в историю свою запись,
  // при закрытии крестиком/Esc/по фону убираем её сами.
  // Пометку в history.state не ставим: Next.js перезаписывает state при переходах.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  useEffect(() => {
    if (!listening) {
      window.addEventListener("popstate", onPopState);
      listening = true;
    }
    const close = () => onCloseRef.current();
    // Запись кладём на следующем тике: в dev React монтирует эффект дважды,
    // и мгновенная пара pushState/back путает историю.
    const timer = window.setTimeout(() => {
      window.history.pushState(null, "");
      closeOnBack = close;
    });
    return () => {
      window.clearTimeout(timer);
      // Закрыли не через «Назад» — убираем свою запись из истории.
      if (closeOnBack === close) {
        closeOnBack = null;
        ownBacks++;
        window.history.back();
      }
    };
  }, []);

  // Блокируем прокрутку страницы, пока открыт просмотр.
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 backdrop-blur-sm"
      onClick={onClose}
      // Листаем только свайпом одним пальцем: щипок для зума не должен перелистывать.
      onTouchStart={(e) => (touchX.current = e.touches.length === 1 ? e.touches[0].clientX : null)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={item.src}
        src={item.src}
        alt={item.alt}
        className="max-h-[calc(100dvh-7rem)] max-w-[calc(100vw-2rem)] rounded-sm object-contain shadow-2xl sm:max-w-[calc(100vw-10rem)]"
        onClick={(e) => e.stopPropagation()}
      />

      <span className="absolute top-5 left-5 text-sm font-semibold text-white/70 tabular-nums">
        {index + 1} / {items.length}
      </span>
      <LbButton label="Закрыть" onClick={onClose} className="top-3 right-3">
        <path d="M6 6l12 12M18 6L6 18" />
      </LbButton>
      {items.length > 1 && (
        <>
          <LbButton
            label="Предыдущий"
            onClick={() => step(-1)}
            className="bottom-4 left-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
          >
            <path d="M15 5l-7 7 7 7" />
          </LbButton>
          <LbButton
            label="Следующий"
            onClick={() => step(1)}
            className="right-4 bottom-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
          >
            <path d="M9 5l7 7-7 7" />
          </LbButton>
        </>
      )}

      {/* Подгрузка соседних кадров, чтобы листание было мгновенным. */}
      <span className="hidden">
        {[1, -1].map((d) => {
          const n = items[(index + d + items.length) % items.length];
          // eslint-disable-next-line @next/next/no-img-element
          return <img key={d} src={n.src} alt="" />;
        })}
      </span>
    </div>
  );
}

function LbButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-spark-500 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  );
}
