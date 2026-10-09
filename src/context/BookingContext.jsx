import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_HALLS, BOOKING_STATUS, PAYMENT_STATUS, HALL_NAME, ADMIN_NAME } from '../utils/constants';
import { useNotificationContext } from './NotificationContext';

const BookingContext = createContext();

const INITIAL_BOOKINGS = [
  {
    id: 'HB-8842',
    hallId: 'hall-1',
    hallName: 'Elite Hall - Grand Ballroom',
    userName: 'Ananya Roy',
    userEmail: 'ananya@example.com',
    userPhone: '+91 98123 45678',
    eventType: 'Wedding Reception',
    guestCount: 600,
    startDate: '2026-11-15',
    endDate: '2026-11-16',
    totalAmount: 50000,
    status: BOOKING_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    paymentMethod: 'Credit Card',
    createdAt: '2026-10-01',
    notes: 'Requires stage flower decorations and ambient purple lighting.'
  },
  {
    id: 'HB-8843',
    hallId: 'hall-2',
    hallName: 'Elite Hall - Executive Suite',
    userName: 'Vikram Malhotra',
    userEmail: 'vikram@techcorp.com',
    userPhone: '+91 98989 12345',
    eventType: 'Corporate Summit',
    guestCount: 250,
    startDate: '2026-10-20',
    endDate: '2026-10-20',
    totalAmount: 20000,
    status: BOOKING_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    paymentMethod: 'UPI',
    createdAt: '2026-10-03',
    notes: 'Need dual projector setup and high speed Wi-Fi.'
  },
  {
    id: 'HB-8844',
    hallId: 'hall-3',
    hallName: 'Elite Hall - Royal Garden Pavilion',
    userName: 'Siddharth Rao',
    userEmail: 'siddharth@gmail.com',
    userPhone: '+91 97777 66655',
    eventType: 'Birthday Gala',
    guestCount: 350,
    startDate: '2026-12-05',
    endDate: '2026-12-05',
    totalAmount: 25000,
    status: BOOKING_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    paymentMethod: 'Net Banking',
    createdAt: '2026-10-02',
    notes: 'Garden catering counter setup.'
  },
  {
    id: 'HB-8845',
    hallId: 'hall-1',
    hallName: 'Elite Hall - Grand Ballroom',
    userName: 'Kavita Sharma',
    userEmail: 'kavita@designhub.io',
    userPhone: '+91 91234 56789',
    eventType: 'Fashion Expo',
    guestCount: 800,
    startDate: '2026-10-28',
    endDate: '2026-10-30',
    totalAmount: 75000,
    status: BOOKING_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    paymentMethod: 'Credit Card',
    createdAt: '2026-09-25',
    notes: 'Overlapped with maintenance schedule.'
  }
];

