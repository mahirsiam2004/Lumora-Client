import { useEffect, useState } from "react";
import axiosInstance from "../../../utilits/axiosInstance";
import { useSiteSettings } from "../../../contexts/SiteSettingsContext";
import toast from "react-hot-toast";
import { FiSave, FiRotateCcw, FiImage } from "react-icons/fi";

const COLORS = [
  { key: "primary", label: "Primary Color" },
  { key: "accent", label: "Accent Color" },
  { key: "text", label: "Text Color" },
  { key: "bg", label: "Background" },
  { key: "cream", label: "Cream" },
  { key: "peach", label: "Peach" },
  { key: "skysoft", label: "Sky Soft" },
];

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

const SiteSettings = () => {
  const { settings, updateSettings } = useSiteSettings();
  const [form, setForm] = useState({ ...DEFAULTS });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({ ...DEFAULTS, ...settings });
  }, [settings]);

  const handleColor = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    // live preview as the admin tweaks
    updateSettings({ [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axiosInstance.put("/api/site-settings", form);
      updateSettings(form);
      toast.success("Site settings saved");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm({ ...DEFAULTS });
    updateSettings({ ...DEFAULTS });
    toast("Reverted to defaults (save to persist)");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--lum-text)]">
          Site Appearance
        </h2>
        <p className="mt-1 text-sm text-[var(--lum-text)]/60">
          Change the whole project's colors, logo and brand name. Changes apply
          live and to every visitor.
        </p>
      </div>

      {/* Brand */}
      <div className="rounded-2xl border border-[var(--lum-skysoft)] bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-[var(--lum-text)]">Branding</h3>
        <label className="mb-1 block text-sm font-medium text-[var(--lum-text)]/70">
          Brand Name
        </label>
        <input
          type="text"
          value={form.brandName}
          onChange={(e) => setForm({ ...form, brandName: e.target.value })}
          className="mb-4 w-full rounded-xl border border-[var(--lum-skysoft)] px-4 py-2.5 text-[var(--lum-text)] outline-none focus:border-[var(--lum-accent)]"
        />
        <label className="mb-1 block text-sm font-medium text-[var(--lum-text)]/70">
          Logo Image URL
        </label>
        <div className="flex items-center gap-3">
          <FiImage className="text-[var(--lum-accent)]" />
          <input
            type="text"
            placeholder="https://.../logo.png"
            value={form.logoUrl}
            onChange={(e) => {
              setForm({ ...form, logoUrl: e.target.value });
              updateSettings({ logoUrl: e.target.value });
            }}
            className="w-full rounded-xl border border-[var(--lum-skysoft)] px-4 py-2.5 text-[var(--lum-text)] outline-none focus:border-[var(--lum-accent)]"
          />
        </div>
        {form.logoUrl && (
          <img
            src={form.logoUrl}
            alt="preview"
            className="mt-3 h-12 rounded-lg border border-[var(--lum-skysoft)] object-contain"
          />
        )}
      </div>

      {/* Colors */}
      <div className="mt-6 rounded-2xl border border-[var(--lum-skysoft)] bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-[var(--lum-text)]">
          Theme Colors
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COLORS.map((c) => (
            <div
              key={c.key}
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--lum-skysoft)] p-3"
            >
              <span className="text-sm font-medium text-[var(--lum-text)]/80">
                {c.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[var(--lum-text)]/50">
                  {form[c.key]}
                </span>
                <input
                  type="color"
                  value={form[c.key]}
                  onChange={(e) => handleColor(c.key, e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded-lg border border-[var(--lum-skysoft)] bg-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--lum-accent)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--lum-skysoft)] px-6 py-3 font-semibold text-[var(--lum-text)] transition hover:bg-[var(--lum-peach)]"
        >
          <FiRotateCcw /> Reset to Default
        </button>
      </div>
    </div>
  );
};

export default SiteSettings;
