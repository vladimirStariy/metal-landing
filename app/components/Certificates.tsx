import Image from "next/image";
import certificates, {
  certificatePdfs,
  certificateSrc,
  certificateThumb,
} from "../content/certificates";
import Icon from "./Icon";

/** Сетка сканов сертификатов: превью, реквизиты, клик открывает скан целиком. */
export default function Certificates() {
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
        {certificates.map((c) => (
          <li key={c.id}>
            <a
              href={certificateSrc(c)}
              target="_blank"
              rel="noopener"
              className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-base transition-all hover:-translate-y-0.5 hover:border-spark-300 hover:shadow-[0_18px_40px_-24px_rgba(15,20,25,0.45)]"
            >
              <span className="block overflow-hidden border-b border-line bg-surface p-2 sm:p-3">
                <Image
                  src={certificateThumb(c)}
                  width={480}
                  height={679}
                  alt={`${c.kind}: ${c.title}, ${c.number}`}
                  sizes="(min-width: 1024px) 240px, 50vw"
                  loading="lazy"
                  className="h-auto w-full shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </span>
              <span className="flex flex-1 flex-col p-3.5 sm:p-5">
                <span className="text-[0.65rem] font-semibold tracking-[0.12em] text-soft uppercase sm:text-xs">
                  {c.kind}
                </span>
                <span className="display mt-1.5 text-sm text-head sm:text-base">{c.title}</span>
                <span className="mt-3 text-xs leading-relaxed text-body sm:text-sm">{c.scope}</span>
                <span className="mt-auto pt-4 text-xs leading-relaxed break-words text-soft">
                  {c.number}
                  <br />
                  {c.issuer}, {c.validity}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        {certificatePdfs.map((d) => (
          <a
            key={d.href}
            href={d.href}
            download
            className="inline-flex items-center gap-2.5 rounded-sm border border-line-strong bg-base px-6 py-3.5 font-semibold text-head transition-colors hover:border-spark-300 hover:bg-spark-50"
          >
            <Icon name="shield" className="size-4 text-spark-600" />
            {d.label}
          </a>
        ))}
      </div>
    </>
  );
}
