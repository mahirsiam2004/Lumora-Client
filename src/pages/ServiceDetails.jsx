
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utilits/axiosInstance";
import { useAuth } from "../contexts/AuthContext";
import {
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiTag,
  FiStar,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);


  const [bookingData, setBookingData] = useState({
    bookingDate: "",
    location: "",
    notes: "",
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/services/${id}`
        );
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a service");
      navigate("/login", { state: { from: { pathname: `/services/${id}` } } });
      return;
    }

    try {
      const token = localStorage.getItem("lumora-token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          serviceId: service._id,
          serviceName: service.service_name,
          serviceCategory: service.service_category,
          serviceCost: service.cost,
          serviceUnit: service.unit,
          userEmail: user.email,
          userName: user.displayName,
          ...bookingData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Booking created successfully! Please proceed to payment.");
      document.getElementById("booking_modal").close();
      navigate("/dashboard/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton height={400} className="mb-6" />
        <Skeleton count={5} />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Service not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8a80310] via-[#fbbf2420] to-[#fcd34d10] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Image Gallery */}
          <div className="h-96 relative overflow-hidden">
            <img
              src={
                service.image ||
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200"
              }
              alt={service.service_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl font-bold mb-2"
              >
                {service.service_name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <span className="badge badge-lg bg-white text-[#e8a803]">
                  {service.service_category}
                </span>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <FiDollarSign className="text-[#e8a803]" size={24} />
                    <h3 className="font-semibold text-lg">Pricing</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#e8a803]">
                    ৳{service.cost}
                    <span className="text-sm text-gray-600">
                      /{service.unit}
                    </span>
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <FiTag className="text-pink-600" size={24} />
                    <h3 className="font-semibold text-lg">Category</h3>
                  </div>
                  <p className="text-xl font-semibold text-pink-600">
                    {service.service_category}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    "Professional Team",
                    "Quality Materials",
                    "On-time Delivery",
                    "Custom Designs",
                    "24/7 Support",
                    "Money-back Guarantee",
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-[#e8a803] rounded-full" />
                      <span className="text-base-content">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Reviews Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
                <div className="space-y-4">
                  {[
                    {
                      user: "Alice Green",
                      rating: 5,
                      date: "2 days ago",
                      comment:
                        "Absolutely amazing service! The team was professional and the decorations were stunning.",
                      avatar: "https://i.pravatar.cc/150?u=alice",
                    },
                    {
                      user: "John Doe",
                      rating: 4,
                      date: "1 week ago",
                      comment:
                        "Great experience overall. Highly recommended for wedding decorations.",
                      avatar: "https://i.pravatar.cc/150?u=john",
                    },
                  ].map((review, i) => (
                    <div key={i} className="bg-base-200 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-bold">{review.user}</div>
                            <div className="text-xs text-gray-500">
                              {review.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, starI) => (
                            <FiStar
                              key={starI}
                              className={
                                starI < review.rating
                                  ? "fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Related Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border"
                    >
                      <div className="card-body p-4">
                        <h3 className="font-bold">
                          Birthday Party Deluxe Package
                        </h3>
                        <p className="text-sm text-gray-500">
                          Starting from ৳15,000
                        </p>
                        <button className="btn btn-sm btn-link px-0 text-[#e8a803]">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-[#e8a803] to-[#f59e0b] rounded-2xl p-6 text-white sticky top-24"
              >
                <h3 className="text-2xl font-bold mb-6">Book This Service</h3>

                <div className="space-y-4 mb-6">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm opacity-90">Starting from</p>
                    <p className="text-3xl font-bold">৳{service.cost}</p>
                    <p className="text-sm opacity-90">per {service.unit}</p>
                  </div>
                </div>

                {user ? (
                  <button
                    onClick={() => document.getElementById("booking_modal").showModal()}
                    className="btn btn-lg w-full bg-white text-[#e8a803] hover:bg-gray-100 border-none"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-lg w-full bg-white text-[#e8a803] hover:bg-gray-100 border-none"
                  >
                    Login to Book
                  </button>
                )}

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <FiCalendar />
                    <span>Flexible scheduling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiMapPin />
                    <span>On-site service available</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== BOOKING MODAL ==================== */}
      <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle mx-auto mt-20 p-10 rounded-lg">
        <div className="modal-box max-w-md w-11/12 sm:w-full mx-auto">
          {/* Close button (X) */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-2xl mb-6 text-center">
            Complete Your Booking
          </h3>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Your Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Your Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Service */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Service</span>
              </label>
              <input
                type="text"
                value={service.service_name}
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Booking Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Booking Date *</span>
              </label>
              <input
                type="date"
                value={bookingData.bookingDate}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    bookingDate: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Location *</span>
              </label>
              <input
                type="text"
                placeholder="Enter your location"
                value={bookingData.location}
                onChange={(e) =>
                  setBookingData({ ...bookingData, location: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Notes */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Additional Notes (Optional)
                </span>
              </label>
              <textarea
                placeholder="Any special requirements..."
                value={bookingData.notes}
                onChange={(e) =>
                  setBookingData({ ...bookingData, notes: e.target.value })
                }
                className="textarea textarea-bordered w-full h-28"
              />
            </div>

            {/* Buttons */}
            <div className="modal-action flex justify-between sm:justify-end gap-3 mt-6">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("booking_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-gradient-to-r from-[#e8a803] to-[#f59e0b] text-white border-none"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;