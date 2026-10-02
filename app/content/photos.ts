/**
 * Фотографии производства и изготовленных изделий.
 *
 * Исходники лежат в папке «фотки», обработанные версии для сайта —
 * в public/photos (генерируются scripts/process_photos.py).
 * Подписи описывают только то, что видно на снимке: без марок стали,
 * габаритов и названий заказчиков, которых мы не знаем.
 */

export type Photo = {
  id: string;
  width: number;
  height: number;
  alt: string;
  /** workshop — интерьер цеха, work — готовое изделие или заготовка. */
  kind: "workshop" | "work";
};

const p = (
  id: string,
  width: number,
  height: number,
  kind: Photo["kind"],
  alt: string,
): Photo => ({ id, width, height, kind, alt });

export const photos = {
  /* ── Цех ───────────────────────────────────────────────────── */
  cehObshchiyVid: p("ceh-obshchiy-vid", 1184, 896, "workshop", "Производственный цех: сварные фермы на стендах сборки, мостовой кран под потолком"),
  fermaNaSborke: p("ferma-na-sborke", 896, 1184, "workshop", "Сварная ферма с фланцевой пластиной на сборке в цехе"),
  trubaNaPodvese: p("truba-na-podvese", 896, 1184, "workshop", "Тройник из трубы на подвесе под козловой кран в цехе"),
  karkasyNaHranenii: p("karkasy-na-hranenii", 896, 1184, "workshop", "Сварные каркасы из профильной трубы на хранении в цехе"),
  ciklonyVCehu: p("ciklony-v-cehu", 714, 1280, "workshop", "Два циклона и вентилятор на сборке в цехе"),
  korpusNaRameVCehu: p("korpus-na-rame-v-cehu", 896, 1184, "workshop", "Корпус на сварной раме с электродвигателем в цехе"),

  /* ── Нестандартное оборудование ────────────────────────────── */
  bunkerNaRame: p("bunker-na-rame", 896, 1184, "work", "Окрашенный стальной корпус с люком на сварной раме"),
  emkostSPrivodami: p("emkost-s-privodami", 896, 1184, "work", "Окрашенная ёмкость с конической воронкой, приводами и выходным патрубком"),
  emkostSPeregorodkami: p("emkost-s-peregorodkami", 1280, 960, "work", "Окрашенная ёмкость с внутренними перегородками и загрузочным лотком"),
  agregatNaRame: p("agregat-na-rame", 896, 1184, "work", "Агрегат в окрашенном корпусе на сварной раме с приводом"),
  reduktorSShesternyami1: p("reduktor-s-shesternyami-1", 960, 1280, "work", "Корпус с двумя валами и зубчатыми колёсами, окрашенный"),
  reduktorSShesternyami2: p("reduktor-s-shesternyami-2", 896, 1184, "work", "Корпус с валами и зубчатой передачей, вид сбоку"),

  /* ── Шнеки, роторы, барабаны ───────────────────────────────── */
  lopastnoyRotor1: p("lopastnoy-rotor-1", 1184, 896, "work", "Ротор с изогнутыми лопастями на валу с посадочной шейкой, окрашен"),
  lopastnoyRotor2: p("lopastnoy-rotor-2", 1280, 960, "work", "Лопастной ротор на стальном валу, вид с торца"),
  lopastnoyRotor3: p("lopastnoy-rotor-3", 960, 1280, "work", "Вал с приваренными лопастями и фланцем, окрашен"),
  barabanGrebenchatyy: p("baraban-grebenchatyy", 1280, 960, "work", "Барабан с гребенчатыми элементами и подшипниковым узлом"),
  barabanGrebenchatyySverhu: p("baraban-grebenchatyy-sverhu", 1280, 960, "work", "Барабан с гребенкой, вид сверху"),
  barabanPerforirovannyy: p("baraban-perforirovannyy", 896, 1184, "work", "Сварной барабан с перфорированной обечайкой"),

  /* ── Листовые детали: резка, гибка, вальцовка ──────────────── */
  listPerforirovannyy: p("list-perforirovannyy", 960, 1280, "work", "Окрашенный стальной лист с вырезанными отверстиями"),
  obechaykaPerforirovannaya: p("obechayka-perforirovannaya", 1280, 960, "work", "Вальцованная обечайка с круглыми отверстиями разного диаметра"),
  obechayki: p("obechayki-perforirovannye-paket", 1184, 896, "work", "Пакет вальцованных перфорированных обечаек на поддоне"),
  sektorPerforirovannyy: p("sektor-perforirovannyy", 1280, 960, "work", "Сектор вальцованной перфорированной обечайки со сварным швом"),
  kozhuhValcovannyy1: p("kozhuh-valcovannyy-1", 1280, 960, "work", "Вальцованный перфорированный кожух с рамкой из нержавеющей стали"),
  kozhuhValcovannyy2: p("kozhuh-valcovannyy-2", 1280, 960, "work", "Вальцованный перфорированный кожух с фланцем и крепёжными ушами"),
  ugolkiGnutye1: p("ugolki-gnutye-1", 896, 1184, "work", "Партия гнутых листовых деталей с отверстиями на поддоне"),
  ugolkiGnutye2: p("ugolki-gnutye-2", 896, 1184, "work", "Гнутые листовые детали с отверстиями, крупным планом"),
  rychagiIzLista1: p("rychagi-iz-lista-1", 1280, 960, "work", "Плоские детали сложного контура с вырезами и приваренными скобами"),
  rychagiIzLista2: p("rychagi-iz-lista-2", 1280, 960, "work", "Детали сложного контура из листа с приваренными ручками"),
  nerzhLotki1: p("nerzhaveyushchie-lotki-1", 960, 1280, "work", "Узлы из нержавеющей стали с изогнутыми лотками на перфорированном листе"),
  nerzhLotki2: p("nerzhaveyushchie-lotki-2", 1280, 960, "work", "Нержавеющие узлы с гнутыми лотками и хомутами"),
  reshetkaOgrazhdenie: p("reshetka-ograzhdenie", 960, 1280, "work", "Сварная решётка из прутков в раме"),

  /* ── Токарные и фрезерные детали ───────────────────────────── */
  valySRezboy: p("valy-s-rezboy", 714, 1280, "work", "Три стальных вала с проточками и внутренней резьбой"),
  katkiNaValah1: p("katki-na-valah-1", 1280, 960, "work", "Два стальных катка на валах в сварных опорах"),
  katkiNaValah2: p("katki-na-valah-2", 1280, 960, "work", "Катки на валах с подшипниковыми опорами, вид сверху"),
  katkiNaValah3: p("katki-na-valah-3", 1280, 960, "work", "Катки на ступенчатых валах в опорах"),
  vtulkiAlyuminievye1: p("vtulki-alyuminievye-1", 1184, 896, "work", "Алюминиевые втулки-стаканы с внутренним бортиком"),
  vtulkiAlyuminievye2: p("vtulki-alyuminievye-2", 1184, 896, "work", "Алюминиевые втулки-стаканы"),
  kolpaki1: p("kolpaki-nerzhaveyushchie-1", 960, 1280, "work", "Нержавеющие колпаки с фланцем на поддоне"),
  kolpaki2: p("kolpaki-nerzhaveyushchie-2", 896, 1184, "work", "Партия нержавеющих колпаков на поддоне"),
  plity1: p("plity-s-otverstiyami-1", 1280, 960, "work", "Толстые стальные плиты с рядами отверстий на поддоне"),
  plity2: p("plity-s-otverstiyami-2", 896, 1184, "work", "Стальные плиты с отверстиями, вид сверху"),

  /* ── Ремкомплекты, фланцы, крепёж ──────────────────────────── */
  flancyKomplekt1: p("flancy-i-kolca-komplekt-1", 1280, 960, "work", "Комплект деталей: фланец, кольца, прокладки и втулка"),
  flancyKomplekt2: p("flancy-i-kolca-komplekt-2", 960, 1280, "work", "Комплект: фланец, кольца из полимера, прокладки и втулка"),
  flancyKomplekt3: p("flancy-i-kolca-komplekt-3", 960, 1280, "work", "Комплект ремонтных деталей: фланец, кольца, прокладки"),
  kolcaIzPolimera: p("kolca-iz-polimera", 1280, 960, "work", "Белые кольца из полимера"),
  uBolty: p("u-bolty", 960, 1280, "work", "U-образные болты с резьбой"),
} as const satisfies Record<string, Photo>;

