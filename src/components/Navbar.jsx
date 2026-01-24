// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiGrid,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Logo } from "./Logo";

const Navbar = () => {
  const { user, userRole, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/coverage-map", label: "Coverage" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-base-100 shadow-md sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive
                    ? "text-[#e8a803]"
                    : "text-base-content hover:text-[#e8a803]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">

            {user ? (
              <div className="flex items-center gap-4">
                <details className="dropdown dropdown-end">
                  <summary
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost normal-case gap-2 flex items-center"
                  >
                    <div className="w-10 rounded-full ring ring-[#e8a803] ring-offset-2 overflow-hidden">
                      <img
                        referrerPolicy="no-referrer"
                        src={
                          user.photoURL || "https://i.ibb.co/3YRjQxv/user.png"
                        }
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="hidden md:inline-block font-medium text-base-content">
                      {user.displayName}
                    </span>
                  </summary>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                  >
                    <li className="menu-title px-4 py-2 text-center text-[#e8a803] font-semibold border-b border-base-200 mb-2">
                      {user.displayName}
                    </li>

                    <li>
                      <Link to={userRole === "user" ? "/dashboard" : `/dashboard/${userRole}`}>
                        {userRole === "user" ? <FiUser /> : <FiGrid />}
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link to="/dashboard/my-profile">
                        <FiUser /> Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-error">
                        <FiLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </details>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm btn-animate bg-gradient-to-r from-[#e8a803] via-[#f59e0b] to-[#fbbf24] text-white border-none hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#e8a803] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            )}

            {/* Theme Toggle - Right Side */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ rotate: 20 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-ghost btn-circle text-[#e8a803]"
              title="Toggle theme"
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden btn btn-ghost btn-circle"
          >
            {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium ${isActive
                      ? "bg-[#e8a80320] text-[#e8a803]"
                      : "text-base-content"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenu(false)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-error"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="btn btn-sm btn-outline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenu(false)}
                    className="btn btn-sm btn-primary"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
