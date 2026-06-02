"use client";

import { useTrail, useSpring, animated, config } from "@react-spring/web";
import { useEffect, useState } from "react";
import {
  BombIcon, ChartDownIcon, PlantIcon, PiggyBankIcon,
  CryptoCircleIcon, DollarCircleIcon, MagnifierIcon,
  TaxDocIcon, CalendarIcon, WalletIcon, ReceiptIcon,
  TrendUpIcon, PieChartIcon, ArrowCircle, CheckCircle,
} from "./Icons";

/* Deep Sea palette tokens */
const DS = {
  bg:      "#0D1B2A",
  surface: "#1B263B",
  accent:  "#415A77",
  muted:   "#778DA9",
  text:    "#E0E1DD",
} as const;

const CARD = `border rounded-xl p-4` +
  ` border-[#415A77]/40 bg-[#1B263B]`;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${CARD} ${className}`}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono-dm text-[10px] tracking-[0.18em] uppercase text-[#778DA9] mb-1">
      {children}
    </p>
  );
}

function Value({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-bebas text-3xl tracking-wide text-[#E0E1DD] ${className}`}>
      {children}
    </p>
  );
}

function SmallValue({ children }: { children: React.ReactNode }) {
  return <p className="font-bebas text-xl tracking-wide text-[#E0E1DD]">{children}</p>;
}

