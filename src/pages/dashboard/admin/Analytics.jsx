import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FiBarChart2, FiActivity, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import {
  L,
  fmtCurrency,
  fmtNum,
  Card,
  Stat,
  Grid,
  Empty,
  Loader,
  ChartTooltip,
} from "../dashTheme.jsx";

const API = import.meta.env.VITE_API_URL || "https://lumora-server.vercel.app";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [monthly, setMonthly] = useState([]);
  const [bookingTrend, setBookingTrend] = useState([]);
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0, totalServices: 0, totalUsers: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const token = await localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${token}` };
        const [rev, bk, sum] = await Promise.all([
          axios.get(`${API}/api/analytics/monthly-revenue`, { headers }),
          axios.get(`${API}/api/analytics/booking-trend`, { headers }),
          axios.get(`${API}/api/analytics/summary`, { headers }).catch(() => ({ data: {} })),
        ]);
        setMonthly(rev.data || []);
        setBookingTrend(bk.data || []);
        setStats({
          totalBookings: sum.data.totalBookings || 0,
          totalRevenue: sum.data.totalRevenue || 0,
          totalServices: sum.data.totalServices || 0,
          totalUsers: sum.data.totalUsers || 0,
        });
      } catch (err) {
        setError("Analytics data is unavailable right now.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Empty icon={FiActivity} title="Analytics unavailable" note={error} />;

  const statsArr = [
    { icon: FiShoppingBag, label: "Total Bookings", value: fmtNum(stats.totalBookings), accent: L.primary },
    { icon: FiDollarSign, label: "Total Revenue", value: fmtCurrency(stats.totalRevenue), accent: L.teal },
    { icon: FiBarChart2, label: "Services", value: fmtNum(stats.totalServices), accent: L.indigo },
    { icon: FiActivity, label: "Users", value: fmtNum(stats.totalUsers), accent: L.amber },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--lum-text)]">Analytics</h1>
        <p className="mt-1 text-sm text-[var(--lum-text)]/55">Platform performance and demand signals.</p>
      </div>

      <Grid cols={4}>
        {statsArr.map((s, i) => (
          <Stat key={s.label} {...s} index={i} />
        ))}
      </Grid>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-[var(--lum-text)]">Monthly Revenue</h3>
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
          <h3 className="mb-4 text-lg font-semibold text-[var(--lum-text)]">Booking Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingTrend} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--lum-skysoft)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--lum-text)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--lum-text)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip formatter={fmtNum} />} cursor={{ stroke: L.accent, strokeOpacity: 0.3 }} />
                <Line type="monotone" dataKey="bookings" name="Bookings" stroke={L.teal} strokeWidth={3} dot={{ r: 3, fill: L.teal }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
