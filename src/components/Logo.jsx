import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const Logo = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem("theme") || "light"
      setTheme(currentTheme)
    }

    window.addEventListener('storage', handleThemeChange)
    return () => window.removeEventListener('storage', handleThemeChange)
  }, [])

  return (
    <Link to="/">
      <motion.div
        className="flex items-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          className='w-32 h-auto'
          src={theme === "dark" ? "logo-dark-theme-Photoroom.png" : "logo-white-theme-Photoroom.png"}
          alt="Lumora Logo"
        />
      </motion.div>
    </Link>
  )
}
