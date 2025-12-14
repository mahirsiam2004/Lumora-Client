
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiCreditCard, FiPackage } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('lumora-token');
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/user/${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStats({
        totalBookings: data.bookings.length,
        pendingBookings: data.bookings.filter(b => !b.isPaid).length,
        completedBookings: data.bookings.filter(b => b.status === 'completed').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { title: 'Total Bookings', value: stats.totalBookings, icon: FiCalendar, color: 'from-blue-500 to-cyan-500' },
    { title: 'Pending Payment', value: stats.pendingBookings, icon: FiCreditCard, color: 'from-orange-500 to-yellow-500' },
    { title: 'Completed', value: stats.completedBookings, icon: FiPackage, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{user?.displayName?.split(' ')[0]}</span>
        </h1>
        <p className="text-gray-600">Here's an overview of your bookings and activities</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={32} />
                <span className="text-4xl font-bold">{stat.value}</span>
              </div>
              <p className="text-lg font-medium opacity-90">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/services" className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none">
            Browse Services
          </Link>
          <Link to="/dashboard/my-bookings" className="btn btn-lg btn-outline">
            View My Bookings
          </Link>
          <Link to="/dashboard/payment-history" className="btn btn-lg btn-outline">
            Payment History
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;

