"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company, nav } from "../company";
import Icon from "./Icon";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hazard h-1.5" />
      <div
        className={`transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-line bg-base/92 shadow-[0_1px_16px_rgba(15,20,25,0.07)] backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Logo />
            <span className="leading-tight">
              <span className="display block text-lg text-head">Велдинг Тайм</span>
              <span className="block text-[11px] tracking-[0.18em] text-soft uppercase">
                Металлообработка
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-body transition-colors hover:text-spark-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={company.phoneHref}
              className="hidden text-sm font-bold whitespace-nowrap text-head transition-colors hover:text-spark-700 sm:block"
            >
              {company.phone}
            </a>
            <Link
              href="/kontakty"
              className="hidden rounded-sm bg-spark-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-spark-700 md:block"
            >
              Бесплатный расчёт
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-sm border border-line-strong text-head lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute inset-x-0 h-0.5 bg-current transition-all ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-0.5 bg-current transition-all ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line bg-base lg:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-3 text-base text-head"
                >
                  {item.label}
                  <Icon name="arrow" className="size-4 text-spark-600" />
                </Link>
              ))}
              <Link
                href="/kontakty"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-sm bg-spark-600 px-5 py-3.5 text-center font-semibold text-white"
              >
                Бесплатный расчёт
              </Link>
              <a
                href={company.phoneHref}
                className="py-3 text-center text-lg font-bold text-head"
              >
                {company.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative grid size-11 shrink-0 place-items-center rounded-sm bg-spark-500">
      <svg viewBox="0 0 24 24" className="size-6 text-white" aria-hidden="true">
        <path
          d="M3 5h4l2.5 9L12 5h2l2.5 9L19 5h2l-3.5 14h-3L12 10l-2.5 9h-3L3 5z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
