import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCalendar, FiCreditCard, FiPackage, FiArrowRight, FiClock } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { L, fmtCurrency, Card, Grid, Loader, ChartTooltip } from "../dashTheme.jsx";
import { PageHeader, SectionTitle, EmptyState, SupportCard } from "../_ui";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API = import.meta.env.VITE_API_URL || "https://lumora-server.vercel.app";

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [trend, setTrend] = useState([]);

  const load = useCallback(async () => {
    try {
      const token = await localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };
      const [b, t] = await Promise.all([
        axios.get(`${API}/api/bookings/my-bookings`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API}/api/analytics/my-booking-trend`, { headers }).catch(() => ({ data: [] })),
      ]);
      setBookings(Array.isArray(b.data) ? b.data : b.data.bookings || []);
      setTrend(t.data || []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader />;

  const upcoming = bookings.filter((b) => b.status === "pending" || b.status === "confirmed").slice(0, 3);
  const spent = bookings.reduce((a, b) => a + (b.amount || b.price || 0), 0);

  const statsArr = [
    { icon: FiCalendar, label: "My Bookings", value: bookings.length, accent: L.primary, to: "/dashboard/my-bookings" },
    { icon: FiClock, label: "Upcoming", value: upcoming.length, accent: L.teal, to: "/dashboard/my-bookings" },
    { icon: FiCreditCard, label: "Total Spent", value: fmtCurrency(spent), accent: L.indigo, to: "/dashboard/payment-history" },
    { icon: FiPackage, label: "Browse Services", value: "→", accent: L.amber, to: "/services" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="My Dashboard" subtitle="Welcome back — here's your Lumora activity." />

      <Grid cols={4}>
        {statsArr.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={s.to} className="block">
              <div className="group rounded-2xl border border-[var(--lum-skysoft)]/60 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${s.accent}1a`, color: s.accent }}
                  >
                    <s.icon size={20} />
                  </div>
                  <FiArrowRight size={16} className="text-[var(--lum-text)]/30 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-4 text-2xl font-bold text-[var(--lum-text)]">{s.value}</p>
                <p className="text-sm text-[var(--lum-text)]/55">{s.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </Grid>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle icon={FiCalendar}>Booking Activity</SectionTitle>
          {trend.length === 0 ? (
            <p className="py-10 text-center text-sm text-[var(--lum-text)]/45">No activity to chart yet.</p>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend} margin={{ left: -16, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--lum-skysoft)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--lum-text)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--lum-text)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: L.accent, strokeOpacity: 0.3 }} />
                  <Line type="monotone" dataKey="bookings" name="Bookings" stroke={L.primary} strokeWidth={3} dot={{ r: 3, fill: L.primary }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle icon={FiClock}>Upcoming</SectionTitle>
          {upcoming.length === 0 ? (
            <EmptyState icon={FiCalendar} title="Nothing scheduled" note="Book a service to get started." />
          ) : (
            <ul className="space-y-3">
              {upcoming.map((b) => (
                <li key={b._id} className="flex items-center gap-3 rounded-xl border border-[var(--lum-skysoft)]/50 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--lum-skysoft)]/50 text-[var(--lum-accent)]">
                    <FiPackage size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--lum-text)]">{b.serviceName || b.eventType || "Booking"}</p>
                    <p className="text-xs text-[var(--lum-text)]/45 capitalize">{b.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <SupportCard />
    </div>
  );
};

export default UserDashboard;
