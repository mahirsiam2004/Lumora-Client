import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { LogoDark } from "./LogoDark";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <LogoDark />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Transform your spaces into extraordinary experiences with our
              professional decoration services across Dhaka.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FiFacebook, href: "#" },
                { icon: FiInstagram, href: "#" },
                { icon: FiTwitter, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#e8a803] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/services", label: "Services" },
                { to: "/coverage-map", label: "Coverage Map" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-[#e8a803] text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <FiPhone size={15} className="text-[#e8a803] flex-shrink-0" />
                <span className="text-slate-400">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail size={15} className="text-[#e8a803] flex-shrink-0" />
                <span className="text-slate-400">info@lumora.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin size={15} className="text-[#e8a803] flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Working Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Mon – Fri</span>
                <span className="text-slate-300 font-medium">9am – 8pm</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Saturday</span>
                <span className="text-slate-300 font-medium">10am – 6pm</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Sunday</span>
                <span className="text-slate-500">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            &copy; {year} Lumora. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
