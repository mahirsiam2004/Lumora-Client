import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "../utilits/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    photoFile: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  const uploadToImageBB = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`,
      fd
    );
    return response.data.data.url;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photoFile: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoURL = "https://i.ibb.co/3YRjQxv/user.png";
      if (formData.photoFile) {
        photoURL = await uploadToImageBB(formData.photoFile);
      }
      await registerUser(formData.email, formData.password, formData.displayName, photoURL);
      toast.success("Account created successfully!");
      navigate("/");
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Account created successfully!");
      navigate("/");
    } catch {
      toast.error("Google sign-up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/60 via-white to-yellow-50/40 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[440px]"
      >
        <div className="bg-base-100 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-base-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e8a803] to-[#f59e0b] shadow-[0_4px_14px_rgba(232,168,3,0.4)] mb-4">
              <FiUser size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-base-content mb-1">Create your account</h1>
            <p className="text-sm text-base-content/50">Join Lumora and transform your spaces</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text">Full name</span>
              </label>
              <div className="relative">
                <FiUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="input input-bordered w-full pl-10 text-sm"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text">Email address</span>
              </label>
              <div className="relative">
                <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input input-bordered w-full pl-10 text-sm"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input input-bordered w-full pl-10 pr-10 text-sm"
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text">Profile photo <span className="text-base-content/40 font-normal">(optional)</span></span>
              </label>
              <div className="flex items-center gap-3">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#e8a803]/40 flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center flex-shrink-0">
                    <FiUser size={18} className="text-base-content/30" />
                  </div>
                )}
                <label className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border-1.5 border-dashed border-base-300 hover:border-[#e8a803] cursor-pointer transition-colors group">
                  <FiUpload size={15} className="text-base-content/40 group-hover:text-[#e8a803] transition-colors" />
                  <span className="text-sm text-base-content/50 group-hover:text-base-content/70 transition-colors">
                    {formData.photoFile ? formData.photoFile.name : "Choose a photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider my-5 text-xs">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full gap-2 text-sm"
          >
            <FcGoogle size={20} />
            Google
          </button>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#e8a803] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
