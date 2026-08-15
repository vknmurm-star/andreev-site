export default function Seal() {
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full" role="img" aria-label="Печать: более 10 лет практики, миграционное право, Москва">
      <defs>
        <path id="seal-ring" d="M 130,130 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
      </defs>
      <circle cx="130" cy="130" r="118" fill="none" stroke="var(--brass)" strokeWidth="1" />
      <circle cx="130" cy="130" r="100" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="130" cy="130" r="94" fill="none" stroke="var(--ink)" strokeWidth="0.5" />
      <text fill="var(--brass-deep)" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="3">
        <textPath href="#seal-ring" startOffset="2%">
          МИГРАЦИОННОЕ ПРАВО • МОСКВА • АДВОКАТ ПО ДЕПОРТАЦИИ •
        </textPath>
      </text>
      <text
        x="130"
        y="122"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="700"
        fontSize="46"
        fill="var(--ink)"
      >
        10+
      </text>
      <text
        x="130"
        y="148"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="2"
        fill="var(--text-muted)"
      >
        ЛЕТ ПРАКТИКИ
      </text>
      <line x1="90" y1="160" x2="170" y2="160" stroke="var(--line)" strokeWidth="1" />
      <text
        x="130"
        y="176"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1.5"
        fill="var(--seal)"
      >
        Е.В. АНДРЕЕВ
      </text>
    </svg>
  );
}
