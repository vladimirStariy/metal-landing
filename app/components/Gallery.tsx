"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { photoSrc, type Photo } from "../content/photos";
import Icon from "./Icon";
import { LightboxViewer } from "./Lightbox";

/**
 * Галерея фото: ровная сетка одинаковых квадратных плиток, клик открывает полноэкранный просмотр.
 * Если фото больше `limit`, остальные спрятаны под кнопкой «Показать все».
 */
export default function Gallery({
  photos,
  limit = 6,
}: {
  photos: Photo[];
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const collapsible = photos.length > limit;

  const toggle = () => {
    // При сворачивании возвращаем к началу галереи, чтобы не остаться ниже блока.
    if (expanded) listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setExpanded(!expanded);
  };

  return (
    <div>
      <ul ref={listRef} className="grid scroll-mt-28 grid-cols-2 gap-4 lg:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.id} className={collapsible && !expanded && i >= limit ? "hidden" : undefined}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Открыть: ${p.alt}`}
              className="group block aspect-square w-full cursor-zoom-in overflow-hidden rounded-md border border-line bg-surface"
            >
              <Image
                src={photoSrc(p)}
                width={p.width}
                height={p.height}
                alt={p.alt}
                sizes="(min-width: 1024px) 380px, 50vw"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {collapsible && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-line-strong bg-base px-6 py-3.5 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
        >
          {expanded ? "Свернуть" : `Показать все фото (${photos.length})`}
          <Icon
            name="arrow"
            className={`size-4 text-spark-600 transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`}
          />
        </button>
      )}

      {open !== null && (
        <LightboxViewer
          items={photos.map((p) => ({ src: photoSrc(p), thumb: photoSrc(p), width: p.width, height: p.height, alt: p.alt }))}
          index={open}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
