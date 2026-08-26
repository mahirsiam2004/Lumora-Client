import { motion } from "framer-motion";
import { FiInbox, FiLifeBuoy } from "react-icons/fi";

export const PageHeader = ({ title, subtitle }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-[var(--lum-text)]">{title}</h1>
    {subtitle && <p className="mt-1 text-sm text-[var(--lum-text)]/55">{subtitle}</p>}
  </div>
);

export const SectionTitle = ({ icon: Icon, children }) => (
  <div className="mb-4 flex items-center gap-2">
    {Icon && <Icon className="text-[var(--lum-accent)]" />}
    <h3 className="text-lg font-semibold text-[var(--lum-text)]">{children}</h3>
  </div>
);

export const EmptyState = ({ icon: Icon = FiInbox, title, note }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--lum-skysoft)] bg-white/50 py-16 text-center">
    <Icon size={28} className="text-[var(--lum-text)]/30" />
    <p className="mt-3 font-medium text-[var(--lum-text)]">{title}</p>
    {note && <p className="mt-1 text-sm text-[var(--lum-text)]/45">{note}</p>}
  </div>
);

export const SupportCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 rounded-2xl border border-[var(--lum-skysoft)]/60 bg-white p-6 shadow-sm"
  >
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lum-skysoft)]/50 text-[var(--lum-accent)]">
        <FiLifeBuoy size={18} />
      </div>
      <div>
        <p className="font-semibold text-[var(--lum-text)]">Need a hand?</p>
        <p className="text-sm text-[var(--lum-text)]/55">
          Browse the help center or reach our team — we usually reply within a few hours.
        </p>
      </div>
    </div>
  </motion.div>
);
