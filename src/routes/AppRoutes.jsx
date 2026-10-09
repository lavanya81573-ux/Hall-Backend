import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public & User Pages
import Home from '../pages/user/Home';
import Halls from '../pages/user/Halls';
import HallDetails from '../pages/user/HallDetails';
import HallCompare from '../pages/user/HallCompare';
import UserEventDashboard from '../pages/user/UserEventDashboard';
import BookHall from '../pages/user/BookHall';
import MyBookings from '../pages/user/MyBookings';
import BookingDetails from '../pages/user/BookingDetails';
import Payment from '../pages/user/Payment';
import PaymentSuccess from '../pages/user/PaymentSuccess';
import PaymentFailed from '../pages/user/PaymentFailed';
import Notifications from '../pages/user/Notifications';
import Profile from '../pages/user/Profile';
import Feedback from '../pages/user/Feedback';

// Auth Pages
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import AdminNotifications from '../pages/admin/AdminNotifications';
import HallList from '../pages/admin/Halls/HallList';
import AddHall from '../pages/admin/Halls/AddHall';
import EditHall from '../pages/admin/Halls/EditHall';
import AdminHallAvailability from '../pages/admin/Halls/HallAvailability';

import BookingList from '../pages/admin/Bookings/BookingList';
import AdminBookingDetails from '../pages/admin/Bookings/BookingDetails';
import BookingApproval from '../pages/admin/Bookings/BookingApproval';

import UserList from '../pages/admin/Users/UserList';
import UserDetails from '../pages/admin/Users/UserDetails';

import PaymentList from '../pages/admin/Payments/PaymentList';
import Refunds from '../pages/admin/Payments/Refunds';

import PricingRules from '../pages/admin/Pricing/PricingRules';
import CancellationPolicy from '../pages/admin/Pricing/CancellationPolicy';

import BookingReports from '../pages/admin/Reports/BookingReports';
import RevenueReports from '../pages/admin/Reports/RevenueReports';
import UtilizationReports from '../pages/admin/Reports/UtilizationReports';

import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import DashboardRedirect from './DashboardRedirect';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/halls" element={<Halls />} />
      <Route path="/halls/:id" element={<HallDetails />} />
      <Route path="/compare" element={<HallCompare />} />
      
      {/* Smart Generic Dashboard Redirect */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Role-Protected User Event Dashboard */}
      <Route path="/event-dashboard" element={<UserRoute><UserEventDashboard /></UserRoute>} />
      <Route path="/book-hall/:id" element={<ProtectedRoute><BookHall /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/booking/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
      <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
      <Route path="/payment-failed" element={<ProtectedRoute><PaymentFailed /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Dedicated Auth & Portal Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
      <Route path="/admin/halls" element={<AdminRoute><HallList /></AdminRoute>} />
      <Route path="/admin/halls/add" element={<AdminRoute><AddHall /></AdminRoute>} />
      <Route path="/admin/halls/edit/:id" element={<AdminRoute><EditHall /></AdminRoute>} />
      <Route path="/admin/halls/availability" element={<AdminRoute><AdminHallAvailability /></AdminRoute>} />

      <Route path="/admin/bookings" element={<AdminRoute><BookingList /></AdminRoute>} />
      <Route path="/admin/bookings/:id" element={<AdminRoute><AdminBookingDetails /></AdminRoute>} />
      <Route path="/admin/bookings/approval" element={<AdminRoute><BookingApproval /></AdminRoute>} />

      <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>} />
      <Route path="/admin/users/:id" element={<AdminRoute><UserDetails /></AdminRoute>} />

      <Route path="/admin/payments" element={<AdminRoute><PaymentList /></AdminRoute>} />
      <Route path="/admin/payments/refunds" element={<AdminRoute><Refunds /></AdminRoute>} />

      <Route path="/admin/pricing" element={<AdminRoute><PricingRules /></AdminRoute>} />
      <Route path="/admin/pricing/cancellation" element={<AdminRoute><CancellationPolicy /></AdminRoute>} />

      <Route path="/admin/reports" element={<AdminRoute><BookingReports /></AdminRoute>} />
      <Route path="/admin/reports/revenue" element={<AdminRoute><RevenueReports /></AdminRoute>} />
      <Route path="/admin/reports/utilization" element={<AdminRoute><UtilizationReports /></AdminRoute>} />

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
