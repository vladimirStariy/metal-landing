import certificates, { certificateSrc, certificateThumb } from "../content/certificates";
import Lightbox from "./Lightbox";

/** Пять сканов сертификатов; клик открывает просмотр с листанием. */
export default function Certificates() {
  return (
    <Lightbox
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5"
      thumbClassName="p-2 sm:p-3"
      items={certificates.map((c) => ({
        src: certificateSrc(c),
        thumb: certificateThumb(c),
        width: 480,
        height: 679,
        alt: c.alt,
      }))}
    />
  );
}
