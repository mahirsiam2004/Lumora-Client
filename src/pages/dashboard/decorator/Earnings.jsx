import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../../utilits/axiosInstance";
import { useAuth } from "../../../contexts/AuthContext";
import { FiDollarSign, FiCheckCircle, FiCalendar } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Earnings = () => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState({
    total: 0,
    payments: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("lumora-token");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/payments/decorator/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setEarnings({
          total: data.totalEarnings,
          payments: data.payments,
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [user.email]);

  // Group earnings by month for chart
  const monthlyData = earnings.payments.reduce((acc, payment) => {
    const month = new Date(payment.createdAt).toLocaleDateString("en-US", {
      month: "short",
    });
    const existing = acc.find((item) => item.month === month);

    if (existing) {
      existing.earnings += payment.amount;
    } else {
      acc.push({ month, earnings: payment.amount });
    }

    return acc;
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          My{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Earnings
          </span>
        </h1>
        <p className="text-gray-600">Track your income and payment history</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Total Earnings Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-3xl p-8 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90 mb-2">Total Earnings</p>
                <p className="text-5xl font-bold">৳{earnings.total}</p>
                <p className="text-sm opacity-75 mt-2">
                  {earnings.payments.length} completed projects
                </p>
              </div>
              <FiDollarSign size={80} className="opacity-20" />
            </div>
          </motion.div>

          {/* Earnings Chart */}
          {monthlyData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Monthly Earnings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#9333ea"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Payment History</h2>

            {earnings.payments.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No payments yet</p>
            ) : (
              <div className="space-y-4">
                {earnings.payments.map((payment, index) => (
                  <motion.div
                    key={payment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold">{payment.serviceName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <FiCalendar size={14} />
                          <span>
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ৳{payment.amount}
                      </p>
                      <span className="badge badge-success badge-sm">Paid</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Earnings;
