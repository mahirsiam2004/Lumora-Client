// src/layouts/DashboardLayout.jsx
import { Outlet, Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiPackage,
  FiUsers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiBriefcase,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { useState } from "react";

const DashboardLayout = () => {
  const { user, userRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User Navigation Links
  const userLinks = [
    { to: "/dashboard", label: "Overview", icon: FiGrid, end: true },
    { to: "/dashboard/my-profile", label: "My Profile", icon: FiUser },
    { to: "/dashboard/my-bookings", label: "My Bookings", icon: FiCalendar },
    {
      to: "/dashboard/payment-history",
      label: "Payment History",
      icon: FiCreditCard,
    },
  ];

  // Admin Navigation Links
  const adminLinks = [
    {
      to: "/dashboard/admin",
      label: "Admin Dashboard",
      icon: FiGrid,
      end: true,
    },
    {
      to: "/dashboard/admin/services",
      label: "Manage Services",
      icon: FiPackage,
    },
    {
      to: "/dashboard/admin/bookings",
      label: "Manage Bookings",
      icon: FiCalendar,
    },
    {
      to: "/dashboard/admin/decorators",
      label: "Manage Decorators",
      icon: FiUsers,
    },
    { to: "/dashboard/admin/analytics", label: "Analytics", icon: FiBarChart2 },
  ];

  // Decorator Navigation Links
  const decoratorLinks = [
    {
      to: "/dashboard/decorator",
      label: "Decorator Dashboard",
      icon: FiGrid,
      end: true,
    },
    {
      to: "/dashboard/decorator/projects",
      label: "My Projects",
      icon: FiBriefcase,
    },
    {
      to: "/dashboard/decorator/schedule",
      label: "Today's Schedule",
      icon: FiClock,
    },
    {
      to: "/dashboard/decorator/earnings",
      label: "Earnings",
      icon: FiDollarSign,
    },
  ];

  // Select appropriate links based on user role
  let links = userLinks;
  if (userRole === "admin") links = adminLinks;
  if (userRole === "decorator") links = decoratorLinks;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-circle bg-white shadow-lg"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -300 }}
          className={`
            fixed lg:sticky top-0 left-0 h-screen w-64 bg-white shadow-xl z-40 pt-24 lg:pt-24
            ${sidebarOpen ? "block" : "hidden lg:block"}
          `}
        >
          <div className="p-6 overflow-y-auto h-full">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-8">
              <img
                src={user?.photoURL || "https://i.ibb.co/3YRjQxv/user.png"}
                alt={user?.displayName}
                className="w-12 h-12 rounded-full ring-2 ring-purple-500 object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{user?.displayName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Back to Home Link */}
            <div className="mt-8 pt-6 border-t">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
              >
                <FiHome size={20} />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 pt-24 lg:pt-28">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
