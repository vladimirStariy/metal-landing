type IconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, React.ReactNode> = {
  // Токарный станок / вал в центрах
  lathe: (
    <>
      <path d="M3 8v8M21 8v8" />
      <path d="M3 12h3M18 12h3" />
      <rect x="6" y="9" width="12" height="6" rx="1" />
      <path d="M9 9v6M12 9v6M15 9v6" />
    </>
  ),
  // Лазерная резка
  laser: (
    <>
      <path d="M12 2v6" />
      <path d="M9 8h6l-3 5-3-5z" />
      <path d="M12 13v3" />
      <path d="M3 19h18" />
      <path d="M7 19l1.5-3M17 19l-1.5-3" />
    </>
  ),
  // Гибка листа
  bend: (
    <>
      <path d="M3 17h8a6 6 0 0 0 6-6V5" />
      <path d="M14 8l3-3 3 3" />
      <path d="M3 20h18" />
    </>
  ),
  // Сварка
  weld: (
    <>
      <path d="M4 20l7-7" />
      <path d="M9 11l4-4 3 3-4 4z" />
      <path d="M16 7l2-2 1 1-2 2" />
      <path d="M19 12h2M18 16l1.5 1.5M20 8.5h1.5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </>
  ),
  // Чертёж
  draft: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M7 13h6M7 16h4" />
      <path d="M16 13l3 3" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a4 4 0 1 0 5 5l-3.4-1.6-1.6-3.4z" />
      <path d="M14 10L4.5 19.5a2.1 2.1 0 0 0 3 3L17 13" />
    </>
  ),
  crane: (
    <>
      <path d="M4 21V4h9" />
      <path d="M4 4l16 3" />
      <path d="M13 4v4" />
      <path d="M16 6v5" />
      <rect x="13.5" y="11" width="5" height="4" rx="0.5" />
      <path d="M2 21h20" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 4V10l6 4V7l6 3v11z" />
      <path d="M7 21v-3M12 21v-3M17 21v-3" />
    </>
  ),
  price: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8h3.5a2.5 2.5 0 0 1 0 5H9" />
      <path d="M9 13v4M8 11h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  phone: (
    <>
      <path d="M5 3h4l2 5-2.5 1.5a13 13 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 6.5" />,
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
};

export default function Icon({ name, className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.gear}
    </svg>
  );
}
