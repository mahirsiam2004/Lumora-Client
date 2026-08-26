import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import axios from "../utilits/axiosInstance";
import {
  FiStar,
  FiArrowRight,
  FiCheck,
  FiShield,
  FiZap,
  FiAward,
  FiHeart,
  FiMapPin,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [services, setServices] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, decoratorsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/services?limit=8`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/decorators`),
      ]);
      setServices(servicesRes.data.services || []);
      setDecorators(decoratorsRes.data.slice(0, 8) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ── Hero (centered editorial, no image banner) ───────────── */
  const Hero = () => (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9D2]/60 via-white to-[#BFDDF0]/30">
      {/* soft blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="soft-blob bg-[#8CC0EB] w-[28rem] h-[28rem] -top-32 -right-24 opacity-25" />
        <div className="soft-blob bg-[#FFEBCC] w-[26rem] h-[26rem] -bottom-40 -left-24 opacity-50" />
        <div className="soft-blob bg-[#BFDDF0] w-80 h-80 top-1/3 left-1/3 opacity-25" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 pb-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#8CC0EB]/40 text-[#5B9BD5] text-sm font-medium shadow-[0_2px_10px_rgba(140,192,235,0.15)] mb-8"
        >
          <FiZap size={14} />
          Trusted by 500+ happy clients
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] text-[#14202C]"
        >
          Beautiful spaces,
          <br />
          <span className="bg-gradient-to-r from-[#8CC0EB] via-[#5B9BD5] to-[#3E7CB1] bg-clip-text text-transparent">
            effortlessly designed
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-7 text-lg text-[#14202C]/60 max-w-xl mx-auto leading-relaxed"
        >
          Lumora brings professional home, wedding and event decoration to
          Dhaka — curated by expert decorators, delivered with care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] text-white shadow-[0_10px_28px_rgba(140,192,235,0.45)] hover:shadow-[0_14px_36px_rgba(140,192,235,0.55)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Services
            <FiArrowRight size={18} />
          </Link>
          <Link
            to="/coverage-map"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-[#8CC0EB]/50 text-[#5B9BD5] hover:bg-[#8CC0EB]/10 transition-all duration-300"
          >
            <FiMapPin size={18} />
            Check Coverage
          </Link>
        </motion.div>

        {/* value strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[#14202C]/55"
        >
          {[
            { Icon: FiShield, label: "Quality Guaranteed" },
            { Icon: FiZap, label: "Fast Delivery" },
            { Icon: FiAward, label: "Expert Team" },
            { Icon: FiHeart, label: "Made With Love" },
          ].map((v, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <v.Icon className="text-[#5B9BD5]" size={18} />
              {v.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );

  /* ── Services (bento, no card grid) ───────────────────────── */
  const ServicesSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-[#5B9BD5] uppercase tracking-wider">
              What we do
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#14202C]">
              Services crafted for{" "}
              <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
                every occasion
              </span>
            </h2>
          </motion.div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[#8CC0EB]/50 text-[#5B9BD5] hover:bg-[#8CC0EB]/10 transition-all shrink-0"
          >
            View All
            <FiArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden bg-[#F2F8FD]"
              >
                <Skeleton height={i % 3 === 0 ? 320 : 200} borderRadius={24} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 auto-rows-[200px] gap-5">
            {services.map((service, index) => {
              const feature = index % 5 === 0;
              const handleEnter = () => {
                if (cardRefs.current[index])
                  gsap.to(cardRefs.current[index], {
                    y: -8,
                    boxShadow: "0 30px 60px rgba(94,155,213,0.3)",
                    duration: 0.5,
                    ease: "power3.out",
                  });
              };
              const handleLeave = () => {
                if (cardRefs.current[index])
                  gsap.to(cardRefs.current[index], {
                    y: 0,
                    boxShadow: "0 10px 30px rgba(140,192,235,0.12)",
                    duration: 0.5,
                    ease: "power3.out",
                  });
              };

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={feature ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <Link to={`/services/${service._id}`} className="block h-full">
                    <div
                      ref={(el) => (cardRefs.current[index] = el)}
                      onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}
                      className="group relative h-full min-h-[200px] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(140,192,235,0.12)] border border-[#8CC0EB]/15"
                      style={{ boxShadow: "0 10px 30px rgba(140,192,235,0.12)" }}
                    >
                      <img
                        src={
                          service.image ||
                          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
                        }
                        alt={service.service_name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14202C]/80 via-[#14202C]/20 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="self-start px-3 py-1 rounded-full bg-white/90 text-[#5B9BD5] text-xs font-semibold mb-3">
                          {service.service_category}
                        </span>
                        <h3
                          className={`font-bold text-white ${
                            feature ? "text-3xl" : "text-xl"
                          }`}
                        >
                          {service.service_name}
                        </h3>
                        {feature && (
                          <p className="text-white/75 text-sm mt-2 line-clamp-2 max-w-md">
                            {service.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-3 text-white">
                          <span className="font-bold text-lg">
                            BDT {service.cost}
                          </span>
                          <span className="text-white/70 text-sm">
                            /{service.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );

  /* ── How it works (horizontal steps) ──────────────────────── */
  const HowItWorksSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#BFDDF0]/30 via-white to-[#FFF9D2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#5B9BD5] uppercase tracking-wider">
            Simple process
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#14202C]">
            How it{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              works
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Choose", text: "Pick the decoration package that fits your moment." },
            { step: "02", title: "Book", text: "Schedule a time that works for you in a few taps." },
            { step: "03", title: "Customize", text: "Shape the look with our expert decorators." },
            { step: "04", title: "Enjoy", text: "Relax while we bring the vision to life." },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-white/80 backdrop-blur rounded-3xl p-7 border border-[#8CC0EB]/20 shadow-[0_12px_36px_rgba(140,192,235,0.12)]"
            >
              <span className="text-5xl font-bold bg-gradient-to-diagonal from-[#8CC0EB]/30 to-[#BFDDF0]/30 bg-clip-text text-transparent">
                {s.step}
              </span>
              <h3 className="text-xl font-bold text-[#14202C] mt-3">{s.title}</h3>
              <p className="text-[#14202C]/55 text-sm mt-2 leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Decorators (horizontal scroll) ───────────────────────── */
  const DecoratorsSection = () => (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col items-center text-center gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-[#5B9BD5] uppercase tracking-wider">
              The people
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#14202C]">
              Meet our{" "}
              <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
                decorators
              </span>
            </h2>
          </motion.div>
          <Link
            to="/decorators"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[#8CC0EB]/50 text-[#5B9BD5] hover:bg-[#8CC0EB]/10 transition-all"
          >
            All Decorators
            <FiArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x">
          {decorators.map((d, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="snap-start shrink-0 w-64 bg-white rounded-3xl p-6 text-center shadow-[0_12px_36px_rgba(140,192,235,0.14)] border border-[#8CC0EB]/15 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(140,192,235,0.22)] transition-all duration-300"
            >
              <img
                src={d.photoURL || "https://i.ibb.co/3YRjQxv/user.png"}
                alt={d.displayName}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-[#8CC0EB]/30"
              />
              <h3 className="text-lg font-bold text-[#14202C] mt-4">
                {d.displayName}
              </h3>
              <p className="text-sm text-[#14202C]/55">
                {d.specialty || "Professional Decorator"}
              </p>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[...Array(5)].map((_, k) => (
                  <FiStar key={k} className="text-[#8CC0EB] fill-[#8CC0EB]" size={14} />
                ))}
                <span className="text-xs text-[#14202C]/55 ml-1">(4.9)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Testimonials (clean cards) ───────────────────────────── */
  const TestimonialsSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#FFF9D2]/40 via-white to-[#BFDDF0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#5B9BD5] uppercase tracking-wider">
            Loved by clients
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#14202C]">
            What people{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              say
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Sarah Ahmed", role: "Wedding Client", img: "https://i.pravatar.cc/150?img=1", text: "Lumora made our wedding day absolutely magical! The attention to detail was incredible." },
            { name: "Karim Rahman", role: "Corporate Event", img: "https://i.pravatar.cc/150?img=2", text: "Professional service and stunning results. Our office event was a huge success!" },
            { name: "Nadia Khan", role: "Home Decoration", img: "https://i.pravatar.cc/150?img=3", text: "They transformed my home beautifully. Highly recommend their services!" },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/80 backdrop-blur rounded-3xl p-7 border border-[#8CC0EB]/20 shadow-[0_12px_36px_rgba(140,192,235,0.12)]"
            >
              <FiMessageSquare className="text-[#8CC0EB] mb-4" size={28} />
              <p className="text-[#14202C]/70 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-3 mt-6">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-[#14202C]">{t.name}</h4>
                  <p className="text-sm text-[#14202C]/55">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Coverage map ─────────────────────────────────────────── */
  const CoverageMapSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-[#5B9BD5] uppercase tracking-wider">
              Where we work
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#14202C]">
              Service{" "}
              <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
                coverage
              </span>
            </h2>
            <p className="mt-4 text-[#14202C]/60 max-w-md leading-relaxed">
              We provide decoration services across Dhaka and surrounding areas.
              Explore the map to see where we operate.
            </p>
            <Link
              to="/coverage-map"
              className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] text-white shadow-[0_10px_28px_rgba(140,192,235,0.45)] hover:-translate-y-0.5 transition-all"
            >
              View full map
              <FiArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[420px] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(94,155,213,0.25)] border border-[#8CC0EB]/20"
          >
            <MapContainer
              center={[23.8103, 90.4125]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[23.8103, 90.4125]}>
                <Popup>
                  <div className="text-center">
                    <strong>Lumora HQ</strong>
                    <br />
                    Dhaka, Bangladesh
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );

  /* ── FAQ (clean accordion) ────────────────────────────────── */
  const FaqSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#BFDDF0]/30 via-white to-[#FFF9D2]/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-[#5B9BD5] uppercase tracking-wider">
            Good to know
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#14202C]">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              questions
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {[
            { q: "How far in advance should I book?", a: "We recommend booking at least 2–4 weeks in advance for regular events and 2–3 months for weddings." },
            { q: "Do you provide customization options?", a: "Yes! We work closely with you to customize every aspect of your decoration to match your vision." },
            { q: "What areas do you serve?", a: "We currently serve Dhaka and surrounding areas. Check our coverage map for specific locations." },
            { q: "What is your cancellation policy?", a: "Cancellations made 7 days before the event receive a full refund. Within 7 days, a 50% fee applies." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="collapse collapse-plus bg-white shadow-[0_10px_30px_rgba(140,192,235,0.1)] rounded-2xl border border-[#8CC0EB]/15"
            >
              <input type="radio" name="faq" />
              <div className="collapse-title text-lg font-semibold text-[#14202C]">
                {f.q}
              </div>
              <div className="collapse-content">
                <p className="text-[#14202C]/60">{f.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── CTA banner ───────────────────────────────────────────── */
  const CtaSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#8CC0EB] via-[#5B9BD5] to-[#3E7CB1] px-8 py-16 sm:px-16 text-center shadow-[0_30px_70px_rgba(94,155,213,0.4)]"
        >
          <div className="absolute -top-20 -right-16 w-72 h-72 bg-white/15 rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ready to transform your space?
            </h2>
            <p className="mt-4 text-white/85 text-lg">
              Book a decorator today and let us create something unforgettable.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-[#3E7CB1] shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              Get Started
              <FiArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div>
      <Hero />
      <ServicesSection />
      <HowItWorksSection />
      <DecoratorsSection />
      <TestimonialsSection />
      <CoverageMapSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default Home;
