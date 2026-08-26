import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FiDollarSign, FiTrendingUp, FiClock, FiCheckCircle, FiPieChart } from "react-icons/fi";
import { L, fmtCurrency, TOTAL_SHARE, DECORATOR_SHARE, Card, Stat, Grid, Empty, Loader } from "../dashTheme.jsx";

const API = import.meta.env.VITE_API_URL || "https://lumora-server.vercel.app";

const DonutTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl bg-[#14202C] px-3 py-2 text-xs text-white shadow-lg">
      <p className="font-medium">{d.name}</p>
      <p className="text-white/70">{fmtCurrency(d.value)}</p>
    </div>
  );
};

const Earnings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, completed: 0 });
  const [split, setSplit] = useState([
    { name: "Your earnings", value: 0 },
    { name: "Platform fee", value: 0 },
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await localStorage.getItem("authToken");
        const { data } = await axios.get(`${API}/api/bookings/decorator/earnings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const total = data.totalEarnings || 0;
        setStats({
          total,
          paid: data.paidEarnings || 0,
          pending: data.pendingEarnings || 0,
          completed: data.completedCount || 0,
        });
        setSplit([
          { name: "Your earnings", value: Math.round(total * DECORATOR_SHARE) },
          { name: "Platform fee", value: Math.round(total * TOTAL_SHARE - total * DECORATOR_SHARE) },
        ]);
      } catch (err) {
        setError("Could not load earnings.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Empty icon={FiClock} title="Earnings unavailable" note={error} />;

  const statsArr = [
    { icon: FiDollarSign, label: "Total Earnings", value: fmtCurrency(stats.total), accent: L.primary },
    { icon: FiCheckCircle, label: "Paid Out", value: fmtCurrency(stats.paid), accent: L.teal },
    { icon: FiClock, label: "Pending", value: fmtCurrency(stats.pending), accent: L.amber },
    { icon: FiTrendingUp, label: "Completed Bookings", value: stats.completed, accent: L.indigo },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--lum-text)]">Earnings</h1>
        <p className="mt-1 text-sm text-[var(--lum-text)]/55">Your payouts and revenue split at a glance.</p>
      </div>

      <Grid cols={4}>
        {statsArr.map((s, i) => (
          <Stat key={s.label} {...s} index={i} />
        ))}
      </Grid>

      <Card className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <FiPieChart className="text-[var(--lum-accent)]" />
          <h3 className="text-lg font-semibold text-[var(--lum-text)]">Revenue Split</h3>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={split}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                stroke="none"
              >
                {split.map((entry, i) => (
                  <Cell key={i} fill={i === 0 ? L.primary : L.sky} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: "var(--lum-text)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-xs text-[var(--lum-text)]/50">
          You keep {Math.round(DECORATOR_SHARE * 100)}% of every booking · platform fee {Math.round((TOTAL_SHARE - DECORATOR_SHARE) * 100)}%
        </p>
      </Card>
    </div>
  );
};

export default Earnings;
