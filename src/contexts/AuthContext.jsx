// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utilits/firebase.config";
import axios from "../utilits/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Register user
  const registerUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName,
      photoURL,
    });

    // Save user to database
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
      email: result.user.email,
      displayName,
      photoURL,
      role: "user",
    });

    return result;
  };

  // Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);

    // Save user to database if new
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      role: "user",
    });

    return result;
  };

  // Logout user
  const logoutUser = () => {
    setLoading(true);
    localStorage.removeItem("lumora-token");
    return signOut(auth);
  };

  // Get JWT token
  const getToken = useCallback(async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/jwt`,
      { email }
    );
    localStorage.setItem("lumora-token", data.token);
    return data.token;
  }, []);

  // Fetch user role
  const fetchUserRole = useCallback(async (email) => {
    try {
      const token = localStorage.getItem("lumora-token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserRole(data?.role || "user");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole("user");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await getToken(currentUser.email);
        await fetchUserRole(currentUser.email);
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [getToken, fetchUserRole]);

  const authInfo = {
    user,
    userRole,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
