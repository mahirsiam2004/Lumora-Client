import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utilits/axiosInstance";
import { FiDollarSign, FiUsers, FiPackage, FiCalendar } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const stats = [
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: `৳${analytics?.totalRevenue || 0}`,
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
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}
            >
              <Icon size={32} className="mb-4" />
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="opacity-90">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Service Demand Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Service Demand</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics?.serviceDemand || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#9333ea" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
