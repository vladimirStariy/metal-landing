"""Обработка фотографий из папки «фотки» для сайта.

Что делает:
  * поворачивает по EXIF, уменьшает до 1280 px по длинной стороне;
  * для всех фото: мягкий баланс белого, авто-уровни, умеренный контраст;
  * для кадров, где главное — цех (WORKSHOP): сильнее поднимает тени,
    убирает дымку и лишний цветовой оттенок, добавляет локальную
    резкость. Содержимое кадра не меняется — только цвет и тон.

Запуск:  python3 scripts/process_photos.py
Нужны:   pip install pillow numpy
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

SRC = Path("фотки")

# Исходное имя файла -> понятное имя для сайта.
NAMES = {
    "photo_2026-09-15_13-32-54": "kolpaki-nerzhaveyushchie-1",
    "photo_2026-09-15_13-32-55": "kolpaki-nerzhaveyushchie-2",
    "photo_2026-09-15_13-33-04": "nerzhaveyushchie-lotki-1",
    "photo_2026-09-15_13-33-05": "nerzhaveyushchie-lotki-2",
    "photo_2026-09-15_13-33-07": "ferma-na-sborke",
    "photo_2026-09-15_13-33-19": "ceh-obshchiy-vid",
    "photo_2026-09-15_13-33-49": "u-bolty",
    "photo_2026-09-15_13-33-55": "kolca-iz-polimera",
    "photo_2026-09-15_13-33-56": "flancy-i-kolca-komplekt-1",
    "photo_2026-09-15_13-33-58(2)": "flancy-i-kolca-komplekt-2",
    "photo_2026-09-15_13-33-58": "flancy-i-kolca-komplekt-3",
    "photo_2026-09-15_13-34-06": "bunker-na-rame",
    "photo_2026-09-15_13-34-12": "obechayka-perforirovannaya",
    "photo_2026-09-15_13-34-17": "obechayki-perforirovannye-paket",
    "photo_2026-09-15_13-50-59": "rychagi-iz-lista-1",
    "photo_2026-09-15_13-51-00": "rychagi-iz-lista-2",
    "photo_2026-09-15_13-51-09": "reshetka-ograzhdenie",
    "photo_2026-09-15_13-51-53": "valy-s-rezboy",
    "photo_2026-09-15_13-52-06(2)": "ugolki-gnutye-1",
    "photo_2026-09-15_13-52-06": "kozhuh-valcovannyy-1",
    "photo_2026-09-15_13-52-07": "ugolki-gnutye-2",
    "photo_2026-09-15_13-52-20": "kozhuh-valcovannyy-2",
    "photo_2026-09-15_13-52-22": "emkost-s-privodami",
    "photo_2026-09-15_13-52-24(2)": "baraban-grebenchatyy-sverhu",
    "photo_2026-09-15_13-52-24(3)": "list-perforirovannyy",
    "photo_2026-09-15_13-52-24": "baraban-grebenchatyy",
    "photo_2026-09-15_13-52-26": "lopastnoy-rotor-1",
    "photo_2026-09-15_13-52-28(2)": "lopastnoy-rotor-2",
    "photo_2026-09-15_13-52-28": "lopastnoy-rotor-3",
    "photo_2026-09-15_13-52-31": "truba-na-podvese",
    "photo_2026-09-15_13-52-34(2)": "plity-s-otverstiyami-1",
    "photo_2026-09-15_13-52-34": "plity-s-otverstiyami-2",
    "photo_2026-09-15_13-52-36": "baraban-perforirovannyy",
    "photo_2026-09-15_13-52-37": "sektor-perforirovannyy",
    "photo_2026-09-15_13-52-39": "katki-na-valah-1",
    "photo_2026-09-15_13-52-40": "katki-na-valah-2",
    "photo_2026-09-15_13-52-41": "katki-na-valah-3",
    "photo_2026-09-15_13-52-50": "karkasy-na-hranenii",
    "photo_2026-09-15_13-52-53": "reduktor-s-shesternyami-1",
    "photo_2026-09-15_13-52-54": "reduktor-s-shesternyami-2",
    "photo_2026-09-15_13-52-58(2)": "vtulki-alyuminievye-1",
    "photo_2026-09-15_13-52-58": "vtulki-alyuminievye-2",
    "photo_2026-09-15_13-52-59": "ciklony-v-cehu",
    "photo_2026-09-15_13-53-23": "emkost-s-peregorodkami",
    "photo_2026-09-15_13-53-24": "agregat-na-rame",
    "photo_2026-09-15_13-53-26": "korpus-na-rame-v-cehu",
}
DST = Path("public/photos")
MAX_SIDE = 1280

# Кадры, где основное содержание — интерьер цеха.
WORKSHOP = {
    "photo_2026-09-15_13-33-19.jpg",  # общий вид цеха
    "photo_2026-09-15_13-33-07.jpg",  # ферма на сборке
    "photo_2026-09-15_13-52-31.jpg",  # труба на подвесе, цех
    "photo_2026-09-15_13-52-50.jpg",  # каркасы на хранении
    "photo_2026-09-15_13-53-23.jpg",  # циклоны в цехе
    "photo_2026-09-15_13-53-26.jpg",  # агрегат на раме в цехе
}


def smoothstep(x):
    return x * x * (3 - 2 * x)


def grade(img: Image.Image, workshop: bool) -> Image.Image:
    a = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0

    # Баланс белого: серый мир, ограниченный по силе.
    means = a.reshape(-1, 3).mean(0)
    gain = means.mean() / means
    strength = 0.5 if workshop else 0.45
    gain = 1 + (np.clip(gain, 0.8, 1.25) - 1) * strength
    a = np.clip(a * gain, 0, 1)

    # Авто-уровни по перцентилям.
    lo, hi = np.percentile(a, (0.5 if workshop else 0.3, 99.6))
    a = np.clip((a - lo) / max(hi - lo, 1e-3), 0, 1)

    lum = (a * [0.299, 0.587, 0.114]).sum(-1, keepdims=True)

    if workshop:
        # Дымка: подтягиваем нижнюю границу тёмного канала.
        dark = a.min(-1, keepdims=True)
        a = np.clip((a - 0.35 * dark) / (1 - 0.35 * dark), 0, 1)
        # Тени: приподнимаем, чтобы цех читался чище и светлее.
        a = a ** 0.68
        a = 0.03 + 0.97 * a
        lum = (a * [0.299, 0.587, 0.114]).sum(-1, keepdims=True)

    # Контраст: мягкая S-кривая по яркости.
    s = smoothstep(np.clip(lum, 0, 1))
    k = 0.12 if workshop else 0.30
    target = lum + (s - lum) * k
    a = np.clip(a * (target / np.maximum(lum, 1e-3)), 0, 1)

    # Насыщенность: у цеха чуть ниже (спокойнее), у изделий чуть выше.
    lum = (a * [0.299, 0.587, 0.114]).sum(-1, keepdims=True)
    sat = 0.88 if workshop else 1.08
    a = np.clip(lum + (a - lum) * sat, 0, 1)

    out = Image.fromarray((a * 255 + 0.5).astype(np.uint8))
    radius, percent = (2.2, 70) if workshop else (1.6, 45)
    return out.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=3))


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    for f in sorted(SRC.glob("*.jpg")):
        img = ImageOps.exif_transpose(Image.open(f))
        img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        out = grade(img, f.name in WORKSHOP)
        name = NAMES[f.stem.replace(" ", "")]
        out.save(DST / f"{name}.webp", "WEBP", quality=72, method=6)
        print(f.name, "->", f"{name}.webp", out.size, "цех" if f.name in WORKSHOP else "")


if __name__ == "__main__":
    main()
