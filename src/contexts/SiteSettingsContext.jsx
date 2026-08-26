import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utilits/axiosInstance";

const SiteSettingsContext = createContext(null);

const DEFAULTS = {
  primary: "#8CC0EB",
  accent: "#5B9BD5",
  text: "#14202C",
  bg: "#FFF9D2",
  cream: "#FFF9D2",
  peach: "#FFEBCC",
  skysoft: "#BFDDF0",
  logoUrl: "",
  brandName: "Lumora",
};

// Map admin settings -> the CSS variables components reference.
function applyToDocument(settings) {
  const root = document.documentElement;
  if (settings.primary) root.style.setProperty("--lum-primary", settings.primary);
  if (settings.accent) root.style.setProperty("--lum-accent", settings.accent);
  if (settings.text) root.style.setProperty("--lum-text", settings.text);
  if (settings.bg) root.style.setProperty("--lum-bg", settings.bg);
  if (settings.cream) root.style.setProperty("--lum-cream", settings.cream);
  if (settings.peach) root.style.setProperty("--lum-peach", settings.peach);
  if (settings.skysoft) root.style.setProperty("--lum-skysoft", settings.skysoft);
  // keep the legacy gold in sync with accent for any leftover usages
  if (settings.accent)
    root.style.setProperty("--lum-legacy", settings.accent);
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    axiosInstance
      .get("/api/site-settings")
      .then(({ data }) => {
        if (!active) return;
        const merged = { ...DEFAULTS, ...data };
        setSettings(merged);
        applyToDocument(merged);
      })
      .catch((err) => {
        console.warn("Site settings load failed, using defaults:", err?.message);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Expose a helper so admin pages can push live updates.
  const updateSettings = (next) => {
    const merged = { ...settings, ...next };
    setSettings(merged);
    applyToDocument(merged);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    return { settings: DEFAULTS, loading: false, updateSettings: () => {} };
  }
  return ctx;
}
