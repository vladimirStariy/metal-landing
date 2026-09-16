"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "../company";
import { mainNav, type NavItem } from "../content/navigation";
import Icon from "./Icon";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape и клик вне меню закрывают выпадающий список
  useEffect(() => {
    if (!openMenu) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hazard h-1.5" />
      <div
        className={`transition-colors duration-300 ${
          scrolled || mobileOpen || openMenu
            ? "border-b border-line bg-base/92 shadow-[0_1px_16px_rgba(15,20,25,0.07)] backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" onClick={closeAll}>
            <Logo />
            <span className="leading-tight">
              <span className="display block text-lg text-head">Велдинг Тайм</span>
              <span className="block text-[11px] tracking-[0.18em] text-soft uppercase">
                Металлообработка
              </span>
            </span>
          </Link>

          <nav ref={navRef} className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.children ? (
                <Dropdown
                  key={item.href}
                  item={item}
                  open={openMenu === item.href}
                  active={isActive(item.href)}
                  onToggle={() =>
                    setOpenMenu((v) => (v === item.href ? null : item.href))
                  }
                  onOpen={() => setOpenMenu(item.href)}
                  onClose={() => setOpenMenu(null)}
                  onNavigate={closeAll}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:text-spark-700 ${
                    isActive(item.href) ? "text-spark-700" : "text-body"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
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
              onClick={closeAll}
              className="hidden rounded-sm bg-spark-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-spark-700 md:block"
            >
              Бесплатный расчёт
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
              className="grid size-11 place-items-center rounded-sm border border-line-strong text-head lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute inset-x-0 h-0.5 bg-current transition-all ${
                    mobileOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-0.5 bg-current transition-all ${
                    mobileOpen ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-line bg-base lg:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.href} className="border-b border-line">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="flex-1 py-3 text-base text-head"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSection((v) =>
                            v === item.href ? null : item.href,
                          )
                        }
                        aria-label={`Показать раздел «${item.label}»`}
                        aria-expanded={mobileSection === item.href}
                        className="grid size-10 place-items-center text-spark-600"
                      >
                        <Chevron open={mobileSection === item.href} />
                      </button>
                    </div>
                    {mobileSection === item.href && (
                      <ul className="mb-3 space-y-1 border-l-2 border-spark-100 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className="block py-2 text-sm text-body"
                            >
                              {child.label}
                              {child.note && (
                                <span className="mt-0.5 block text-xs text-soft">
                                  {child.note}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="flex items-center justify-between border-b border-line py-3 text-base text-head"
                  >
                    {item.label}
                    <Icon name="arrow" className="size-4 text-spark-600" />
                  </Link>
                ),
              )}

              <Link
                href="/kontakty"
                onClick={closeAll}
                className="mt-4 rounded-sm bg-spark-600 px-5 py-3.5 text-center font-semibold text-white"
              >
                Бесплатный расчёт
              </Link>
              <a
                href={company.phoneHref}
                onClick={closeAll}
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

function Dropdown({
  item,
  open,
  active,
  onToggle,
  onOpen,
  onClose,
  onNavigate,
}: {
  item: NavItem;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:text-spark-700 ${
          active || open ? "text-spark-700" : "text-body"
        }`}
      >
        {item.label}
        <Chevron open={open} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2">
          <div className="w-[21rem] overflow-hidden rounded-md border border-line bg-base shadow-[0_24px_60px_-28px_rgba(15,20,25,0.4)]">
            <div className="hazard h-1.5" />
            <ul className="divide-y divide-line">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-spark-50/70"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-head">
                        {child.label}
                      </span>
                      {child.note && (
                        <span className="mt-0.5 block text-xs leading-relaxed text-soft">
                          {child.note}
                        </span>
                      )}
                    </span>
                    <Icon
                      name="arrow"
                      className="mt-0.5 size-4 shrink-0 text-spark-600 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex items-center justify-between border-t border-line bg-surface px-5 py-3 text-xs font-bold tracking-[0.14em] text-spark-700 uppercase hover:bg-spark-50"
            >
              Все разделы
              <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
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
