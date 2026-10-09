import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import BookingForm from '../../components/booking/BookingForm';
import BookingSummary from '../../components/booking/BookingSummary';
import { useHalls } from '../../hooks/useHalls';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';

const BookHall = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const preselectedDate = searchParams.get('date') || '';
  const { getHallById } = useHalls();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  const navigate = useNavigate();

  const hall = getHallById(id);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: preselectedDate,
    endDate: preselectedDate,
    guestCount: 200,
    eventType: 'Wedding Reception',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: user?.phone || ''
  });

  const handleFormSubmit = (formData) => {
    const created = addBooking({
      hallId: hall.id,
      ...formData,
      userEmail: user?.email || formData.contactEmail,
      userName: user?.name || formData.contactName,
      totalAmount: (hall.pricePerDay || 25000) * 1.18
    });
    navigate(`/payment/${created.id}`);
  };

  if (!hall) return null;

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">
            Reserve Venue
          </span>
          <h1 className="text-3xl font-black text-purple-950">Book {hall.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <BookingForm
              hall={hall}
              initialData={bookingDetails}
              onSubmit={handleFormSubmit}
            />
          </div>

          <div>
            <BookingSummary hall={hall} bookingData={bookingDetails} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default BookHall;
