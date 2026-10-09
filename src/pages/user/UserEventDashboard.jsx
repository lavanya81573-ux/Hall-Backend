import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import { useNotificationContext } from '../../context/NotificationContext';
import Button from '../../components/common/Button';
import BookingStatus from '../../components/booking/BookingStatus';
import PaymentStatus from '../../components/payment/PaymentStatus';
import BookingLifecycleStepper from '../../components/booking/BookingLifecycleStepper';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  QrCode,
  FileText,
  Bell,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  Download,
  Printer,
  X,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  DollarSign
} from 'lucide-react';

const UserEventDashboard = () => {
  const { bookings } = useBookings();
  const { user, adminName } = useAuth();
  const { notifications } = useNotificationContext();
  const navigate = useNavigate();

  // Modals state
  const [showQrModal, setShowQrModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Get active upcoming booking (first pending or approved booking)
  const upcomingBooking = bookings && bookings.length > 0 ? bookings[0] : null;

  // Event Countdown Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!upcomingBooking?.startDate) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(`${upcomingBooking.startDate}T09:00:00`).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [upcomingBooking]);

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Dashboard Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-peach-200 pb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-peach-100 text-purple-900 border border-peach-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-peach-500" />
              <span>Personal Event Control Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-purple-950">
              Welcome back, {user?.name || 'Guest User'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your venue reservations, countdown timers, entry passes, and payments.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/halls">
              <Button variant="primary" size="md" icon={Building2}>
                Book New Hall
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Dashboard Content */}
        {upcomingBooking ? (
          <div className="space-y-8">

            {/* Top Grid: Countdown & Hero Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* 1. Upcoming Event Card (7 Cols) */}
              <div className="lg:col-span-7 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-800 shadow-xl flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-purple-800/80 pb-4 mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-peach-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-peach-400" />
                      Next Upcoming Event
                    </span>
                    <div className="flex items-center gap-2">
                      <BookingStatus status={upcomingBooking.status} />
                      <PaymentStatus status={upcomingBooking.paymentStatus} />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">{upcomingBooking.hallName}</h2>
                  <p className="text-xs text-purple-200 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-peach-400" />
                    <span>Reference ID: {upcomingBooking.id} • {upcomingBooking.eventType}</span>
                  </p>
                </div>

                {/* Quick Indicators Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-purple-900/60 p-4 rounded-2xl border border-purple-800 text-xs">
                  <div>
                    <span className="text-[10px] text-purple-300 font-bold block">Event Date</span>
                    <span className="font-extrabold text-white">{formatDate(upcomingBooking.startDate)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-300 font-bold block">Event Time</span>
                    <span className="font-extrabold text-white">{upcomingBooking.startTime || '09:00 AM'} - {upcomingBooking.endTime || '10:00 PM'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-300 font-bold block">Guests</span>
                    <span className="font-extrabold text-white">{upcomingBooking.guestCount} People</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-300 font-bold block">Payment Method</span>
                    <span className="font-extrabold text-peach-300">{upcomingBooking.paymentMethod || 'UPI'}</span>
                  </div>
                </div>

                {/* Action Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-2xl font-black text-white">{formatCurrency(upcomingBooking.totalAmount)}</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="accent" size="sm" icon={QrCode} onClick={() => setShowQrModal(true)}>
                      QR Pass
                    </Button>
                    <Button variant="secondary" size="sm" icon={FileText} onClick={() => setShowInvoiceModal(true)}>
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>

              {/* 2. Live Event Countdown Timer Card (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-lg flex flex-col justify-between space-y-6">
                <div className="border-b border-peach-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>Event Countdown</span>
                  </span>
                  <h3 className="text-lg font-extrabold text-purple-950 mt-1">Time Remaining to Event</h3>
                </div>

                {/* Countdown Tiles */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-peach-50 p-3 rounded-2xl border border-peach-200">
                    <span className="text-2xl sm:text-3xl font-black text-purple-950 block">{timeLeft.days}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Days</span>
                  </div>
                  <div className="bg-peach-50 p-3 rounded-2xl border border-peach-200">
                    <span className="text-2xl sm:text-3xl font-black text-purple-950 block">{timeLeft.hours}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Hours</span>
                  </div>
                  <div className="bg-peach-50 p-3 rounded-2xl border border-peach-200">
                    <span className="text-2xl sm:text-3xl font-black text-purple-950 block">{timeLeft.minutes}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Mins</span>
                  </div>
                  <div className="bg-peach-50 p-3 rounded-2xl border border-peach-200">
                    <span className="text-2xl sm:text-3xl font-black text-purple-950 block">{timeLeft.seconds}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Secs</span>
                  </div>
                </div>

                <div className="bg-peach-50/70 p-3 rounded-2xl border border-peach-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Assigned Event Manager:</span>
                  <span className="font-extrabold text-purple-950 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                    Admin {adminName}
                  </span>
                </div>
              </div>

            </div>

            {/* Visual 8-Stage Booking Lifecycle Progress Bar */}
            <BookingLifecycleStepper booking={upcomingBooking} />

            {/* Quick Actions & Utility Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Quick Action 1: QR Pass */}
              <button
                onClick={() => setShowQrModal(true)}
                className="p-6 bg-white rounded-3xl border border-peach-200 shadow-sm hover:shadow-md transition-all text-left flex items-start space-x-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <QrCode className="w-6 h-6 text-purple-800" />
                </div>
                <div>
                  <h4 className="font-extrabold text-purple-950 text-base">Digital QR Entry Pass</h4>
                  <p className="text-xs text-slate-500 mt-1">Scan at Elite Hall gate entrance for seamless guest access.</p>
                  <span className="inline-flex items-center text-xs font-bold text-purple-700 mt-2 hover:underline">
                    View Digital Pass &rarr;
                  </span>
                </div>
              </button>

              {/* Quick Action 2: Invoice & Receipt */}
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="p-6 bg-white rounded-3xl border border-peach-200 shadow-sm hover:shadow-md transition-all text-left flex items-start space-x-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-peach-100 text-peach-900 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6 text-peach-600" />
                </div>
                <div>
                  <h4 className="font-extrabold text-purple-950 text-base">Official Booking Invoice</h4>
                  <p className="text-xs text-slate-500 mt-1">Download or print full tax invoice with breakdown.</p>
                  <span className="inline-flex items-center text-xs font-bold text-purple-700 mt-2 hover:underline">
                    Print Invoice &rarr;
                  </span>
                </div>
              </button>

            </div>

            {/* Notifications Feed & All Bookings List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* All User Bookings (2 Cols) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-peach-100 pb-4">
                  <h3 className="text-xl font-extrabold text-purple-950">My Reservations</h3>
                  <Link to="/my-bookings" className="text-xs font-bold text-purple-700 hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 rounded-2xl bg-peach-50/50 border border-peach-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400">ID: {booking.id}</span>
                        <h4 className="text-base font-extrabold text-purple-950">{booking.hallName}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {formatDate(booking.startDate)} • {booking.startTime || '09:00 AM'} - {booking.endTime || '10:00 PM'}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex flex-col items-end gap-1">
                          <BookingStatus status={booking.status} />
                          <span className="text-xs font-black text-purple-950">{formatCurrency(booking.totalAmount)}</span>
                        </div>
                        <Link to={`/booking/${booking.id}`}>
                          <Button variant="ghost" size="sm">Details</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications & System Updates (1 Col) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-peach-100 pb-3">
                  <h3 className="text-base font-extrabold text-purple-950 flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-purple-600" />
                    <span>Recent Notifications</span>
                  </h3>
                  <Link to="/notifications" className="text-[11px] font-bold text-purple-700 hover:underline">
                    All Alerts
                  </Link>
                </div>

                <div className="space-y-3">
                  {notifications.slice(0, 4).map((notif) => (
                    <div key={notif.id} className="p-3 rounded-xl bg-peach-50 border border-peach-200 text-xs space-y-1">
                      <p className="font-bold text-purple-950">{notif.title}</p>
                      <p className="text-slate-600 leading-snug">{notif.message}</p>
                      <span className="text-[10px] text-slate-400 font-semibold block pt-1">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-peach-200 text-center space-y-4">
            <Building2 className="w-12 h-12 text-peach-500 mx-auto" />
            <h3 className="text-xl font-extrabold text-purple-950">No Active Event Reservations</h3>
            <p className="text-xs text-slate-500">You haven't booked any Elite Hall venue yet.</p>
            <Link to="/halls">
              <Button variant="primary" size="md">Browse 12 Hall Categories</Button>
            </Link>
          </div>
        )}

        {/* Modal 1: Digital QR Event Pass */}
        {showQrModal && upcomingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-peach-200">
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-purple-950 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-purple-900 text-peach-300 flex items-center justify-center mx-auto">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-purple-950">Digital Gate Pass</h3>
                <p className="text-xs text-slate-500">Show this QR code to the gate concierge at Elite Hall entrance.</p>
              </div>

              {/* QR Code Container */}
              <div className="p-6 bg-peach-50 rounded-2xl border-2 border-dashed border-peach-300 text-center space-y-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${upcomingBooking.id}`}
                  alt="Entry QR Pass"
                  className="w-44 h-44 mx-auto rounded-xl shadow-md border border-white"
                />
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-purple-950">{upcomingBooking.id}</p>
                  <p className="text-[11px] font-bold text-slate-600">{upcomingBooking.hallName}</p>
                  <p className="text-[10px] text-slate-400">{formatDate(upcomingBooking.startDate)} • {upcomingBooking.startTime || '09:00 AM'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-500 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Pass • Concierge Team</span>
              </div>

              <Button variant="primary" fullWidth size="md" icon={Download} onClick={() => alert('QR Pass Saved to Device!')}>
                Download Pass Image
              </Button>
            </div>
          </div>
        )}

        {/* Modal 2: Official Booking Invoice */}
        {showInvoiceModal && upcomingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-peach-200 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-purple-950 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Printable Invoice Header */}
              <div className="flex justify-between items-start border-b border-peach-200 pb-4">
                <div>
                  <span className="text-2xl font-black text-purple-950">Elite<span className="text-peach-500 font-serif italic ml-1">Hall</span></span>
                  <p className="text-xs text-slate-500">Official Tax Receipt &amp; Invoice</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-extrabold text-purple-950">Invoice #: INV-{upcomingBooking.id}</p>
                  <p className="text-slate-500">Issued Date: {upcomingBooking.createdAt}</p>
                </div>
              </div>

              {/* Billed To Details */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-peach-50/70 p-4 rounded-2xl border border-peach-200">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Billed Client</span>
                  <p className="font-black text-purple-950 text-sm mt-1">{upcomingBooking.userName}</p>
                  <p className="text-slate-600">{upcomingBooking.userEmail}</p>
                  <p className="text-slate-600">{upcomingBooking.userPhone}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Venue Details</span>
                  <p className="font-black text-purple-950 text-sm mt-1">{upcomingBooking.hallName}</p>
                  <p className="text-slate-600">Event Type: {upcomingBooking.eventType}</p>
                  <p className="text-slate-600">Event Date: {formatDate(upcomingBooking.startDate)}</p>
                </div>
              </div>

              {/* Charges Breakdown Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Charges Summary</h4>
                <table className="w-full text-xs text-left">
                  <thead className="bg-purple-950 text-white">
                    <tr>
                      <th className="p-2.5 rounded-l-xl">Description</th>
                      <th className="p-2.5">Slot / Duration</th>
                      <th className="p-2.5 text-right rounded-r-xl">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-peach-100">
                    <tr>
                      <td className="p-2.5 font-bold text-purple-950">{upcomingBooking.hallName} Rental</td>
                      <td className="p-2.5 text-slate-600">{upcomingBooking.startTime || '09:00 AM'} - {upcomingBooking.endTime || '10:00 PM'}</td>
                      <td className="p-2.5 text-right font-bold">{formatCurrency(Math.round(upcomingBooking.totalAmount / 1.18))}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-purple-950">GST Tax &amp; Service Fee (18%)</td>
                      <td className="p-2.5 text-slate-600">Standard Tax</td>
                      <td className="p-2.5 text-right font-bold">{formatCurrency(Math.round(upcomingBooking.totalAmount - (upcomingBooking.totalAmount / 1.18)))}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-purple-950 font-black text-sm">
                      <td colSpan={2} className="p-2.5 text-purple-950">Total Paid / Payable ({upcomingBooking.paymentMethod})</td>
                      <td className="p-2.5 text-right text-purple-950">{formatCurrency(upcomingBooking.totalAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-peach-200">
                <Button variant="secondary" size="md" icon={Printer} onClick={() => window.print()}>
                  Print Invoice
                </Button>
                <Button variant="primary" size="md" icon={Download} onClick={() => alert('Downloading Invoice PDF...')}>
                  Download PDF Invoice
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </UserLayout>
  );
};

export default UserEventDashboard;