export const BookingProvider = ({ children }) => {
  const { addUserNotification, addAdminNotification } = useNotificationContext();

  const [halls, setHalls] = useState(() => {
    const saved = localStorage.getItem('elite_halls');
    return saved ? JSON.parse(saved) : MOCK_HALLS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('elite_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all existing bookings display Pending unless explicitly updated in-session
        return parsed.map(b => ({
          ...b,
          status: b.status || BOOKING_STATUS.PENDING
        }));
      } catch (e) {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [pricingRules, setPricingRules] = useState([
    { id: 'pr-1', name: 'Weekend Surge', discountOrSurge: '+15%', appliesTo: 'Saturday, Sunday', status: 'Active' },
    { id: 'pr-2', name: 'Early Bird Special', discountOrSurge: '-10%', appliesTo: 'Booking 30+ days ahead', status: 'Active' },
    { id: 'pr-3', name: 'Corporate Package Discount', discountOrSurge: '-12%', appliesTo: 'Weekdays (Mon-Thu)', status: 'Active' }
  ]);

  const [cancellationPolicy, setCancellationPolicy] = useState({
    fullRefundDays: 14,
    partialRefundDays: 7,
    partialRefundPercent: 50,
    policyTerms: 'Full refund is granted for cancellations made at least 14 days prior to event date. 50% refund is issued for cancellations made 7-13 days prior. No refund for cancellations under 7 days.'
  });

  useEffect(() => {
    localStorage.setItem('elite_halls', JSON.stringify(halls));
  }, [halls]);

  useEffect(() => {
    localStorage.setItem('elite_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (bookingData) => {
    const hall = halls.find(h => h.id === bookingData.hallId);
    const hallName = hall ? hall.name : (bookingData.hallName || 'Elite Hall');
    const newBooking = {
      id: `HB-${Math.floor(1000 + Math.random() * 9000)}`,
      hallName,
      createdAt: new Date().toISOString().split('T')[0],
      ...bookingData,
      status: BOOKING_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.PENDING
    };
    setBookings(prev => [newBooking, ...prev]);

    // 1. Notify Admin of new incoming booking request
    addAdminNotification({
      title: 'New Booking Request 📋',
      message: `User ${bookingData.userName || 'Client'} (${bookingData.userEmail || ''}) submitted booking request #${newBooking.id} for ${hallName}.`,
      type: 'booking'
    });

    // 2. Notify User that their request was submitted
    addUserNotification({
      title: 'Booking Request Submitted ⏳',
      message: `Your booking request #${newBooking.id} for ${hallName} was submitted successfully and is awaiting Admin review.`,
      type: 'info'
    });

    return newBooking;
  };

  const updateBookingStatus = (id, newStatus) => {
    const targetBooking = bookings.find(b => b.id === id);
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );

    if (targetBooking) {
      const bId = targetBooking.id;
      const hName = targetBooking.hallName || 'Elite Hall';
      const uName = targetBooking.userName || 'Customer';

      // 1. Notify User of Admin Response
      if (newStatus === 'Approved') {
        addUserNotification({
          title: 'Booking Request Approved! 🎉',
          message: `Admin responded: Your booking request #${bId} for ${hName} has been APPROVED!`,
          type: 'success'
        });
      } else if (newStatus === 'Rejected') {
        addUserNotification({
          title: 'Booking Request Rejected ❌',
          message: `Admin responded: Your booking request #${bId} for ${hName} has been REJECTED.`,
          type: 'warning'
        });
      } else if (newStatus === 'Cancelled') {
        addUserNotification({
          title: `Booking Cancelled ❌`,
          message: `Your booking #${bId} for ${hName} has been cancelled successfully.`,
          type: 'warning'
        });
        addAdminNotification({
          title: `Booking Cancelled by User ❌`,
          message: `User ${uName} cancelled their booking #${bId} for ${hName}.`,
          type: 'warning'
        });
      } else {
        addUserNotification({
          title: `Booking Updated: ${newStatus} 📋`,
          message: `Admin updated your booking request #${bId} for ${hName} to status: ${newStatus}.`,
          type: 'info'
        });
      }

      // 2. Notify Admin confirming response
      if (newStatus !== 'Cancelled') {
        addAdminNotification({
          title: `Response Sent: ${newStatus} ✍️`,
          message: `You updated booking #${bId} for ${uName} (${hName}) to ${newStatus}.`,
          type: 'system'
        });
      }
    }
  };

  const updatePaymentStatus = (id, paymentStatus, paymentMethod = 'UPI') => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, paymentStatus, paymentMethod } : b))
    );
  };

  const addHall = (hallData) => {
    // Ensure "Elite Hall" branding
    let formattedName = hallData.name;
    if (!formattedName.toLowerCase().includes('elite hall')) {
      formattedName = `Elite Hall - ${formattedName}`;
    }
    const newHall = {
      id: `hall-${Date.now()}`,
      slug: formattedName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 4.8,
      reviewsCount: 1,
      images: [hallData.image || '/images/halls/hall-1.jpg'],
      ...hallData,
      name: formattedName
    };
    setHalls(prev => [...prev, newHall]);
    return newHall;
  };

  const updateHall = (id, updatedFields) => {
    setHalls(prev =>
      prev.map(h => {
        if (h.id === id) {
          let updatedName = updatedFields.name || h.name;
          if (updatedFields.name && !updatedFields.name.toLowerCase().includes('elite hall')) {
            updatedName = `Elite Hall - ${updatedFields.name}`;
          }
          return { ...h, ...updatedFields, name: updatedName };
        }
        return h;
      })
    );
  };

  const deleteHall = (id) => {
    setHalls(prev => prev.filter(h => h.id !== id));
  };

  return (
    <BookingContext.Provider
      value={{
        halls,
        bookings,
        pricingRules,
        cancellationPolicy,
        addBooking,
        updateBookingStatus,
        updatePaymentStatus,
        addHall,
        updateHall,
        deleteHall,
        setPricingRules,
        setCancellationPolicy,
        adminName: ADMIN_NAME,
        primaryHallName: HALL_NAME
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