type PhotoKey = keyof typeof photos;

const pick = (...keys: PhotoKey[]): Photo[] => keys.map((k) => photos[k]);

/** Фото для страниц услуг и изделий — ключ в формате "group/slug". */
export const galleryByPage: Record<string, Photo[]> = {
  "uslugi/sborka-i-svarka-metallokonstrukcii": pick(
    "fermaNaSborke", "karkasyNaHranenii", "bunkerNaRame", "korpusNaRameVCehu", "reshetkaOgrazhdenie", "emkostSPeregorodkami",
  ),
  "uslugi/lazernaya-i-plazmennaya-rezka": pick(
    "listPerforirovannyy", "obechaykaPerforirovannaya", "rychagiIzLista1", "rychagiIzLista2", "plity1", "obechayki",
  ),
  "uslugi/gibka-i-valcovka": pick(
    "obechayki", "obechaykaPerforirovannaya", "kozhuhValcovannyy1", "kozhuhValcovannyy2", "sektorPerforirovannyy", "ugolkiGnutye1",
  ),
  "uslugi/tokarnye-raboty": pick(
    "valySRezboy", "katkiNaValah1", "katkiNaValah3", "vtulkiAlyuminievye1", "vtulkiAlyuminievye2", "kolpaki1",
  ),
  "uslugi/frezernye-raboty": pick(
    "plity1", "plity2", "flancyKomplekt1", "flancyKomplekt2", "flancyKomplekt3",
  ),
  "izdeliya/valy-flanci-press-formi": pick(
    "valySRezboy", "katkiNaValah1", "katkiNaValah2", "flancyKomplekt1", "flancyKomplekt2", "kolcaIzPolimera",
  ),
  "izdeliya/izdeliya-po-chertezham": pick(
    "rychagiIzLista1", "rychagiIzLista2", "plity1", "ugolkiGnutye1", "ugolkiGnutye2", "nerzhLotki1", "nerzhLotki2", "kolpaki1",
  ),
  "izdeliya/remkomplekty": pick(
    "flancyKomplekt1", "flancyKomplekt2", "flancyKomplekt3", "kolcaIzPolimera", "uBolty", "katkiNaValah2",
  ),
  "izdeliya/shneki": pick(
    "lopastnoyRotor1", "lopastnoyRotor2", "lopastnoyRotor3", "barabanGrebenchatyy", "barabanGrebenchatyySverhu", "barabanPerforirovannyy",
  ),
  "izdeliya/nestandartnoe-oborudovanie": pick(
    "bunkerNaRame", "emkostSPrivodami", "emkostSPeregorodkami", "agregatNaRame", "reduktorSShesternyami1", "reduktorSShesternyami2", "ciklonyVCehu", "trubaNaPodvese",
  ),
};

/** Интерьер цеха — для страницы «Производство» и главной. */
export const workshopPhotos: Photo[] = pick(
  "cehObshchiyVid", "fermaNaSborke", "trubaNaPodvese", "ciklonyVCehu", "karkasyNaHranenii", "korpusNaRameVCehu",
);

/** Подборка «Наши работы» для главной и страницы «Производство». */
export const showcasePhotos: Photo[] = pick(
  "emkostSPrivodami", "lopastnoyRotor1", "obechayki", "agregatNaRame", "katkiNaValah1", "reduktorSShesternyami1", "kozhuhValcovannyy1", "flancyKomplekt1",
);

/** Подборка для страниц-групп. */
export const galleryByGroup: Record<"uslugi" | "izdeliya", Photo[]> = {
  uslugi: pick("fermaNaSborke", "obechayki", "kozhuhValcovannyy1", "katkiNaValah1", "plity1", "listPerforirovannyy"),
  izdeliya: pick("emkostSPrivodami", "lopastnoyRotor1", "agregatNaRame", "reduktorSShesternyami1", "flancyKomplekt1", "rychagiIzLista1"),
};

export const photoSrc = (p: Photo) => `/photos/${p.id}.webp`;
