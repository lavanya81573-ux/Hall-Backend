import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import BookingCard from '../../components/booking/BookingCard';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Calendar } from 'lucide-react';

const MyBookings = () => {
  const { getUserBookings } = useBookings();
  const { user } = useAuth();
  const myBookings = getUserBookings(user?.email);

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">
            Reservation History
          </span>
          <h1 className="text-3xl font-black text-purple-950">My Elite Hall Bookings</h1>
          <p className="text-xs text-slate-500 mt-1">Manage and track your upcoming &amp; past event reservations</p>
        </div>

        {myBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-peach-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-peach-100 text-purple-900 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-purple-950">No Bookings Yet</h3>
            <p className="text-xs text-slate-500">You haven't reserved any Elite Hall venue yet.</p>
            <Link to="/halls">
              <Button variant="primary" size="md">
                Browse Elite Halls
              </Button>
            </Link>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default MyBookings;
