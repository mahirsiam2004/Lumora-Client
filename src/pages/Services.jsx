
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FiSearch, FiFilter } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [search, category, minPrice, maxPrice, sort, currentPage]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/service-categories`
      );
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category !== "all") params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);
      params.append("page", currentPage);
      params.append("limit", 12);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/services?${params.toString()}`
      );

      setServices(data.services);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the perfect decoration package for your special occasion
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Min Price */}
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input input-bordered w-full"
            />

            {/* Max Price */}
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input input-bordered w-full"
            />

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={handleReset} className="btn btn-ghost btn-sm">
              <FiFilter /> Reset Filters
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card bg-white shadow-xl">
                <Skeleton height={200} />
                <div className="card-body">
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No services found</p>
            <button onClick={handleReset} className="btn btn-primary mt-4">
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/services/${service._id}`}>
                  <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group h-full">
                    <figure className="relative h-48 overflow-hidden">
                      <img
                        src={
                          service.image ||
                          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600"
                        }
                        alt={service.service_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                        <span className="text-xs font-bold text-purple-600">
                          {service.service_category}
                        </span>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-lg">
                        {service.service_name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-xl font-bold text-purple-600">
                            ৳{service.cost}
                          </span>
                          <span className="text-xs text-gray-500">
                            /{service.unit}
                          </span>
                        </div>
                        <button className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="join-item btn"
              >
                «
              </button>
              <button className="join-item btn">
                Page {currentPage} of {totalPages}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="join-item btn"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
