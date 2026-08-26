import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiDollarSign, FiUsers, FiPackage, FiCalendar, FiBarChart2, FiArrowUpRight } from "react-icons/fi";
import { L, fmtCurrency, fmtNum, Card, Stat, Grid, Loader, ChartTooltip } from "../dashTheme.jsx";
import { PageHeader, SectionTitle, SupportCard } from "../_ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API = import.meta.env.VITE_API_URL || "https://lumora-server.vercel.app";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ revenue: 0, users: 0, services: 0, bookings: 0 });
  const [monthly, setMonthly] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${token}` };
        const [s, m, r] = await Promise.all([
          axios.get(`${API}/api/analytics/summary`, { headers }).catch(() => ({ data: {} })),
          axios.get(`${API}/api/analytics/monthly-revenue`, { headers }).catch(() => ({ data: [] })),
          axios.get(`${API}/api/bookings?limit=5`, { headers }).catch(() => ({ data: [] })),
        ]);
        setStats({
          revenue: s.data.totalRevenue || 0,
          users: s.data.totalUsers || 0,
          services: s.data.totalServices || 0,
          bookings: s.data.totalBookings || 0,
        });
        setMonthly(m.data || []);
        setRecent(Array.isArray(r.data) ? r.data : r.data.bookings || []);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  const statsArr = [
    { icon: FiDollarSign, label: "Revenue", value: fmtCurrency(stats.revenue), accent: L.primary },
    { icon: FiUsers, label: "Users", value: fmtNum(stats.users), accent: L.teal },
    { icon: FiPackage, label: "Services", value: fmtNum(stats.services), accent: L.indigo },
    { icon: FiCalendar, label: "Bookings", value: fmtNum(stats.bookings), accent: L.amber },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Admin Dashboard" subtitle="A bird's-eye view of Lumora's operations." />

      <Grid cols={4}>
        {statsArr.map((s, i) => (
          <Stat key={s.label} {...s} index={i} />
        ))}
      </Grid>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle icon={FiBarChart2}>Revenue Overview</SectionTitle>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--lum-skysoft)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--lum-text)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--lum-text)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip formatter={fmtCurrency} />} cursor={{ fill: "rgba(140,192,235,0.12)" }} />
                <Bar dataKey="revenue" name="Revenue" fill={L.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle icon={FiCalendar}>Recent Bookings</SectionTitle>
          {recent.length === 0 ? (
            <p className="py-10 text-center text-sm text-[var(--lum-text)]/45">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-[var(--lum-skysoft)]/50">
              {recent.map((b) => (
                <li key={b._id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--lum-text)]">{b.serviceName || b.eventType || "Booking"}</p>
                    <p className="text-xs text-[var(--lum-text)]/45">{b.userName || b.customerName || "Customer"}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                      b.status === "completed"
                        ? "bg-[#4FD1C5]/15 text-[#0F9B8E]"
                        : b.status === "pending"
                        ? "bg-[#F6A623]/15 text-[#B9760A]"
                        : "bg-[var(--lum-skysoft)]/40 text-[var(--lum-text)]/70"
                    }`}
                  >
                    {b.status || "new"}
                  </span>
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

export default AdminDashboard;
