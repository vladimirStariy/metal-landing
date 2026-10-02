/** Сертификаты и свидетельства. Сканы лежат в public/certificates. */
export type Certificate = {
  id: string;
  kind: string;
  title: string;
  number: string;
  /** Дата выдачи и срок действия. */
  validity: string;
  issuer: string;
  /** Подтверждаемые нормы или область действия. */
  scope: string;
};

const certificates: Certificate[] = [
  {
    id: "svidetelstvo-svarochnoe-proizvodstvo",
    kind: "Свидетельство",
    title: "Оценка сварочного производства",
    number: "№ 12-08-05/692",
    validity: "выдано 27.10.2025",
    issuer: "РУП «Стройтехнорм»",
    scope: "Соответствие СТБ 2349-2013",
  },
  {
    id: "svidetelstvo-prilozhenie",
    kind: "Приложение к свидетельству",
    title: "Область распространения",
    number: "к № 12-08-05/692",
    validity: "выдано 27.10.2025",
    issuer: "РУП «Стройтехнорм»",
    scope: "Процесс сварки 135, ГОСТ 14771-76, группа материалов 1 (1.1, 1.2)",
  },
  {
    id: "sertifikat-metallokonstrukcii",
    kind: "Сертификат соответствия ТР BY",
    title: "Конструкции стальные сварные строительные",
    number: "№ BY/112 02.01. ТР013 118.01 05380",
    validity: "действителен до 01.10.2030",
    issuer: "ООО «Центр подтверждения качества»",
    scope: "Сталь классов прочности С235 и выше, ГОСТ 23118-2019, ТР 2025/013/BY",
  },
  {
    id: "sertifikat-lestnichnye-marshi",
    kind: "Сертификат соответствия ТР BY",
    title: "Лестничные марши, площадки и ограждения",
    number: "№ BY/112 02.01. ТР013 118.01 05381",
    validity: "действителен до 01.10.2030",
    issuer: "ООО «Центр подтверждения качества»",
    scope: "Стальные сварные, СТБ 1317-2002, ТР 2025/013/BY",
  },
  {
    id: "sertifikat-ograzhdeniya",
    kind: "Сертификат соответствия ТР BY",
    title: "Ограждения лестниц, балконов и крыш",
    number: "№ BY/112 02.01. ТР013 118.01 05379",
    validity: "действителен до 01.10.2030",
    issuer: "ООО «Центр подтверждения качества»",
    scope: "Стальные сварные, СТБ 1381-2003, ТР 2025/013/BY",
  },
];

export default certificates;

export const certificateSrc = (c: Certificate) => `/certificates/${c.id}.webp`;
export const certificateThumb = (c: Certificate) => `/certificates/${c.id}-thumb.webp`;

/** Исходные PDF для скачивания. */
export const certificatePdfs = [
  { href: "/certificates/sertifikaty-sootvetstviya.pdf", label: "Сертификаты соответствия, PDF" },
  { href: "/certificates/svidetelstvo-svarochnoe-proizvodstvo.pdf", label: "Свидетельство о сварочном производстве, PDF" },
] as const;
