/**
 * Фотографии производства и изготовленных изделий.
 *
 * Версии для сайта (WebP, до 1280 px по длинной стороне) лежат в public/photos.
 * Часть из них когда-то обработана scripts/process_photos.py, новые — просто
 * уменьшены и пересохранены без цветокоррекции.
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
  cehObshchiyVid: p("ceh-obshchiy-vid", 1280, 960, "workshop", "Производственный цех: сварные фермы на стендах сборки, мостовой кран под потолком"),
  fermaNaSborke: p("ferma-na-sborke", 960, 1280, "workshop", "Сварная ферма с фланцевой пластиной на сборке в цехе"),

  /* ── Нестандартное оборудование ────────────────────────────── */
  reduktorSShesternyami1: p("reduktor-s-shesternyami-1", 960, 1280, "work", "Корпус с двумя валами и зубчатыми колёсами, окрашенный"),
  reduktorSShesternyami2: p("reduktor-s-shesternyami-2", 960, 1280, "work", "Корпус с валами и зубчатой передачей, вид сбоку"),

  /* ── Листовые детали: резка, гибка, вальцовка ──────────────── */
  obechayki: p("obechayki-perforirovannye-paket", 1280, 960, "work", "Пакет вальцованных перфорированных обечаек на поддоне"),
  kozhuhValcovannyy2: p("kozhuh-valcovannyy-2", 1280, 960, "work", "Вальцованный перфорированный кожух с фланцем и крепёжными ушами"),
  ugolkiGnutye2: p("ugolki-gnutye-2", 960, 1280, "work", "Гнутые листовые детали с отверстиями, крупным планом"),
  rychagiIzLista2: p("rychagi-iz-lista-2", 1280, 960, "work", "Детали сложного контура из листа с приваренными ручками"),

  /* ── Токарные и фрезерные детали ───────────────────────────── */
  valySRezboy: p("valy-s-rezboy", 720, 1280, "work", "Три стальных вала с проточками и внутренней резьбой"),
  katkiNaValah3: p("katki-na-valah-3", 1280, 960, "work", "Катки на ступенчатых валах в опорах"),
  kolpaki1: p("kolpaki-nerzhaveyushchie-1", 960, 1280, "work", "Нержавеющие колпаки с фланцем на поддоне"),
  plity1: p("plity-s-otverstiyami-1", 1280, 960, "work", "Толстые стальные плиты с рядами отверстий на поддоне"),

  /* ── Ремкомплекты, фланцы, крепёж ──────────────────────────── */
  flancyKomplekt1: p("flancy-i-kolca-komplekt-1", 1280, 960, "work", "Комплект деталей: фланец, кольца, прокладки и втулка"),

  /* ── Металлоконструкции ──────────────────────────────────────── */
  karkasKupola: p("karkas-kupola-v-cehu", 964, 1280, "workshop", "Сварной каркас купола на сборке в цехе под мостовым краном"),
  fermyVCehu: p("fermy-v-cehu", 1280, 960, "workshop", "Сварные пространственные фермы в цехе"),
  sekciiSvarnye: p("sekcii-svarnye-v-cehu", 1280, 960, "work", "Сварные решётчатые секции из профиля в цехе"),
  ramaSvarnaya: p("rama-svarnaya", 960, 1280, "work", "Длинная сварная рама из профиля с поперечинами"),
  balkiSOtverstiyami: p("balki-s-otverstiyami", 1280, 960, "work", "Сварные балки с отверстиями под крепёж на поддонах"),
  stoyki: p("stoyki-s-otverstiyami", 960, 1280, "work", "Партия сварных стоек с перфорированными стенками"),
  balkiNaObekte: p("balki-na-obekte", 960, 1280, "work", "Окрашенные сварные балки на строительной площадке"),
  mkNaPloshchadke: p("metallokonstrukcii-na-ploshchadke", 1280, 960, "work", "Готовые металлоконструкции на площадке перед отгрузкой"),
  mkPogruzka: p("metallokonstrukcii-pogruzka", 960, 1280, "work", "Погрузка сварных металлоконструкций в кузов"),
  listovyeUpakovka: p("listovye-detali-upakovka", 1280, 960, "work", "Пачки листовых деталей в упаковке"),
  trubyOkrashennye: p("truby-okrashennye", 964, 1280, "work", "Партия окрашенных трубных деталей в плёнке"),

  /* ── Резка, гибка, вальцовка ─────────────────────────────────── */
  detaliGrebenchatye: p("detali-grebenchatye", 964, 1280, "work", "Гнутые листовые детали с зубчатой кромкой"),
  listMelkayaPerforaciya: p("list-melkaya-perforaciya", 720, 1280, "work", "Лист с мелкой перфорацией"),
  zagotovkaVitka: p("zagotovka-vitka-shneka", 960, 1280, "work", "Вырезанный стальной диск с отверстиями и пазом — заготовка витка шнека"),
  listPerforirovannyy2: p("list-perforirovannyy-2", 1280, 960, "work", "Окрашенный перфорированный лист на поддоне"),
  valcovkaObechayki: p("valcovka-obechayki", 964, 1280, "workshop", "Вальцовка обечайки из листа на вальцах"),
  barabanValcovannyy: p("baraban-perforirovannyy-valcovannyy", 964, 1280, "work", "Вальцованный перфорированный барабан в цехе"),
  profiliGnutye: p("profili-gnutye", 960, 1280, "work", "Пачка гнутых профилей из листа"),

  /* ── Токарные и фрезерные детали ─────────────────────────────── */
  shesternyaKonicheskaya: p("shesternya-konicheskaya", 1280, 720, "work", "Коническое зубчатое колесо с крепёжными отверстиями"),
  shesternyaSoStupicey: p("shesternya-so-stupicey", 964, 1280, "work", "Зубчатое колесо со ступицей и крепёжными отверстиями"),
  flancyNaPoddone1: p("flancy-na-poddone-1", 960, 1280, "work", "Обточенные фланцы с отверстиями на поддоне"),
  flancyNaPoddone2: p("flancy-na-poddone-2", 960, 1280, "work", "Партия фланцев с отверстиями на поддоне"),
  kolcaTochenye: p("kolca-tochenye", 960, 1280, "work", "Партии точёных колец разного диаметра на поддоне"),
  reshetkaYacheistaya: p("reshetka-yacheistaya", 964, 1280, "work", "Сварная ячеистая решётка из полосы"),
  valySRolikami: p("valy-s-rolikami", 964, 1280, "work", "Валы с роликами и фланцами на поддоне"),
  vtulkiAlyuminievye3: p("vtulki-alyuminievye-3", 1280, 960, "work", "Алюминиевые втулки-стаканы, вид сверху"),
  shpilki: p("shpilki-rezbovye", 964, 1280, "work", "Резьбовые шпильки в ящике"),
  korpusnyeDetali: p("korpusnye-detali-frezerovannye", 1280, 960, "work", "Фрезерованные корпусные детали с отверстиями и пазом"),
  kromkaLista: p("kromka-tolstogo-lista", 964, 1280, "work", "Деталь из толстого листа с обработанной кромкой"),
  reshetkaVKolce: p("reshetka-v-kolce", 1280, 720, "work", "Решётка в кольце на опорной пластине"),

  /* ── Изделия по чертежам и оборудование ──────────────────────── */
  emkostNaOtgruzke: p("emkost-na-otgruzke", 1280, 960, "work", "Сварная ёмкость с патрубками на платформе грузовика"),
  shnekovyyUzel: p("shnekovyy-uzel-v-korpuse", 1080, 1080, "work", "Двухвальный шнековый узел в окрашенном корпусе"),
  barabanOkrashennyy: p("baraban-perforirovannyy-okrashennyy", 799, 1145, "work", "Окрашенный перфорированный барабан с торцевой крышкой"),
  lotokNerzh: p("lotok-nerzhaveyushchiy", 964, 1280, "work", "Длинный лоток из нержавеющей стали с поперечными перегородками"),
  nerzhLotki3: p("nerzhaveyushchie-lotki-3", 1280, 960, "work", "Нержавеющие узлы с гнутыми лотками и патрубками"),
  rotorSLopatkami: p("rotor-s-lopatkami", 1280, 960, "work", "Барабан на валу с приваренными лопатками"),
  cilindryPerforirovannye: p("cilindry-perforirovannye", 964, 1280, "work", "Перфорированные цилиндры из нержавеющей стали на опорных пластинах"),
  barabanSLopatkami: p("baraban-s-lopatkami", 720, 1280, "work", "Сварной барабан с внутренними лопатками"),

  /* ── Ремкомплекты ────────────────────────────────────────────── */
  korobaOcinkovannye: p("koroba-ocinkovannye", 960, 1280, "work", "Гнутые короба из оцинкованной стали"),
  profiliOkrashennye: p("profili-okrashennye", 960, 1280, "work", "Окрашенные профили с отверстиями"),
  polukozhuh: p("polukozhuh-perforirovannyy", 1280, 960, "work", "Окрашенный перфорированный полукожух с крепёжными ушами"),

  /* ── Шнеки ───────────────────────────────────────────────────── */
  shnekiPary: p("shneki-pary", 576, 1280, "work", "Два шнека с витками на валу"),
  shnekiOkrashennye1: p("shneki-okrashennye-1", 1080, 1080, "work", "Окрашенные шнеки с широкими витками на поддоне"),
  shnekDlinnyy: p("shnek-okrashennyy-dlinnyy", 1024, 1280, "work", "Длинный окрашенный шнек"),
  shnekiPartiya1: p("shneki-partiya-1", 1080, 1080, "work", "Партия шнеков со стальными витками"),
  shnekiPartiya2: p("shneki-partiya-2", 1080, 1080, "work", "Шнеки со стальными витками, крупным планом"),
  shnekiPartiya3: p("shneki-partiya-3", 964, 1280, "work", "Партия шнеков на поддоне в цехе"),
  shnekiShirokieVitki: p("shneki-shirokie-vitki", 960, 1280, "work", "Шнеки с широкими витками"),
  shnekiSHvostovikami: p("shneki-s-hvostovikami", 1280, 576, "work", "Шнеки с хвостовиками"),
  shnekiKorotkie: p("shneki-korotkie", 1280, 576, "work", "Короткие шнековые секции"),
  shnekiOkrashennye2: p("shneki-okrashennye-2", 964, 1280, "work", "Окрашенные трубы с витками шнека"),
  shnekiPartiya4: p("shneki-partiya-4", 964, 1280, "work", "Партия шнеков на поддоне"),
} as const satisfies Record<string, Photo>;

