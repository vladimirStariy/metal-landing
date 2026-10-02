/** Сертификаты и свидетельства. Сканы лежат в public/certificates. */
export type Certificate = {
  id: string;
  /** Подпись для alt и просмотрщика. */
  alt: string;
};

const certificates: Certificate[] = [
  {
    id: "svidetelstvo-svarochnoe-proizvodstvo",
    alt: "Свидетельство об оценке сварочного производства № 12-08-05/692, СТБ 2349-2013",
  },
  {
    id: "svidetelstvo-prilozhenie",
    alt: "Приложение к свидетельству № 12-08-05/692: область распространения",
  },
  {
    id: "sertifikat-metallokonstrukcii",
    alt: "Сертификат соответствия ТР BY: конструкции стальные сварные строительные",
  },
  {
    id: "sertifikat-lestnichnye-marshi",
    alt: "Сертификат соответствия ТР BY: лестничные марши, площадки и ограждения",
  },
  {
    id: "sertifikat-ograzhdeniya",
    alt: "Сертификат соответствия ТР BY: ограждения лестниц, балконов и крыш",
  },
];

export default certificates;

export const certificateSrc = (c: Certificate) => `/certificates/${c.id}.webp`;
export const certificateThumb = (c: Certificate) => `/certificates/${c.id}-thumb.webp`;
