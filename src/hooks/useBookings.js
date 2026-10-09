import { useBookingContext } from '../context/BookingContext';

export const useBookings = () => {
  const { bookings, addBooking, updateBookingStatus, updatePaymentStatus } = useBookingContext();

  const getBookingById = (id) => {
    return bookings.find(b => b.id === id);
  };

  const getUserBookings = (email) => {
    if (!email) return bookings;
    return bookings.filter(b => b.userEmail?.toLowerCase() === email.toLowerCase());
  };

  return {
    bookings,
    getBookingById,
    getUserBookings,
    addBooking,
    updateBookingStatus,
    updatePaymentStatus
  };
};
