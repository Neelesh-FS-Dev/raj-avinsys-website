/**
 * Generic single-line diagram used on the home page. It is a decorative
 * engineering drawing, not a depiction of any Raj Avinsys project.
 */
export function SingleLineDiagram({ className = 'text-primary' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={`h-auto w-full ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* incoming line */}
      <line x1="240" y1="20" x2="240" y2="60" />
      <circle cx="240" cy="78" r="18" />
      <text x="262" y="84" fill="currentColor" stroke="none" fontFamily="Inter, sans-serif" fontSize="12">
        HT SUPPLY
      </text>
      <line x1="240" y1="96" x2="240" y2="120" />
      {/* 220 kV bus */}
      <line x1="60" y1="120" x2="420" y2="120" strokeWidth="5" stroke="#008abd" />
      <text x="60" y="108" fill="#008abd" stroke="none" fontFamily="Inter, sans-serif" fontSize="12">
        BUS A
      </text>
      {[110, 200, 290, 380].map((x) => (
        <g key={x}>
          <line x1={x} y1="120" x2={x} y2="160" />
          <rect x={x - 12} y="160" width="24" height="24" />
          <line x1={x} y1="184" x2={x} y2="220" />
          <line x1={x - 14} y1="220" x2={x + 14} y2="220" />
          <line x1={x - 9} y1="228" x2={x + 9} y2="228" />
          <line x1={x - 4} y1="236" x2={x + 4} y2="236" />
        </g>
      ))}
      {/* busway run */}
      <line x1="60" y1="290" x2="420" y2="290" strokeWidth="10" stroke="#0f3b40" strokeOpacity="0.35" />
      <text x="60" y="326" fill="currentColor" stroke="none" fontFamily="Inter, sans-serif" fontSize="12">
        SANDWICH BUSWAY · LT DISTRIBUTION
      </text>
      <line x1="200" y1="236" x2="200" y2="290" strokeDasharray="4 6" />
    </svg>
  );
}
