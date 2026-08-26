import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import axios from "../utilits/axiosInstance";
import {
  FiStar,
  FiMapPin,
  FiArrowRight,
  FiCheck,
  FiUsers,
  FiAward,
  FiClock,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiMail,
} from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [services, setServices] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create refs array for GSAP animations in ServicesSection
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
      setDecorators(decoratorsRes.data.slice(0, 4) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hero Section
  const Hero = () => (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-[#FFF9D2]/70 via-white to-[#BFDDF0]/40">
      {/* Soft floating pastel blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-[#8CC0EB] rounded-full blur-3xl opacity-25"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -left-24 w-[26rem] h-[26rem] bg-[#FFEBCC] rounded-full blur-3xl opacity-40"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 w-72 h-72 bg-[#BFDDF0] rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#8CC0EB]/40 text-[#5B9BD5] text-sm font-medium shadow-[0_2px_10px_rgba(140,192,235,0.15)] mb-6">
              <FiStar size={14} />
              Trusted by 500+ happy clients
            </span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] text-[#14202C]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Transform Your
              <span className="block bg-gradient-to-r from-[#8CC0EB] via-[#5B9BD5] to-[#3E7CB1] bg-clip-text text-transparent">
                Spaces Into Magic
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-[#14202C]/60 mb-9 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              Professional decoration services for homes, weddings, and special
              events. Create unforgettable memories with Lumora.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] text-white shadow-[0_8px_24px_rgba(140,192,235,0.45)] hover:shadow-[0_12px_32px_rgba(140,192,235,0.55)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Decoration Service
                <FiArrowRight size={18} />
              </Link>
              <Link
                to="/coverage-map"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold border border-[#8CC0EB]/60 text-[#5B9BD5] hover:bg-[#8CC0EB]/10 transition-all duration-300"
              >
                View Coverage
              </Link>
            </motion.div>

            <motion.div
              className="mt-14 grid grid-cols-3 gap-6 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { number: "500+", label: "Happy Clients" },
                { number: "50+", label: "Expert Decorators" },
                { number: "1000+", label: "Projects Done" },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#5B9BD5] to-[#3E7CB1] bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#14202C]/55 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
                alt="Decoration"
                className="rounded-[2rem] shadow-[0_30px_60px_rgba(94,155,213,0.25)] w-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur px-6 py-5 rounded-2xl shadow-[0_16px_40px_rgba(94,155,213,0.25)] border border-[#8CC0EB]/30"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8CC0EB] to-[#5B9BD5] rounded-full flex items-center justify-center">
                    <FiCheck className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-[#14202C]">
                      100% Satisfaction
                    </div>
                    <div className="text-sm text-[#14202C]/55">
                      Guaranteed Quality
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Stats Section
  const StatsSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FiUsers, number: "500+", label: "Happy Clients" },
            { icon: FiAward, number: "50+", label: "Awards Won" },
            { icon: FiClock, number: "1000+", label: "Projects Completed" },
            { icon: FiTrendingUp, number: "98%", label: "Success Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#FFF9D2]/50 to-[#BFDDF0]/30 border border-white shadow-[0_10px_30px_rgba(140,192,235,0.12)] hover:shadow-[0_18px_40px_rgba(140,192,235,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              <stat.icon
                className="mx-auto text-[#5B9BD5] mb-4"
                size={44}
                strokeWidth={1.6}
              />
              <div className="text-4xl font-bold text-[#14202C] mb-2">
                {stat.number}
              </div>
              <div className="text-[#14202C]/55">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#FFF9D2]/40 via-white to-[#BFDDF0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Lumora
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            We provide exceptional decoration services with attention to every
            detail
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FiShield,
              title: "Quality Guaranteed",
              description:
                "We ensure the highest quality in every project we undertake",
            },
            {
              icon: FiZap,
              title: "Fast Delivery",
              description:
                "Quick turnaround time without compromising on quality",
            },
            {
              icon: FiAward,
              title: "Expert Team",
              description:
                "Professional decorators with years of experience",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-[0_12px_36px_rgba(140,192,235,0.14)] border border-[#8CC0EB]/20 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(140,192,235,0.22)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#BFDDF0] to-[#8CC0EB] flex items-center justify-center mb-6">
                <feature.icon className="text-white" size={26} strokeWidth={1.8} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#14202C]">
                {feature.title}
              </h3>
              <p className="text-[#14202C]/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Services Section
  const ServicesSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            Our{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            Explore our wide range of decoration packages tailored to your needs
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(140,192,235,0.12)] overflow-hidden"
              >
                <Skeleton height={200} />
                <div className="p-5">
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const handleMouseEnter = () => {
                if (cardRefs.current[index]) {
                  gsap.to(cardRefs.current[index], {
                    y: -12,
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(94,155,213,0.3)",
                    duration: 0.5,
                    ease: "power3.out",
                  });
                }
              };

              const handleMouseLeave = () => {
                if (cardRefs.current[index]) {
                  gsap.to(cardRefs.current[index], {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 10px 30px rgba(140,192,235,0.12)",
                    duration: 0.5,
                    ease: "power3.out",
                  });
                }
              };

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link to={`/services/${service._id}`}>
                    <div
                      ref={(el) => (cardRefs.current[index] = el)}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="bg-white p-4 rounded-3xl shadow-[0_10px_30px_rgba(140,192,235,0.12)] group overflow-hidden h-full border border-[#8CC0EB]/15"
                      style={{ boxShadow: "0 10px 30px rgba(140,192,235,0.12)" }}
                    >
                      <figure className="relative h-48 overflow-hidden rounded-2xl">
                        <img
                          src={
                            service.image ||
                            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
                          }
                          alt={service.service_name}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-[#5B9BD5]">
                            {service.service_category}
                          </span>
                        </div>
                      </figure>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-[#14202C]">
                          {service.service_name}
                        </h3>
                        <p className="text-[#14202C]/55 text-sm line-clamp-2 mt-2">
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center mt-5">
                          <div>
                            <span className="text-2xl font-bold text-[#5B9BD5]">
                              BDT {service.cost}
                            </span>
                            <span className="text-sm text-[#14202C]/45">
                              /{service.unit}
                            </span>
                          </div>
                          <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] text-white shadow-[0_6px_16px_rgba(140,192,235,0.4)] hover:shadow-[0_10px_24px_rgba(140,192,235,0.5)] transition-all">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold border border-[#8CC0EB]/60 text-[#5B9BD5] hover:bg-[#8CC0EB]/10 transition-all duration-300"
          >
            View All Services
            <FiArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );

  // How It Works Section
  const HowItWorksSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#BFDDF0]/30 via-white to-[#FFF9D2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            How It{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            Simple steps to get your dream decoration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Choose Service", description: "Browse and select your desired decoration package" },
            { step: "02", title: "Book Appointment", description: "Schedule a convenient time for our team" },
            { step: "03", title: "Customize", description: "Work with our experts to personalize your design" },
            { step: "04", title: "Enjoy", description: "Sit back and watch your vision come to life" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#8CC0EB] to-[#5B9BD5] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-[0_12px_30px_rgba(140,192,235,0.4)]">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#14202C]">
                {item.title}
              </h3>
              <p className="text-[#14202C]/55">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Decorators Section
  const DecoratorsSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            Our Top{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Decorators
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            Meet our talented team of professional decorators
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {decorators.map((decorator, index) => (
            <motion.div
              key={decorator._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-[0_12px_36px_rgba(140,192,235,0.14)] hover:shadow-[0_20px_48px_rgba(140,192,235,0.22)] hover:-translate-y-1.5 transition-all duration-300 h-full rounded-3xl border border-[#8CC0EB]/15"
            >
              <figure className="px-6 pt-8">
                <img
                  src={
                    decorator.photoURL || "https://i.ibb.co/3YRjQxv/user.png"
                  }
                  alt={decorator.displayName}
                  className="rounded-full w-32 h-32 object-cover ring-4 ring-[#8CC0EB]/30 shadow-md mx-auto"
                />
              </figure>
              <div className="p-6 items-center text-center">
                <h3 className="text-xl font-bold text-[#14202C]">
                  {decorator.displayName}
                </h3>
                <p className="text-sm text-[#14202C]/55 font-medium mt-1">
                  {decorator.specialty || "Professional Decorator"}
                </p>
                <div className="flex items-center justify-center space-x-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-[#8CC0EB] fill-[#8CC0EB]"
                      size={16}
                    />
                  ))}
                  <span className="text-sm text-[#14202C]/55 ml-2">(4.9)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Testimonials Section
  const TestimonialsSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#FFF9D2]/40 via-white to-[#BFDDF0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            Client{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            What our happy clients say about us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Ahmed",
              role: "Wedding Client",
              image: "https://i.pravatar.cc/150?img=1",
              text: "Lumora made our wedding day absolutely magical! The attention to detail was incredible.",
              rating: 5,
            },
            {
              name: "Karim Rahman",
              role: "Corporate Event",
              image: "https://i.pravatar.cc/150?img=2",
              text: "Professional service and stunning results. Our office event was a huge success!",
              rating: 5,
            },
            {
              name: "Nadia Khan",
              role: "Home Decoration",
              image: "https://i.pravatar.cc/150?img=3",
              text: "They transformed my home beautifully. Highly recommend their services!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur p-7 rounded-3xl shadow-[0_12px_36px_rgba(140,192,235,0.14)] border border-[#8CC0EB]/20 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(140,192,235,0.22)] transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#14202C]">{testimonial.name}</h4>
                  <p className="text-sm text-[#14202C]/55">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-[#8CC0EB] fill-[#8CC0EB]" size={16} />
                ))}
              </div>
              <p className="text-[#14202C]/65 leading-relaxed">
                {testimonial.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Coverage Map Section
  const CoverageMapSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            Service{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Coverage
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            We provide decoration services across Dhaka and surrounding areas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[500px] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(94,155,213,0.25)] border border-[#8CC0EB]/20"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/coverage-map"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold border border-[#8CC0EB]/60 text-[#5B9BD5] hover:bg-[#8CC0EB]/10 transition-all duration-300"
          >
            View Full Coverage Map
            <FiArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );

  // FAQ Section
  const FaqSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#BFDDF0]/30 via-white to-[#FFF9D2]/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#14202C]">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-[#14202C]/60 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              question: "How far in advance should I book?",
              answer:
                "We recommend booking at least 2-4 weeks in advance for regular events and 2-3 months for weddings.",
            },
            {
              question: "Do you provide customization options?",
              answer:
                "Yes! We work closely with you to customize every aspect of your decoration to match your vision.",
            },
            {
              question: "What areas do you serve?",
              answer:
                "We currently serve Dhaka and surrounding areas. Check our coverage map for specific locations.",
            },
            {
              question: "What is your cancellation policy?",
              answer:
                "Cancellations made 7 days before the event receive a full refund. Within 7 days, a 50% fee applies.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="collapse collapse-plus bg-white shadow-[0_10px_30px_rgba(140,192,235,0.12)] rounded-2xl border border-[#8CC0EB]/15"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-semibold text-[#14202C]">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-[#14202C]/60">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Newsletter Section
  const NewsletterSection = () => (
    <section className="py-24 bg-gradient-to-br from-[#BFDDF0]/50 via-[#8CC0EB]/30 to-[#FFF9D2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto bg-white/70 backdrop-blur rounded-[2rem] shadow-[0_24px_60px_rgba(94,155,213,0.22)] border border-white p-10 sm:p-14"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8CC0EB] to-[#5B9BD5] flex items-center justify-center mx-auto mb-6">
            <FiMail className="text-white" size={26} strokeWidth={1.8} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#14202C]">
            Stay Updated
          </h2>
          <p className="text-[#14202C]/60 mb-8 text-lg">
            Subscribe to our newsletter for exclusive offers and decoration tips
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-12 px-5 rounded-xl text-sm font-medium bg-white border border-[#8CC0EB]/40 text-[#14202C] placeholder-[#14202C]/40 focus:outline-none focus:border-[#5B9BD5] focus:ring-2 focus:ring-[#8CC0EB]/30 transition-all"
            />
            <button className="h-12 px-7 rounded-xl bg-gradient-to-r from-[#8CC0EB] to-[#5B9BD5] text-white font-semibold text-sm hover:shadow-[0_10px_24px_rgba(140,192,235,0.5)] hover:-translate-y-0.5 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
      <HowItWorksSection />
      <DecoratorsSection />
      <TestimonialsSection />
      <CoverageMapSection />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
