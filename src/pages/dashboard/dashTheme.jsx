// Shared Lumora dashboard theme — modern, calm, professional (blue/teal family)
// Replaces the old Altrion gold (#e8a803) / purple recharts palette everywhere.
export const L = {
  navy: "#14202C",
  primary: "#8CC0EB",
  accent: "#5B9BD5",
  teal: "#4FD1C5",
  indigo: "#6366F1",
  amber: "#F6A623",
  sky: "#BFDDF0",
  danger: "#EF5DA8",
  cream: "#FFF9D2",
  text: "#14202C",
};

// Revenue share constants (mirror backend if changed)
export const TOTAL_SHARE = 1;
export const DECORATOR_SHARE = 0.85;

export const fmtCurrency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);

export const fmtNum = (n) => new Intl.NumberFormat("en-US").format(n || 0);

// ---- UI primitives ----
export const Card = ({ children, className = "", hover = true }) => (
  <div
    className={`rounded-2xl border border-[var(--lum-skysoft)]/60 bg-white p-6 shadow-sm ${
      hover ? "transition-shadow hover:shadow-lg" : ""
    } ${className}`}
  >
    {children}
  </div>
);

export const Grid = ({ children, cols = 4 }) => (
  <div
    className={`grid gap-5 ${
      cols === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : cols === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : cols === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1"
    }`}
  >
    {children}
  </div>
);

export const Stat = ({ icon: Icon, label, value, accent, index = 0, sub }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="rounded-2xl border border-[var(--lum-skysoft)]/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${accent}1a`, color: accent }}
      >
        <Icon size={20} />
      </div>
    </div>
    <p className="mt-4 text-2xl font-bold text-[var(--lum-text)]">{value}</p>
    <p className="text-sm text-[var(--lum-text)]/55">{label}</p>
    {sub && <p className="mt-1 text-xs text-[var(--lum-text)]/40">{sub}</p>}
  </motion.div>
);

export const Loader = () => (
  <div className="flex h-64 items-center justify-center text-[var(--lum-text)]/50">
    <span className="loading loading-spinner loading-lg" />
  </div>
);

export const Empty = ({ icon: Icon, title, note }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--lum-skysoft)] bg-white/50 py-16 text-center">
    <Icon size={28} className="text-[var(--lum-text)]/30" />
    <p className="mt-3 font-medium text-[var(--lum-text)]">{title}</p>
    {note && <p className="mt-1 text-sm text-[var(--lum-text)]/45">{note}</p>}
  </div>
);

// Shared dark tooltip for recharts (applies across all dashboard graphs)
export const ChartTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-[#14202C] px-3 py-2 text-xs text-white shadow-lg">
      {label && <p className="mb-1 font-medium text-white/80">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="font-medium">{formatter ? formatter(p.value) : p.value}</span>
        </p>
      ))}
    </div>
  );
};
