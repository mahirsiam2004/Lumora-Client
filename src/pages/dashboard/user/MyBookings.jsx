import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { FiTrash2, FiCreditCard, FiCalendar, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("lumora-token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/user/${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (booking) => {
    setPaymentLoading(true);

    try {
      const token = localStorage.getItem("lumora-token");
      const stripe = await stripePromise;

      // Create checkout session
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-checkout-session`,
        {
          bookingId: booking._id,
          amount: booking.serviceCost,
          serviceName: booking.serviceName,
          userEmail: user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("lumora-token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const getStatusColor = (status, isPaid) => {
    if (!isPaid) return "badge-warning";
    if (status === "completed") return "badge-success";
    if (status === "assigned") return "badge-info";
    return "badge-primary";
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          My{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Bookings
          </span>
        </h1>
        <p className="text-gray-600">
          View and manage your decoration bookings
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-purple-600"></span>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-2xl text-gray-600 mb-4">No bookings yet</p>
          <a
            href="/services"
            className="btn bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none"
          >
            Browse Services
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {booking.serviceName}
                      </h3>
                      <span
                        className={`badge ${getStatusColor(
                          booking.status,
                          booking.isPaid
                        )}`}
                      >
                        {booking.isPaid ? booking.status : "Payment Pending"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">
                        ৳{booking.serviceCost.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        per {booking.serviceUnit}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiCalendar />
                      <span>
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiMapPin />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  {booking.decoratorName && (
                    <p className="text-sm text-gray-600">
                      Decorator: <strong>{booking.decoratorName}</strong>
                    </p>
                  )}
                </div>

                <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-4">
                  {!booking.isPaid && (
                    <>
                      <button
                        onClick={() => handlePayment(booking)}
                        disabled={paymentLoading}
                        className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none"
                      >
                        {paymentLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <FiCreditCard /> Pay Now
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        <FiTrash2 /> Cancel
                      </button>
                    </>
                  )}
                  {booking.isPaid && (
                    <div className="badge badge-success badge-lg">✓ Paid</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