type PhotoKey = keyof typeof photos;

const pick = (...keys: PhotoKey[]): Photo[] => keys.map((k) => photos[k]);

/** Фото для страниц услуг и изделий — ключ в формате "group/slug". */
export const galleryByPage: Record<string, Photo[]> = {
  "uslugi/sborka-i-svarka-metallokonstrukcii": pick(
    "fermaNaSborke", "karkasKupola", "sekciiSvarnye", "ramaSvarnaya", "balkiSOtverstiyami", "stoyki",
    "balkiNaObekte", "mkNaPloshchadke", "mkPogruzka", "listovyeUpakovka", "trubyOkrashennye", "cehObshchiyVid",
  ),
  "uslugi/lazernaya-i-plazmennaya-rezka": pick(
    "detaliGrebenchatye", "listMelkayaPerforaciya", "zagotovkaVitka", "listPerforirovannyy2", "rychagiIzLista2",
  ),
  "uslugi/gibka-i-valcovka": pick(
    "valcovkaObechayki", "barabanValcovannyy", "obechayki", "ugolkiGnutye2", "profiliGnutye", "detaliGrebenchatye",
  ),
  "uslugi/tokarnye-raboty": pick(
    "flancyNaPoddone1", "flancyNaPoddone2", "kolcaTochenye", "valySRolikami", "valySRezboy", "flancyKomplekt1",
    "vtulkiAlyuminievye3", "shpilki", "kolpaki1",
  ),
  "uslugi/frezernye-raboty": pick(
    "plity1", "shesternyaKonicheskaya", "shesternyaSoStupicey", "reshetkaYacheistaya", "korpusnyeDetali", "kromkaLista",
    "reshetkaVKolce",
  ),
  "izdeliya/valy-flanci-press-formi": pick(
    "shesternyaKonicheskaya", "shesternyaSoStupicey", "flancyNaPoddone1", "flancyNaPoddone2", "kolcaTochenye",
    "valySRolikami", "valySRezboy", "plity1", "flancyKomplekt1", "reshetkaYacheistaya",
  ),
  "izdeliya/izdeliya-po-chertezham": pick(
    "emkostNaOtgruzke", "shnekovyyUzel", "barabanOkrashennyy", "lotokNerzh", "nerzhLotki3", "karkasKupola",
    "balkiNaObekte", "trubyOkrashennye", "reduktorSShesternyami2",
  ),
  "izdeliya/remkomplekty": pick(
    "korobaOcinkovannye", "kozhuhValcovannyy2", "shnekiPary", "profiliOkrashennye", "polukozhuh", "katkiNaValah3",
    "listPerforirovannyy2", "rychagiIzLista2",
  ),
  "izdeliya/shneki": pick(
    "shnekiOkrashennye1", "shnekDlinnyy", "shnekiPartiya1", "shnekiPartiya2", "shnekiPartiya3", "shnekiShirokieVitki",
    "shnekiSHvostovikami", "shnekiKorotkie", "shnekiOkrashennye2", "shnekiPartiya4", "shnekovyyUzel", "zagotovkaVitka",
    "shnekiPary",
  ),
  "izdeliya/nestandartnoe-oborudovanie": pick(
    "emkostNaOtgruzke", "shnekovyyUzel", "reduktorSShesternyami1", "rotorSLopatkami", "cilindryPerforirovannye",
    "barabanSLopatkami",
  ),
};

/** Интерьер цеха — для страницы «Производство». */
export const workshopPhotos: Photo[] = pick(
  "cehObshchiyVid", "karkasKupola", "fermaNaSborke",
);

/** Подборка «Наши работы» для главной. */
export const showcasePhotos: Photo[] = pick(
  "cehObshchiyVid", "karkasKupola", "fermaNaSborke", "balkiNaObekte",
  "shnekiOkrashennye1", "obechayki", "flancyNaPoddone1", "reduktorSShesternyami1", "emkostNaOtgruzke", "shesternyaKonicheskaya",
);

/** Подборка для страниц-групп. */
export const galleryByGroup: Record<"uslugi" | "izdeliya", Photo[]> = {
  uslugi: pick("fermaNaSborke", "valcovkaObechayki", "flancyNaPoddone2", "plity1", "listPerforirovannyy2", "mkNaPloshchadke"),
  izdeliya: pick("emkostNaOtgruzke", "shnekiPartiya1", "reduktorSShesternyami1", "shesternyaSoStupicey", "cilindryPerforirovannye", "korobaOcinkovannye"),
};

export const photoSrc = (p: Photo) => `/photos/${p.id}.webp`;
