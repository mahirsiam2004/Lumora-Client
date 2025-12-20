import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiDollarSign, FiUsers, FiPackage, FiCalendar } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("lumora-token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/analytics/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Analytics data received:", data);
      console.log("Service demand data:", data.serviceDemand);

      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
      </div>
    );
  }

  const stats = [
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: `৳${(analytics?.totalRevenue || 0).toLocaleString()}`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiCalendar,
      label: "Total Bookings",
      value: analytics?.totalBookings || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiUsers,
      label: "Total Users",
      value: analytics?.totalUsers || 0,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FiPackage,
      label: "Total Decorators",
      value: analytics?.totalDecorators || 0,
      color: "from-orange-500 to-red-500",
    },
  ];

  // Transform service demand data
  const chartData =
    analytics?.serviceDemand?.slice(0, 8).map((item) => ({
      name:
        item._id && item._id.length > 15
          ? item._id.substring(0, 15) + "..."
          : item._id || "Unknown",
      bookings: item.count || 0,
    })) || [];

  console.log("Chart data for AdminDashboard:", chartData);
  console.log("Has data?", chartData.length > 0);

  // Colors for bars
  const COLORS = [
    "#9333ea",
    "#ec4899",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-800">
            {payload[0].payload.name}
          </p>
          <p className="text-purple-600 font-bold text-lg">
            {payload[0].value} bookings
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Admin{" "}
        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Dashboard
        </span>
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow`}
            >
              <Icon size={32} className="mb-4 opacity-80" />
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="opacity-90 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Service Demand Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Top Services by Demand
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                interval={0}
              />
              <YAxis tick={{ fill: "#6b7280" }} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="bookings"
                radius={[8, 8, 0, 0]}
                label={{
                  position: "top",
                  fill: "#9333ea",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-xl">No booking data available yet</p>
            <p className="text-sm mt-2">
              Data will appear once services are booked
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
