import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Contact from "../pages/Contact";
import ServiceCoverageMap from "../pages/ServiceCoverageMap";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DecoratorRoute from "./DecoratorRoute";

// Dashboard Pages
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import MyBookings from "../pages/dashboard/user/MyBookings";
// import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
// import MyProfile from "../pages/dashboard/user/MyProfile";

import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageServices from "../pages/dashboard/admin/ManageServices";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import ManageDecorators from "../pages/dashboard/admin/ManageDecorators";
import Analytics from "../pages/dashboard/admin/Analytics";

import DecoratorDashboard from "../pages/dashboard/decorator/DecoratorDashboard";
import MyProjects from "../pages/dashboard/decorator/MyProjects";
import TodaySchedule from "../pages/dashboard/decorator/TodaySchedule";
import Earnings from "../pages/dashboard/decorator/Earnings";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import MyProfile from "../pages/dashboard/user/MyProfile";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/coverage-map", element: <ServiceCoverageMap /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User Routes
      { path: "/dashboard", element: <UserDashboard /> },
      // { path: "/dashboard/my-profile", element: <MyProfile /> },
      { path: "/dashboard/my-bookings", element: <MyBookings /> },
      // { path: "/dashboard/payment-history", element: <PaymentHistory /> },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // Admin Routes
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/services",
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/decorators",
        element: (
          <AdminRoute>
            <ManageDecorators />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },

      // Decorator Routes
      {
        path: "/dashboard/decorator",
        element: (
          <DecoratorRoute>
            <DecoratorDashboard />
          </DecoratorRoute>
        ),
      },
      {
        path: "/dashboard/decorator/projects",
        element: (
          <DecoratorRoute>
            <MyProjects />
          </DecoratorRoute>
        ),
      },
      {
        path: "/dashboard/decorator/schedule",
        element: (
          <DecoratorRoute>
            <TodaySchedule />
          </DecoratorRoute>
        ),
      },
      {
        path: "/dashboard/decorator/earnings",
        element: (
          <DecoratorRoute>
            <Earnings />
          </DecoratorRoute>
        ),
      },
    ],
  },
]);
