
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
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Logo } from "./Logo";

const Navbar = () => {
  const { user, userRole, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
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
                  `font-medium transition-colors ${
                    isActive
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
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ rotate: 20 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-base-200 text-[#e8a803] transition-colors duration-200"
              title="Toggle theme"
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </motion.button>

            {user ? (
              <div className="flex items-center space-x-4">
                {(userRole === "admin" || userRole === "decorator") && (
                  <Link
                    to={`/dashboard/${userRole}`}
                    className="btn btn-sm btn-outline hover:bg-[#e8a803] hover:border-[#e8a803] hover:text-white border-[#e8a803] text-[#e8a803]"
                  >
                    <FiGrid className="mr-1" />
                    Dashboard
                  </Link>
                )}
                {userRole === "user" && (
                  <Link
                    to="/dashboard"
                    className="btn btn-sm btn-outline hover:bg-[#e8a803] hover:border-[#e8a803] hover:text-white border-[#e8a803] text-[#e8a803]"
                  >
                    <FiUser className="mr-1" />
                    My Account
                  </Link>
                )}
                
                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring ring-[#e8a803] ring-offset-base-100 ring-offset-2">
                      <img
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                        src={
                          user.photoURL || "https://i.ibb.co/3YRjQxv/user.png"
                        }
                        alt={user.displayName}
                      />
                    </div>
                  </button>

                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-52 bg-base-100 rounded-box shadow-lg border border-base-300 overflow-hidden z-[100]"
                    >
                      <div className="p-3 border-b border-base-200">
                        <p className="font-semibold text-sm truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-base-content opacity-60 capitalize">
                          {userRole === "user" ? "Customer" : userRole}
                        </p>
                      </div>
                      
                      <ul className="menu p-2">
                        <li>
                          <Link
                            to="/dashboard/my-profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2"
                          >
                            <FiUser size={16} /> Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-error hover:bg-error hover:bg-opacity-10"
                          >
                            <FiLogOut size={16} /> Logout
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm bg-gradient-to-r from-[#e8a803] via-[#f59e0b] to-[#fbbf24] border-none text-white hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile/tablet */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="btn btn-ghost btn-circle"
            >
              {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-base-200"
          >
            <div className="flex flex-col space-y-3 pt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-[#e8a803] bg-opacity-10 text-[#e8a803]"
                        : "text-base-content hover:bg-base-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              <div className="divider my-2"></div>
              
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-base-content hover:bg-base-200 transition-colors"
              >
                {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
              
              {user ? (
                <>
                  <Link
                    to={
                      userRole === "user"
                        ? "/dashboard"
                        : `/dashboard/${userRole}`
                    }
                    onClick={() => setMobileMenu(false)}
                    className="btn btn-sm btn-outline hover:bg-[#e8a803] hover:border-[#e8a803] hover:text-white border-[#e8a803] text-[#e8a803]"
                  >
                    <FiGrid className="mr-1" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      handleLogout();
                    }}
                    className="btn btn-sm btn-error"
                  >
                    <FiLogOut className="mr-1" />
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
                    className="btn btn-sm bg-gradient-to-r from-[#e8a803] via-[#f59e0b] to-[#fbbf24] border-none text-white"
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