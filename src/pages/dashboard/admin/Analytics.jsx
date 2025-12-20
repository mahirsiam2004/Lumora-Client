import { useState, useEffect, useCallback } from "react";
import axios from "../../../utilits/axiosInstance";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Transform monthly revenue data for Recharts
  const transformMonthlyRevenue = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return data.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      monthNum: item._id.month,
      year: item._id.year,
      revenue: item.revenue || 0,
    })).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.monthNum - b.monthNum;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-600">Failed to load analytics data</p>
      </div>
    );
  }

  const monthlyRevenueData = transformMonthlyRevenue(analytics.monthlyRevenue);
  const serviceDemandData = analytics.serviceDemand || [];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Analytics
        </span>
      </h1>

      <div className="space-y-8">
        {/* Service Demand Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Service Demand</h2>
          {serviceDemandData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No service demand data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="_id" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Monthly Revenue Chart (Demand Curve) */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Monthly Revenue (Demand Curve)</h2>
          {monthlyRevenueData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No revenue data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`৳${value.toLocaleString()}`, "Revenue"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ fill: "#ec4899", r: 4 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
