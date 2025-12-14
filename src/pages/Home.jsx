// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utilits/axiosInstance";
import { FiStar, FiMapPin, FiArrowRight, FiCheck } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [services, setServices] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, decoratorsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/services?limit=6`),
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
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
                className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none hover:scale-105 transition-transform"
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
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
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
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
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

  // Services Section
  const ServicesSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of decoration packages tailored to your needs
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl">
                <Skeleton height={200} />
                <div className="card-body">
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/services/${service._id}`}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                    <figure className="relative h-48 overflow-hidden">
                      <img
                        src={
                          service.image ||
                          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
                        }
                        alt={service.service_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-purple-600">
                          {service.service_category}
                        </span>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-xl">
                        {service.service_name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-2xl font-bold text-purple-600">
                            ৳{service.cost}
                          </span>
                          <span className="text-sm text-gray-500">
                            /{service.unit}
                          </span>
                        </div>
                        <button className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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

  // Decorators Section
  const DecoratorsSection = () => (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Top{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
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
              className="card bg-white shadow-xl hover:shadow-2xl transition-all"
            >
              <figure className="px-6 pt-6">
                <img
                  src={
                    decorator.photoURL || "https://i.ibb.co/3YRjQxv/user.png"
                  }
                  alt={decorator.displayName}
                  className="rounded-full w-32 h-32 object-cover ring-4 ring-purple-200"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{decorator.displayName}</h3>
                <p className="text-sm text-gray-600">
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

  // Coverage Map Section
  const CoverageMapSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Service{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
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

  return (
    <div>
      <Hero />
      <ServicesSection />
      <DecoratorsSection />
      <CoverageMapSection />
    </div>
  );
};

export default Home;
