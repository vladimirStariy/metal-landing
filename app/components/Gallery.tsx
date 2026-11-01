import Image from "next/image";
import { photoSrc, type Photo } from "../content/photos";

/** Галерея фото: ровная сетка одинаковых квадратных плиток, клик открывает снимок целиком. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {photos.map((p) => (
        <li key={p.id}>
          <a
            href={photoSrc(p)}
            target="_blank"
            rel="noopener"
            className="group block aspect-square overflow-hidden rounded-md border border-line bg-surface"
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
          </a>
        </li>
      ))}
    </ul>
  );
}
