import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('lumora-token');
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/analytics/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnalytics(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-purple-600 font-bold">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
      </div>
    );
  }

  // Transform service demand data for better display
  const serviceDemandData = analytics?.serviceDemand?.map(item => ({
    name: item._id.length > 20 ? item._id.substring(0, 20) + '...' : item._id,
    bookings: item.count
  })) || [];

  // Transform monthly revenue data
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = analytics?.monthlyRevenue?.map(item => ({
    month: monthNames[item._id.month - 1],
    revenue: item.revenue
  })) || [];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Analytics</span>
      </motion.h1>

      <div className="space-y-8">
        {/* Service Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Service Demand</h2>
          {serviceDemandData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={serviceDemandData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="bookings" 
                  fill="url(#colorGradient)" 
                  radius={[8, 8, 0, 0]}
                  label={{ position: 'top', fill: '#9333ea', fontSize: 12, fontWeight: 'bold' }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity={1} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No booking data available yet</p>
              <p className="text-sm mt-2">Data will appear once services are booked</p>
            </div>
          )}
        </motion.div>

        {/* Monthly Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Monthly Revenue Trend</h2>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `৳${value.toLocaleString()}`}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
                          <p className="font-semibold text-gray-800">{payload[0].payload.month}</p>
                          <p className="text-pink-600 font-bold text-lg">
                            ৳{payload[0].value.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  dot={{ fill: '#ec4899', r: 6 }}
                  activeDot={{ r: 8, fill: '#9333ea' }}
                  name="Revenue (৳)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No revenue data available yet</p>
              <p className="text-sm mt-2">Data will appear once payments are received</p>
            </div>
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Total Bookings</p>
            <p className="text-4xl font-bold">{analytics?.totalBookings || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Paid Bookings</p>
            <p className="text-4xl font-bold">{analytics?.paidBookings || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Total Revenue</p>
            <p className="text-4xl font-bold">৳{(analytics?.totalRevenue || 0).toLocaleString()}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics