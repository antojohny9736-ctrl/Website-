import React, { useState, useMemo } from "react";
import { Coffee, Gamepad2, CreditCard, Receipt, Wrench, RotateCcw } from "lucide-react";

// ---- Brand palette (inline styles; Tailwind core utilities used for layout) ----
const C = {
  bg: "#0A0A0B",
  panel: "#141416",
  panel2: "#1B1B1E",
  line: "#2A2A2E",
  text: "#F4F4F5",
  muted: "#8B8B91",
  steel: "#B9BdC4",
  red: "#E11D2A",
  redDim: "#7F1620",
  green: "#22C55E",
};

const DEFAULTS = {
  // Café
  coffeesPerDay: 80,
  coffeePrice: 5.5,
  foodCoversPerDay: 35,
  foodSpend: 16,
  openDays: 26,
  // Gaming
  rigs: 3,
  hourlyRate: 15,
  utilHours: 4,
  // Membership
  members: 60,
  memberFee: 25,
  // Monthly costs
  cogsPct: 32,
  rent: 6000,
  staff: 12000,
  other: 2500,
  // Upfront one-off
  fitout: 80000,
  rigCost: 4000,
};

const money = (n) =>
  "$" + Math.round(n).toLocaleString("en-AU", { maximumFractionDigits: 0 });

