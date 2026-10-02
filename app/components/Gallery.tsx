import Image from "next/image";
import { photoSrc, type Photo } from "../content/photos";

/** Галерея фото: сохраняет пропорции кадров, клик открывает оригинал обработанного снимка. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <ul className="columns-2 gap-4 lg:columns-3 [&>li]:mb-4">
      {photos.map((p) => (
        <li key={p.id} className="break-inside-avoid">
          <a
            href={photoSrc(p)}
            target="_blank"
            rel="noopener"
            className="group block overflow-hidden rounded-md border border-line bg-surface"
          >
            <Image
              src={photoSrc(p)}
              width={p.width}
              height={p.height}
              alt={p.alt}
              sizes="(min-width: 1024px) 380px, 50vw"
              loading="lazy"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
