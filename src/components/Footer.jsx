import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { Logo } from "./Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#FFF9D2]/60 via-[#FFEBCC]/50 to-[#BFDDF0]/40 text-[#14202C]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8CC0EB]/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-[#14202C]/60 text-sm leading-relaxed mb-6">
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
                  className="w-10 h-10 rounded-xl bg-white/70 border border-[#8CC0EB]/40 shadow-[0_2px_8px_rgba(140,192,235,0.15)] hover:bg-[#8CC0EB] hover:text-white text-[#5B9BD5] flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#14202C] font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
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
                    className="text-[#14202C]/60 hover:text-[#5B9BD5] text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#14202C] font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <FiPhone size={15} className="text-[#5B9BD5] flex-shrink-0" />
                <span className="text-[#14202C]/60">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail size={15} className="text-[#5B9BD5] flex-shrink-0" />
                <span className="text-[#14202C]/60">info@lumora.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin size={15} className="text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                <span className="text-[#14202C]/60">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[#14202C] font-semibold text-sm uppercase tracking-wider mb-5">
              Working Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-[#14202C]/60">Mon – Fri</span>
                <span className="text-[#14202C] font-medium">9am – 8pm</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-[#14202C]/60">Saturday</span>
                <span className="text-[#14202C] font-medium">10am – 6pm</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-[#14202C]/60">Sunday</span>
                <span className="text-[#14202C]/40">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#8CC0EB]/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#14202C]/50 text-sm">
            &copy; {year} Lumora. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#" className="text-[#14202C]/50 hover:text-[#5B9BD5] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#14202C]/50 hover:text-[#5B9BD5] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
