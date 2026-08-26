// src/layouts/DashboardLayout.jsx
import { Outlet, Link, NavLink } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
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
  FiSettings,
  FiGift,
} from "react-icons/fi";
import { useState } from "react";
import { useSiteSettings } from "../contexts/SiteSettingsContext";

const DashboardLayout = () => {
  const { user, userRole } = useAuth();
  const { settings } = useSiteSettings();
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
    { to: "/dashboard/admin/settings", label: "Site Appearance", icon: FiSettings },
    { to: "/dashboard/admin/promotions", label: "Offers & Events", icon: FiGift },
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
    <div className="min-h-screen bg-base-200">
      <ScrollToTop />
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-circle shadow-lg text-white border-0"
          style={{ background: "linear-gradient(135deg, var(--lum-accent), var(--lum-primary))" }}
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
            fixed lg:sticky top-0 left-0 h-screen w-72 z-40 pt-24 lg:pt-24 flex flex-col
            bg-gradient-to-b from-[#0f1b2a] to-[#14202C] text-white
            ${sidebarOpen ? "block" : "hidden lg:block"}
          `}
          style={{ boxShadow: "4px 0 24px rgba(15,27,42,0.18)" }}
        >
          <div className="p-6 overflow-y-auto h-full flex flex-col">
            {/* Brand — Lumora logo image (no text) */}
            <div className="flex items-center gap-3 mb-8 px-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 overflow-hidden">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.brandName || "Lumora"}
                    className="h-9 w-9 object-contain"
                  />
                ) : (
                  <span className="text-base font-bold text-white">L</span>
                )}
              </div>
              <div className="leading-tight">
                <p className="text-[11px] uppercase tracking-widest text-white/40">
                  Dashboard
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 mb-8 p-3 rounded-2xl bg-white/5 ring-1 ring-white/10">
              <img
                src={user?.photoURL || "https://i.ibb.co/3YRjQxv/user.png"}
                alt={user?.displayName}
                className="w-11 h-11 rounded-full ring-2 ring-[var(--lum-accent)] ring-offset-2 ring-offset-[#14202C] object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{user?.displayName}</p>
                <p className="text-xs text-white/50 capitalize">
                  {userRole === "user" ? "Customer" : userRole}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5 flex-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "text-white shadow-lg"
                          : "text-white/65 hover:text-white hover:bg-white/10"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? { background: "linear-gradient(90deg, var(--lum-accent), var(--lum-primary))" }
                        : undefined
                    }
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Back to Home Link */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiHome size={20} />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 pt-24 lg:pt-28 bg-gradient-to-br from-[var(--lum-cream)]/30 via-white to-[var(--lum-skysoft)]/20 min-h-screen">
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