function Field({ label, value, onChange, prefix, suffix, step = 1 }) {
  return (
    <label className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm" style={{ color: C.muted }}>
        {label}
      </span>
      <span
        className="flex items-center rounded-md overflow-hidden"
        style={{ background: C.panel2, border: `1px solid ${C.line}` }}
      >
        {prefix && (
          <span className="pl-2 text-xs" style={{ color: C.muted }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-20 bg-transparent px-2 py-1.5 text-right text-sm font-mono outline-none"
          style={{ color: C.text }}
        />
        {suffix && (
          <span className="pr-2 text-xs" style={{ color: C.muted }}>
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div
      className="rounded-xl p-4 mb-3"
      style={{ background: C.panel, border: `1px solid ${C.line}` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon size={15} style={{ color: C.red }} />
        <h3
          className="text-xs font-semibold uppercase"
          style={{ color: C.steel, letterSpacing: "0.18em" }}
        >
          {title}
        </h3>
      </div>
      <div style={{ borderTop: `1px solid ${C.line}` }} className="pt-1">
        {children}
      </div>
    </div>
  );
}

// Tacho-style gauge built from sampled points (no arc-flag ambiguity)
function Gauge({ net, lo, hi }) {
  const cx = 150,
    cy = 152,
    r = 116,
    needleLen = 100;

  const pt = (rad, phiDeg) => {
    const a = (phiDeg * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy - rad * Math.sin(a)];
  };
  const arc = (rad, from, to, n = 48) => {
    let d = "";
    for (let i = 0; i <= n; i++) {
      const phi = from + ((to - from) * i) / n;
      const [x, y] = pt(rad, phi);
      d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    return d;
  };

  const t = Math.max(0, Math.min(1, (net - lo) / (hi - lo))); // 0 loss .. 1 profit
  const phi = t * 180; // 0deg=right(loss), 180deg=left(profit), 90deg=break-even(top)
  const [nx, ny] = pt(needleLen, phi);
  const profitable = net >= 0;

  const ticks = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180];

  return (
    <svg viewBox="0 0 300 170" className="w-full">
      {/* loss band (right) */}
      <path d={arc(r, 0, 90)} fill="none" stroke={C.red} strokeWidth="10" strokeLinecap="round" opacity="0.92" />
      {/* profit band (left) */}
      <path d={arc(r, 90, 180)} fill="none" stroke={C.green} strokeWidth="10" strokeLinecap="round" opacity="0.85" />

      {/* ticks */}
      {ticks.map((phiT, i) => {
        const [x1, y1] = pt(r - 14, phiT);
        const [x2, y2] = pt(r - 4, phiT);
        const major = phiT === 90;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={major ? C.red : C.line}
            strokeWidth={major ? 3 : 1.5}
          />
        );
      })}

      {/* THE REDLINE marker at break-even (top) */}
      <text x={cx} y={26} textAnchor="middle" fontSize="9" letterSpacing="2" fill={C.red} fontWeight="700">
        THE REDLINE
      </text>
      <text x={cx} y={37} textAnchor="middle" fontSize="7" letterSpacing="1.5" fill={C.muted}>
        BREAK-EVEN
      </text>

      {/* needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={profitable ? C.green : C.red} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7" fill={C.panel2} stroke={profitable ? C.green : C.red} strokeWidth="2.5" />

      {/* end labels */}
      <text x={cx + r - 6} y={cy + 12} textAnchor="middle" fontSize="8" letterSpacing="1.5" fill={C.muted}>
        LOSS
      </text>
      <text x={cx - r + 6} y={cy + 12} textAnchor="middle" fontSize="8" letterSpacing="1.5" fill={C.muted}>
        PROFIT
      </text>

      {/* digital readout */}
      <text
        x={cx}
        y={cy - 18}
        textAnchor="middle"
        fontSize="26"
        fontWeight="800"
        fontFamily="ui-monospace, monospace"
        fill={profitable ? C.green : C.red}
      >
        {(net < 0 ? "-" : "+") + money(Math.abs(net))}
      </text>
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" letterSpacing="2" fill={C.muted}>
        NET / MONTH
      </text>
    </svg>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div
      className="rounded-lg px-3 py-2.5 flex-1"
      style={{ background: C.panel2, border: `1px solid ${C.line}` }}
    >
      <div className="text-xs" style={{ color: C.muted, letterSpacing: "0.08em" }}>
        {label}
      </div>
      <div className="text-base font-mono font-semibold mt-0.5" style={{ color: accent || C.text }}>
        {value}
      </div>
    </div>
  );
}

export default function RedlineBreakeven() {
  const [v, setV] = useState(DEFAULTS);
  const set = (k) => (val) => setV((p) => ({ ...p, [k]: val }));

  const m = useMemo(() => {
    const cafeRev = (v.coffeesPerDay * v.coffeePrice + v.foodCoversPerDay * v.foodSpend) * v.openDays;
    const gamingRev = v.rigs * v.hourlyRate * v.utilHours * v.openDays;
    const memberRev = v.members * v.memberFee;
    const revenue = cafeRev + gamingRev + memberRev;

    const cogs = cafeRev * (v.cogsPct / 100);
    const fixed = v.rent + v.staff + v.other;
    const costs = cogs + fixed;
    const net = revenue - costs;

    // break-even sales holding the revenue mix constant
    const contributionRate = revenue > 0 ? (revenue - cogs) / revenue : 0;
    const breakEvenRev = contributionRate > 0 ? fixed / contributionRate : 0;

    const upfront = v.fitout + v.rigs * v.rigCost;
    const payback = net > 0 ? upfront / net : null;

    return { cafeRev, gamingRev, memberRev, revenue, costs, net, breakEvenRev, upfront, payback, fixed };
  }, [v]);

  // gauge domain, padded so the needle never pins
  const span = Math.max(15000, Math.abs(m.net) * 1.3);
  const streams = [
    { name: "Café", val: m.cafeRev, color: C.red },
    { name: "Gaming", val: m.gamingRev, color: C.steel },
    { name: "Members", val: m.memberRev, color: "#5B6B7A" },
  ];
  const maxStream = Math.max(m.revenue, 1);

  const insight = m.net >= 0
    ? `Profitable by ${money(m.net)}/mo. At this rate the ${money(m.upfront)} fit-out pays back in about ${Math.ceil(m.payback)} months.`
    : `Short by ${money(Math.abs(m.net))}/mo. You'd need sales near ${money(m.breakEvenRev)} to cross the redline.`;

  return (
    <div className="min-h-screen w-full" style={{ background: C.bg, color: C.text }}>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight">REDLINE</span>
              <span className="text-2xl font-extrabold tracking-tight" style={{ color: C.red }}>
                CLUB
              </span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: C.muted, letterSpacing: "0.22em" }}>
              PHASE 1 · CAFÉ + GAMING HUB · BREAK-EVEN MODEL
            </div>
          </div>
          <button
            onClick={() => setV(DEFAULTS)}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-xs"
            style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.steel }}
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT: inputs */}
          <div>
            <Section icon={Coffee} title="Café">
              <Field label="Coffees / day" value={v.coffeesPerDay} onChange={set("coffeesPerDay")} />
              <Field label="Avg coffee price" value={v.coffeePrice} onChange={set("coffeePrice")} prefix="$" step={0.5} />
              <Field label="Food covers / day" value={v.foodCoversPerDay} onChange={set("foodCoversPerDay")} />
              <Field label="Avg food spend" value={v.foodSpend} onChange={set("foodSpend")} prefix="$" />
              <Field label="Open days / month" value={v.openDays} onChange={set("openDays")} />
            </Section>

            <Section icon={Gamepad2} title="Gaming hub">
              <Field label="Sim rigs" value={v.rigs} onChange={set("rigs")} />
              <Field label="Rate / hour" value={v.hourlyRate} onChange={set("hourlyRate")} prefix="$" />
              <Field label="Booked hrs / rig / day" value={v.utilHours} onChange={set("utilHours")} step={0.5} />
            </Section>

            <Section icon={CreditCard} title="Membership">
              <Field label="Members" value={v.members} onChange={set("members")} />
              <Field label="Fee / month" value={v.memberFee} onChange={set("memberFee")} prefix="$" />
            </Section>

            <Section icon={Receipt} title="Monthly costs">
              <Field label="Food & bev cost" value={v.cogsPct} onChange={set("cogsPct")} suffix="%" />
              <Field label="Rent" value={v.rent} onChange={set("rent")} prefix="$" step={250} />
              <Field label="Staff wages" value={v.staff} onChange={set("staff")} prefix="$" step={250} />
              <Field label="Utilities / other" value={v.other} onChange={set("other")} prefix="$" step={100} />
            </Section>

            <Section icon={Wrench} title="Upfront (one-off)">
              <Field label="Fit-out & build" value={v.fitout} onChange={set("fitout")} prefix="$" step={5000} />
              <Field label="Cost per sim rig" value={v.rigCost} onChange={set("rigCost")} prefix="$" step={500} />
            </Section>
          </div>

          {/* RIGHT: results */}
          <div className="md:sticky md:top-6 md:self-start">
            <div className="rounded-xl p-4 mb-3" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <Gauge net={m.net} lo={-span} hi={span} />
            </div>

            <div className="flex gap-2 mb-3">
              <Stat label="REVENUE / MO" value={money(m.revenue)} />
              <Stat label="COSTS / MO" value={money(m.costs)} />
            </div>

            {/* revenue mix bar */}
            <div className="rounded-xl p-4 mb-3" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div className="text-xs mb-2" style={{ color: C.muted, letterSpacing: "0.1em" }}>
                WHERE THE MONEY COMES FROM
              </div>
              <div className="flex w-full h-3 rounded-full overflow-hidden mb-3" style={{ background: C.panel2 }}>
                {streams.map((s) => (
                  <div key={s.name} style={{ width: `${(s.val / maxStream) * 100}%`, background: s.color }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {streams.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5 text-xs">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                    <span style={{ color: C.muted }}>{s.name}</span>
                    <span className="font-mono" style={{ color: C.text }}>{money(s.val)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <Stat label="BREAK-EVEN SALES / MO" value={money(m.breakEvenRev)} accent={C.steel} />
              <Stat
                label="FIT-OUT PAYBACK"
                value={m.payback ? `${Math.ceil(m.payback)} mo` : "—"}
                accent={m.payback ? C.steel : C.muted}
              />
            </div>

            <div
              className="rounded-xl p-4 text-sm leading-relaxed"
              style={{ background: C.panel, border: `1px solid ${m.net >= 0 ? C.green : C.redDim}`, color: C.text }}
            >
              {insight}
            </div>

            <p className="text-xs mt-3 leading-relaxed" style={{ color: C.muted }}>
              All figures are illustrative starting points in AUD — swap in real Gold Coast quotes for rent, wages and rig
              costs to make it yours. The model assumes food & bev cost applies only to café sales; gaming and membership
              are treated as near-zero cost of goods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
