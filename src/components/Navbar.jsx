import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiGrid,
  FiMoon,
  FiSun,
  FiChevronDown,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Logo } from "./Logo";

const Navbar = () => {
  const { user, userRole, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenu(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      setMobileMenu(false);
      await logoutUser();
      toast.success("Logged out successfully");
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
          : "bg-base-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#e8a803]"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#e8a803] rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-base-content/60 hover:text-[#e8a803] hover:bg-base-200 transition-all duration-200"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Dashboard Link */}
                {userRole === "admin" && (
                  <Link
                    to="/dashboard/admin"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border-1.5 border-[#e8a803] text-[#e8a803] hover:bg-[#e8a803] hover:text-white transition-all duration-200"
                  >
                    <FiGrid size={15} />
                    Dashboard
                  </Link>
                )}
                {userRole === "decorator" && (
                  <Link
                    to="/dashboard/decorator"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border border-[#e8a803] text-[#e8a803] hover:bg-[#e8a803] hover:text-white transition-all duration-200"
                  >
                    <FiGrid size={15} />
                    Dashboard
                  </Link>
                )}
                {userRole === "user" && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border border-[#e8a803] text-[#e8a803] hover:bg-[#e8a803] hover:text-white transition-all duration-200"
                  >
                    <FiUser size={15} />
                    My Account
                  </Link>
                )}

                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-base-200 transition-all duration-200"
                  >
                    <img
                      referrerPolicy="no-referrer"
                      src={user.photoURL || "https://i.ibb.co/3YRjQxv/user.png"}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#e8a803]/40"
                    />
                    <FiChevronDown
                      size={14}
                      className={`text-base-content/50 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-base-200 overflow-hidden z-[100]"
                      >
                        <div className="px-4 py-3 border-b border-base-200">
                          <p className="font-semibold text-sm truncate">{user.displayName}</p>
                          <p className="text-xs text-base-content/50 capitalize mt-0.5">
                            {userRole === "user" ? "Customer" : userRole}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <Link
                            to="/dashboard/my-profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-base-content hover:bg-base-200 transition-colors"
                          >
                            <FiUser size={15} className="text-base-content/50" />
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors"
                          >
                            <FiLogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-base-content/70 hover:text-base-content hover:bg-base-200 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#e8a803] to-[#f59e0b] text-white shadow-[0_2px_8px_rgba(232,168,3,0.35)] hover:shadow-[0_4px_16px_rgba(232,168,3,0.45)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-base-content/60 hover:bg-base-200 transition-colors"
            >
              {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-base-content/70 hover:bg-base-200 transition-colors"
            >
              {mobileMenu ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-base-200 bg-base-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#e8a803]/10 text-[#e8a803]"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-base-200 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-base-200 rounded-xl">
                      <img
                        referrerPolicy="no-referrer"
                        src={user.photoURL || "https://i.ibb.co/3YRjQxv/user.png"}
                        alt={user.displayName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#e8a803]/40"
                      />
                      <div>
                        <p className="text-sm font-semibold">{user.displayName}</p>
                        <p className="text-xs text-base-content/50 capitalize">
                          {userRole === "user" ? "Customer" : userRole}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={userRole === "user" ? "/dashboard" : `/dashboard/${userRole}`}
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold border border-[#e8a803] text-[#e8a803] hover:bg-[#e8a803] hover:text-white transition-all"
                    >
                      <FiGrid size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-error hover:bg-error/10 transition-all"
                    >
                      <FiLogOut size={16} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold border border-base-300 text-base-content hover:bg-base-200 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#e8a803] to-[#f59e0b] text-white transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
