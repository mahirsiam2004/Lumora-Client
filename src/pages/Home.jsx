
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import axios from "../utilits/axiosInstance";
import { FiStar, FiMapPin, FiArrowRight, FiCheck, FiUsers, FiAward, FiClock, FiTrendingUp, FiShield, FiZap } from "react-icons/fi";
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
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-[#e8a80310] via-[#fbbf2420] to-[#fcd34d10]">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#e8a803] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your
              <span className="block bg-gradient-to-r from-[#e8a803] via-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
                Spaces Into Magic
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Professional decoration services for homes, weddings, and special
              events. Create unforgettable memories with Lumora.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/services"
                className="btn btn-lg bg-gradient-to-r from-[#e8a803] to-[#f59e0b] text-white border-none hover:scale-105 transition-transform"
              >
                Book Decoration Service
                <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/coverage-map" className="btn btn-lg btn-outline">
                View Coverage
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { number: "500+", label: "Happy Clients" },
                { number: "50+", label: "Expert Decorators" },
                { number: "1000+", label: "Projects Done" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
                alt="Decoration"
                className="rounded-3xl shadow-2xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-base-100 p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e8a803] to-[#f59e0b] rounded-full flex items-center justify-center">
                    <FiCheck className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">
                      100% Satisfaction
                    </div>
                    <div className="text-sm text-gray-600">
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
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: FiUsers, number: "500+", label: "Happy Clients", color: "purple" },
            { icon: FiAward, number: "50+", label: "Awards Won", color: "pink" },
            { icon: FiClock, number: "1000+", label: "Projects Completed", color: "blue" },
            { icon: FiTrendingUp, number: "98%", label: "Success Rate", color: "green" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all"
            >
              <stat.icon className={`mx-auto text-${stat.color}-600 mb-4`} size={48} />
              <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Lumora
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide exceptional decoration services with attention to every detail
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FiShield,
              title: "Quality Guaranteed",
              description: "We ensure the highest quality in every project we undertake",
            },
            {
              icon: FiZap,
              title: "Fast Delivery",
              description: "Quick turnaround time without compromising on quality",
            },
            {
              icon: FiAward,
              title: "Expert Team",
              description: "Professional decorators with years of experience",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover"
            >
              <feature.icon className="text-[#e8a803] mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Services Section
  const ServicesSection = () => (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of decoration packages tailored to your needs
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl">
                <Skeleton height={200} />
                <div className="card-body">
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
                    y: -15,
                    scale: 1.03,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
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
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                    duration: 0.5,
                    ease: "power3.out",
                  });
                }
              };

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/services/${service._id}`}>
                    <div
                      ref={(el) => (cardRefs.current[index] = el)}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="card bg-base-100 p-4 rounded-2xl shadow-xl group overflow-hidden h-full"
                      style={{ boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                      <figure className="relative h-48 overflow-hidden">
                        <img
                          src={
                            service.image ||
                            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
                          }
                          alt={service.service_name}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                          <span className="text-sm font-bold text-[#e8a803]">
                            {service.service_category}
                          </span>
                        </div>
                      </figure>
                      <div className="card-body">
                        <h3 className="card-title text-xl">
                          {service.service_name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 poppins-regular">
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-2xl font-bold text-[#e8a803]">
                              BDT {service.cost}
                            </span>
                            <span className="text-sm text-gray-500">
                              /{service.unit}
                            </span>
                          </div>
                          <button className="btn btn-sm bg-gradient-to-r from-[#e8a803] to-[#f59e0b] text-white border-none hover:shadow-lg">
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
          className="text-center mt-12"
        >
          <Link to="/services" className="btn btn-lg btn-outline btn-primary">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );

  // How It Works Section
  const HowItWorksSection = () => (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#e8a803] to-[#f59e0b] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Decorators Section
  const DecoratorsSection = () => (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Top{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Decorators
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our talented team of professional decorators
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {decorators.map((decorator, index) => (
            <motion.div
              key={decorator._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all h-full card-hover rounded-3xl border border-gray-100"
            >
              <figure className="px-6 pt-8">
                <img
                  src={
                    decorator.photoURL || "https://i.ibb.co/3YRjQxv/user.png"
                  }
                  alt={decorator.displayName}
                  className="rounded-full w-32 h-32 object-cover ring-4 ring-[#e8a80330] shadow-md"
                />
              </figure>
              <div className="card-body items-center text-center p-6">
                <h3 className="card-title text-xl font-bold">{decorator.displayName}</h3>
                <p className="text-sm text-gray-600 font-medium">
                  {decorator.specialty || "Professional Decorator"}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-yellow-500 fill-yellow-500"
                      size={16}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.9)</span>
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
    <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-100 p-6 rounded-2xl shadow-lg card-hover"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Coverage Map Section
  const CoverageMapSection = () => (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Service{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Coverage
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide decoration services across Dhaka and surrounding areas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[500px] rounded-3xl overflow-hidden shadow-2xl"
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
          className="text-center mt-8"
        >
          <Link
            to="/coverage-map"
            className="btn btn-lg btn-outline btn-primary"
          >
            View Full Coverage Map
          </Link>
        </motion.div>
      </div>
    </section>
  );

  // FAQ Section
  const FaqSection = () => (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#e8a803] to-[#f59e0b] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "How far in advance should I book?",
              answer: "We recommend booking at least 2-4 weeks in advance for regular events and 2-3 months for weddings.",
            },
            {
              question: "Do you provide customization options?",
              answer: "Yes! We work closely with you to customize every aspect of your decoration to match your vision.",
            },
            {
              question: "What areas do you serve?",
              answer: "We currently serve Dhaka and surrounding areas. Check our coverage map for specific locations.",
            },
            {
              question: "What is your cancellation policy?",
              answer: "Cancellations made 7 days before the event receive a full refund. Within 7 days, a 50% fee applies.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="collapse collapse-plus bg-base-100 shadow-lg"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Newsletter Section
  const NewsletterSection = () => (
    <section className="py-20 bg-gradient-to-r from-[#e8a803] to-[#f59e0b]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Stay Updated
          </h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter for exclusive offers and decoration tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-lg flex-1 max-w-md"
            />
            <button className="btn btn-lg bg-white text-[#e8a803] hover:bg-gray-100 border-none">
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
