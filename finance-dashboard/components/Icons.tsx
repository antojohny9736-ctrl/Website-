"use client";

export function BombIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="38" r="18" />
      <path d="M40 26 L48 18" />
      <path d="M44 14 Q50 12 52 18 Q54 24 48 24" strokeWidth="1.4" />
      <line x1="52" y1="14" x2="56" y2="10" />
      <circle cx="52" cy="12" r="2" fill="white" stroke="none" />
      <path d="M36 30 Q40 26 44 28" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

export function ChartDownIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="14" width="14" height="32" rx="2" />
      <rect x="25" y="22" width="14" height="24" rx="2" />
      <rect x="44" y="30" width="14" height="16" rx="2" />
      <path d="M8 54 L56 54" strokeWidth="1.2" />
      <path d="M38 10 L52 26 L48 26 M52 26 L52 22" strokeWidth="2" />
    </svg>
  );
}

export function PlantIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="36" cy="60" rx="18" ry="4" opacity="0.4" />
      <ellipse cx="34" cy="56" rx="6" ry="8" />
      <ellipse cx="44" cy="58" rx="6" ry="8" />
      <ellipse cx="54" cy="60" rx="6" ry="8" />
      <path d="M36 48 Q30 38 22 30 Q28 28 34 32 Q38 36 36 48" />
      <path d="M36 48 Q42 38 50 32 Q54 30 56 36 Q52 42 36 48" />
      <line x1="36" y1="48" x2="36" y2="62" />
      <path d="M22 62 Q36 62 50 62" strokeWidth="1.4" opacity="0.5" />
    </svg>
  );
}

export function PiggyBankIcon({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="38" cy="46" rx="26" ry="22" />
      <circle cx="52" cy="38" r="3" fill="white" />
      <path d="M62 42 L70 42 L68 52 L62 52" />
      <path d="M30 62 L26 72 M46 62 L50 72" strokeWidth="2" />
      <path d="M18 38 Q14 38 14 44 Q14 50 18 50" />
      <circle cx="40" cy="28" r="10" />
      <text x="37" y="32" fontSize="12" fill="white" stroke="none" fontFamily="Arial">$</text>
      <line x1="36" y1="18" x2="36" y2="26" strokeDasharray="2 2" />
    </svg>
  );
}

export function CryptoCircleIcon({ size = 44, symbol = "₿" }: { size?: number; symbol?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" stroke="white" strokeWidth="1.5">
      <circle cx="22" cy="22" r="20" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="white" stroke="none" fontSize="16" fontWeight="bold" fontFamily="Arial">{symbol}</text>
    </svg>
  );
}

export function DollarCircleIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" stroke="white" strokeWidth="1.5">
      <circle cx="22" cy="22" r="20" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="white" stroke="none" fontSize="18" fontWeight="bold" fontFamily="Arial">$</text>
    </svg>
  );
}

export function MagnifierIcon({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="30" cy="30" r="20" />
      <line x1="45" y1="45" x2="62" y2="62" strokeWidth="3" />
      <circle cx="30" cy="30" r="13" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function TaxDocIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
      <rect x="8" y="4" width="28" height="36" rx="3" />
      <path d="M8 12 L36 12" />
      <line x1="14" y1="20" x2="30" y2="20" />
      <line x1="14" y1="26" x2="28" y2="26" />
      <line x1="14" y1="32" x2="24" y2="32" />
      <circle cx="36" cy="34" r="8" />
      <path d="M33 37 L39 31 M33 31 L39 37" strokeWidth="1.4" />
    </svg>
  );
}

export function CalendarIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
      <rect x="4" y="8" width="36" height="32" rx="4" />
      <line x1="4" y1="16" x2="40" y2="16" />
      <line x1="14" y1="4" x2="14" y2="12" />
      <line x1="30" y1="4" x2="30" y2="12" />
      <rect x="10" y="22" width="6" height="5" rx="1" />
      <rect x="19" y="22" width="6" height="5" rx="1" />
      <rect x="28" y="22" width="6" height="5" rx="1" />
      <rect x="10" y="30" width="6" height="5" rx="1" />
      <rect x="19" y="30" width="6" height="5" rx="1" />
    </svg>
  );
}

export function WalletIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
      <rect x="2" y="8" width="32" height="22" rx="4" />
      <path d="M2 14 L34 14" />
      <path d="M6 4 L28 4 Q34 4 34 10" />
      <circle cx="26" cy="22" r="3" />
    </svg>
  );
}

export function ReceiptIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 2 L30 2 L30 34 L24 30 L18 34 L12 30 L6 34 Z" />
      <line x1="11" y1="12" x2="25" y2="12" />
      <line x1="11" y1="18" x2="25" y2="18" />
      <line x1="11" y1="24" x2="20" y2="24" />
    </svg>
  );
}

export function TrendUpIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,28 10,20 16,24 24,14 34,6" />
      <polyline points="26,6 34,6 34,14" />
      <rect x="2" y="30" width="6" height="4" rx="1" />
      <rect x="12" y="24" width="6" height="10" rx="1" />
      <rect x="22" y="18" width="6" height="16" rx="1" />
    </svg>
  );
}

export function PieChartIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="14" stroke="white" strokeWidth="1.6" />
      <path d="M18 18 L18 4 A14 14 0 0 1 32 18 Z" fill="white" opacity="0.8" />
      <path d="M18 18 L32 18 A14 14 0 0 1 22 31 Z" fill="white" opacity="0.5" />
      <path d="M18 18 L22 31 A14 14 0 0 1 4 18 Z" fill="white" opacity="0.25" />
    </svg>
  );
}

export function ArrowCircle({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="50" cy="50" r="46" strokeDasharray="4 6" opacity="0.3" />
      <circle cx="50" cy="50" r="36" strokeDasharray="4 4" opacity="0.15" />
      <path d="M50 10 Q90 10 90 50 Q90 90 50 90 Q10 90 10 50 Q10 10 50 10" strokeDasharray="none" opacity="0.6" />
      <polygon points="46,6 54,6 50,14" fill="white" stroke="none" opacity="0.8" />
      <polygon points="90,54 90,46 98,50" fill="white" stroke="none" opacity="0.8" />
      <polygon points="54,90 46,90 50,98" fill="white" stroke="none" opacity="0.5" />
    </svg>
  );
}

export function CheckCircle({ checked = true }: { checked?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="1.4">
      <circle cx="9" cy="9" r="8" opacity={checked ? 1 : 0.4} />
      {checked && <polyline points="5,9 8,12 13,6" strokeWidth="1.6" />}
    </svg>
  );
}
