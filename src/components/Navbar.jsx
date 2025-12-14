// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiUser, FiGrid } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, userRole, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

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
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">L</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Lumora
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive
                    ? "text-purple-600"
                    : "text-gray-700 hover:text-purple-600"
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
              <div className="flex items-center space-x-4">
                {(userRole === "admin" || userRole === "decorator") && (
                  <Link
                    to={`/dashboard/${userRole}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    <FiGrid className="mr-1" />
                    Dashboard
                  </Link>
                )}
                {userRole === "user" && (
                  <Link
                    to="/dashboard"
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    <FiUser className="mr-1" />
                    My Account
                  </Link>
                )}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring ring-purple-500 ring-offset-2">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/3YRjQxv/user.png"
                        }
                        alt={user.displayName}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3"
                  >
                    <li className="menu-title">
                      <span>{user.displayName}</span>
                    </li>
                    <li>
                      <Link to="/dashboard/my-profile">
                        <FiUser /> Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>
                        <FiLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm bg-gradient-to-r from-purple-600 to-pink-500 border-none"
                >
                  Get Started
                </Link>
              </div>
            )}
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
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-700"
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