/* ── Pie chart SVG ── */
function PieChart() {
  const segments = [
    { pct: 60, color: "#778DA9", opacity: 1 },
    { pct: 25, color: "#415A77", opacity: 1 },
    { pct: 10, color: "#1B263B", opacity: 1 },
    { pct: 5,  color: "#0D1B2A", opacity: 1 },
  ];
  const r = 40;
  const cx = 50;
  const cy = 50;
  let cumulative = 0;

  function arc(pct: number) {
    const start = cumulative;
    cumulative += pct;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = pct > 50 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  }

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {segments.map((s, i) => (
        <path key={i} d={arc(s.pct)} fill={s.color} opacity={s.opacity} stroke="#0D1B2A" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

/* ── Progress bar ── */
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1 h-[6px] bg-[#415A77]/20 rounded-full overflow-hidden">
        <div className="h-full bg-[#778DA9] rounded-full" style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono-dm text-xs text-[#778DA9]">{value}%</span>
    </div>
  );
}

/* ── Income/Bills cycle diagram ── */
function CycleDiagram() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      <ArrowCircle size={160} />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono-dm text-[9px] text-[#778DA9] uppercase tracking-widest">INCOME</p>
        <p className="font-bebas text-lg">$5,600</p>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono-dm text-[9px] text-[#778DA9] uppercase tracking-widest">BILLS</p>
        <p className="font-bebas text-lg">$2,150</p>
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-center">
        <CryptoCircleIcon size={34} symbol="₿" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
        <DollarCircleIcon size={34} />
      </div>
    </div>
  );
}

/* ── Bottom stat strip ── */
function BottomStat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="opacity-80">{icon}</div>
      <div>
        <p className="font-mono-dm text-[10px] uppercase tracking-widest text-[#778DA9]">{label}</p>
        <p className="font-bebas text-2xl leading-none">{value}</p>
        <p className="font-mono-dm text-[10px] text-[#778DA9]/60 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const items = Array.from({ length: 14 });
  const trail = useTrail(items.length, {
    opacity: visible ? 1 : 0,
    y: visible ? 0 : 28,
    config: { mass: 1, tension: 220, friction: 26 },
    delay: 80,
  });

  const heroSpring = useSpring({
    opacity: visible ? 1 : 0,
    scale: visible ? 1 : 0.92,
    config: config.gentle,
    delay: 200,
  });

  const A = animated.div;

  return (
    <div className="min-h-screen bg-[#0D1B2A] p-5 select-none">
      {/* ═══════════ MAIN GRID ═══════════ */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 200px",
          gridTemplateRows: "auto auto auto auto auto",
        }}
      >
        {/* ── Row 1 ── */}

        {/* DEBT */}
        <A style={trail[0]} className={CARD}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bebas text-2xl tracking-widest text-[#E0E1DD] mb-3">DEBT</p>
              <Label>Total Debt</Label>
              <Value>$12,450</Value>
              <Label>Due This Month</Label>
              <SmallValue>$850</SmallValue>
            </div>
            <BombIcon size={72} />
          </div>
        </A>

        {/* EXPENSES */}
        <A style={trail[1]} className={CARD}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bebas text-2xl tracking-widest text-[#E0E1DD] mb-3">EXPENSES</p>
              <Label>This Month</Label>
              <Value>$3,240</Value>
            </div>
            <ChartDownIcon size={72} />
          </div>
        </A>

        {/* INVESTMENT */}
        <A style={trail[2]} className={CARD}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bebas text-2xl tracking-widest text-[#E0E1DD] mb-3">INVESTMENT</p>
              <Label>Portfolio Value</Label>
              <Value>$24,780</Value>
            </div>
            <PlantIcon size={80} />
          </div>
        </A>

        {/* Coin cluster — right column, spans rows 1-2 */}
        <A
          style={{ ...trail[3], gridRow: "1 / 3" }}
          className="flex flex-col items-center justify-around gap-2"
        >
          <div className="flex gap-2">
            <DollarCircleIcon size={56} />
            <CryptoCircleIcon size={56} symbol="₿" />
          </div>
          <div className="flex gap-2">
            <CryptoCircleIcon size={44} symbol="₿" />
            <DollarCircleIcon size={44} />
          </div>
          <div className="flex justify-center">
            <DollarCircleIcon size={36} />
          </div>
        </A>

        {/* ── Row 2 ── */}

        {/* SAVINGS */}
        <A style={trail[4]} className={CARD}>
          <p className="font-bebas text-2xl tracking-widest text-[#E0E1DD] mb-3">SAVINGS</p>
          <div className="flex gap-4 items-center">
            <PiggyBankIcon size={80} />
            <div className="flex-1">
              <Label>Total Savings</Label>
              <Value>$8,670</Value>
              <Label>Savings Goal</Label>
              <ProgressBar value={72} />
            </div>
          </div>
        </A>

        {/* Hero centre — spans col 2-3 row 2 */}
        <animated.div
          style={{ ...heroSpring, gridColumn: "2 / 4", gridRow: "2" }}
          className="flex flex-col items-center justify-center py-6"
        >
          <h1 className="font-bebas text-[9vw] leading-none tracking-widest text-[#E0E1DD]">
            FINANCE
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-px w-12 bg-[#415A77]/50" />
            <p className="font-mono-dm text-xs tracking-[0.3em] uppercase text-[#778DA9]">
              Manage Today. Build Tomorrow.
            </p>
            <div className="h-px w-12 bg-[#415A77]/50" />
          </div>
        </animated.div>

        {/* ── Row 3 ── */}

        {/* Income / Bills cycle */}
        <A style={trail[5]} className="flex items-center justify-center">
          <CycleDiagram />
        </A>

        {/* FINANCIAL PLAN */}
        <A style={trail[6]} className={CARD}>
          <p className="font-bebas text-2xl tracking-widest text-[#E0E1DD] mb-3">FINANCIAL PLAN</p>
          <ul className="space-y-2">
            {["Set Goals", "Budget Wisely", "Manage Risk", "Track Progress"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 font-mono-dm text-sm text-[#E0E1DD]/80">
                <span className="text-[#778DA9]/60">{["⊙", "◷", "⊕", "↗"][i]}</span>
                {item}
              </li>
            ))}
          </ul>
        </A>

        {/* ASSET ALLOCATION */}
        <A style={trail[7]} className={CARD}>
          <p className="font-mono-dm text-[10px] uppercase tracking-widest text-[#778DA9] mb-3">
            Asset Allocation
          </p>
          <div className="flex items-center gap-4">
            <PieChart />
            <ul className="space-y-1.5">
              {[
                { label: "Investment", pct: "60%", swatch: "#778DA9" },
                { label: "Savings",    pct: "25%", swatch: "#415A77" },
                { label: "Income",     pct: "10%", swatch: "#1B263B" },
                { label: "Tax",        pct: "5%",  swatch: "#0D1B2A" },
              ].map((s) => (
                <li key={s.label} className="flex gap-2 items-center font-mono-dm text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block border border-[#415A77]/50" style={{ background: s.swatch }} />
                  <span className="text-[#E0E1DD]">{s.pct}</span>
                  <span className="text-[#778DA9]">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-4 w-full rounded-lg py-2 font-bebas tracking-widest text-base text-[#0D1B2A] transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#778DA9,#415A77)" }}>
            VIEW PLAN
          </button>
        </A>

        {/* Right col row 3: ANALYSIS + TAX stacked */}
        <A style={trail[8]} className="flex flex-col gap-3">
          {/* ANALYSIS */}
          <div className="flex items-center gap-3">
            <MagnifierIcon size={56} />
            <div>
              <p className="font-bebas text-base tracking-widest">ANALYSIS</p>
              <p className="font-mono-dm text-[10px] text-[#778DA9] leading-relaxed">Track. Review.<br />Improve.</p>
            </div>
          </div>

          {/* TAX */}
          <Card>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <p className="font-bebas text-3xl tracking-widest">TAX</p>
                <TaxDocIcon size={34} />
              </div>
              <div className="text-right">
                <Label>Bills</Label>
                <SmallValue>$1,250</SmallValue>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-[#778DA9]">
              <div className="text-center">
                <DollarCircleIcon size={26} />
                <p className="font-mono-dm text-[9px] mt-1 uppercase tracking-wider">Income</p>
              </div>
              <span className="text-[#E0E1DD]/25 text-lg">→</span>
              <div className="text-center">
                <div className="w-7 h-7 border border-[#778DA9]/40 rounded-full flex items-center justify-center">
                  <span className="font-bebas text-sm">%</span>
                </div>
                <p className="font-mono-dm text-[9px] mt-1 uppercase tracking-wider">Tax</p>
              </div>
              <span className="text-[#E0E1DD]/25 text-lg">→</span>
              <div className="text-center">
                <ReceiptIcon size={26} />
                <p className="font-mono-dm text-[9px] mt-1 uppercase tracking-wider">Bills</p>
              </div>
            </div>
          </Card>
        </A>

        {/* ── Row 4: Planning + coin stack ── */}
        <A style={trail[9]} />

        <A style={trail[10]} />

        {/* PLANNING */}
        <A style={trail[11]} className={CARD}>
          <p className="font-bebas text-xl tracking-widest text-[#E0E1DD] mb-3">PLANNING</p>
          <div className="flex gap-3">
            <CalendarIcon size={40} />
            <ul className="space-y-2">
              {[
                { label: "Emergency Fund", done: true },
                { label: "Retirement",     done: true },
                { label: "Major Purchase", done: false },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 font-mono-dm text-xs text-[#E0E1DD]/70">
                  <CheckCircle checked={item.done} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </A>

        {/* Coin stack right */}
        <A style={trail[12]} className="flex flex-col items-center justify-center gap-2">
          <DollarCircleIcon size={40} />
          <DollarCircleIcon size={34} />
          <DollarCircleIcon size={28} />
        </A>

        {/* ── Row 5: Bottom strip ── */}
        <A
          style={trail[13]}
          className="border border-[#415A77]/40 rounded-xl bg-[#1B263B] col-span-4 grid grid-cols-4 gap-0"
        >
          {[
            {
              icon: <WalletIcon size={32} />,
              label: "INCOME",
              value: "$5,600",
              sub: "This Month",
            },
            {
              icon: <ReceiptIcon size={32} />,
              label: "BILLS",
              value: "$2,150",
              sub: "Due This Month",
            },
            {
              icon: <TrendUpIcon size={32} />,
              label: "NET CASH FLOW",
              value: "$3,450",
              sub: "This Month",
            },
            {
              icon: <PieChartIcon size={32} />,
              label: "SAVINGS RATE",
              value: "32%",
              sub: "This Month",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-6 py-4 ${i < 3 ? "border-r border-[#415A77]/40" : ""}`}
            >
              <BottomStat {...s} />
            </div>
          ))}
        </A>
      </div>
    </div>
  );
}
