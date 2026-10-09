import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { useHalls } from '../../hooks/useHalls';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import HallAmenities from '../../components/hall/HallAmenities';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate, calculateDaysDifference } from '../../utils/formatDate';
import {
  MapPin,
  Users,
  Star,
  ShieldCheck,
  ArrowRight,
  Calendar,
  CreditCard,
  User,
  CheckCircle2,
  DollarSign,
  Tag,
  Clock,
  QrCode,
  Landmark
} from 'lucide-react';

const HallDetails = () => {
  const { id } = useParams();
  const { getHallById } = useHalls();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  const navigate = useNavigate();

  const hall = getHallById(id);
  const [activeImage, setActiveImage] = useState(hall?.image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800');

  // Interactive Reservation & Payment State
  const todayStr = new Date().toISOString().split('T')[0];
  const [organizerName, setOrganizerName] = useState(user?.name || 'Guest User');
  const [guestCount, setGuestCount] = useState(hall?.capacity || 300);
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('10:00 PM');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [durationPackage, setDurationPackage] = useState('1 Day'); // Options: '6 Hours', 'Half Day', '1 Day', '2 Days', '3 Days'

  if (!hall) {
    return (
      <UserLayout>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-purple-950">Hall Not Found</h2>
          <Link to="/halls" className="text-purple-700 underline mt-2 block font-semibold">
            Return to Halls List
          </Link>
        </div>
      </UserLayout>
    );
  }

  // Helper to add days to a YYYY-MM-DD date string
  const addDaysToDateStr = (dateStr, daysToAdd) => {
    if (!dateStr) return todayStr;
    const d = new Date(dateStr);
    d.setDate(d.getDate() + daysToAdd);
    return d.toISOString().split('T')[0];
  };

  const handleDurationPackageChange = (pkg, currentStart = startDate) => {
    setDurationPackage(pkg);
    if (pkg === '6 Hours') {
      setEndDate(currentStart);
      setStartTime('09:00 AM');
      setEndTime('03:00 PM');
    } else if (pkg === 'Half Day') {
      setEndDate(currentStart);
      setStartTime('09:00 AM');
      setEndTime('03:00 PM');
    } else if (pkg === '1 Day') {
      setEndDate(currentStart);
      setStartTime('09:00 AM');
      setEndTime('10:00 PM');
    } else if (pkg === '2 Days') {
      setEndDate(addDaysToDateStr(currentStart, 1));
      setStartTime('09:00 AM');
      setEndTime('10:00 PM');
    } else if (pkg === '3 Days') {
      setEndDate(addDaysToDateStr(currentStart, 2));
      setStartTime('09:00 AM');
      setEndTime('10:00 PM');
    }
  };

  // Payment Math
  const getMultiplier = () => {
    if (durationPackage === '6 Hours') return 0.35;
    if (durationPackage === 'Half Day') return 0.5;
    if (durationPackage === '1 Day') return 1.0;
    if (durationPackage === '2 Days') return 2.0;
    if (durationPackage === '3 Days') return 3.0;
    return Math.max(1, calculateDaysDifference(startDate, endDate));
  };

  const durationMultiplier = getMultiplier();
  const baseRate = Math.round((hall.pricePerDay || 20000) * durationMultiplier);
  const gstTax = Math.round(baseRate * 0.18);
  const grandTotal = baseRate + gstTax;

  const handleQuickBookAndPay = (e) => {
    e.preventDefault();
    const createdBooking = addBooking({
      hallId: hall.id,
      hallName: hall.name,
      userName: organizerName,
      userEmail: user?.email || 'user@example.com',
      userPhone: user?.phone || '+91 98765 43210',
      eventType: 'Event Celebration',
      guestCount: Number(guestCount),
      durationPackage,
      startDate,
      endDate,
      startTime,
      endTime,
      totalAmount: grandTotal,
      paymentMethod
    });
    navigate(`/payment/${createdBooking.id}`);
  };

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-peach-200 pb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-peach-100 text-purple-900 border border-peach-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-peach-500" />
              <span>Elite Hall Signature Venue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-purple-950">{hall.name}</h1>
            <div className="flex items-center space-x-2 text-xs text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-peach-500 shrink-0" />
              <span>{hall.location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Per Day Rate</span>
              <span className="text-3xl font-black text-purple-950">{formatCurrency(hall.pricePerDay)}</span>
            </div>
            <a href="#quick-booking-card">
              <Button variant="primary" size="lg" icon={CreditCard}>
                Book &amp; Pay Now
              </Button>
            </a>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl overflow-hidden h-[400px] border-2 border-peach-200 shadow-md">
            <img
              src={activeImage}
              alt={hall.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800';
              }}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-4">
            {(hall.images || [hall.image]).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`rounded-2xl overflow-hidden h-28 border-2 transition-all ${
                  activeImage === img ? 'border-purple-600 ring-2 ring-purple-400' : 'border-peach-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Key Quick Info Highlight Bar: Name | Capacity | Date & Time | Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-peach-200 shadow-md">
          
          {/* 1. Name */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-peach-50/80 border border-peach-200">
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">1. Organizer Name</p>
              <p className="text-sm font-black text-purple-950 truncate">{organizerName}</p>
            </div>
          </div>

          {/* 2. Capacity */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-peach-50/80 border border-peach-200">
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">2. Guest Capacity</p>
              <p className="text-sm font-black text-purple-950">{guestCount} People</p>
            </div>
          </div>

          {/* 3. Date & Time */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-peach-50/80 border border-peach-200">
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">3. Date &amp; Time</p>
              <p className="text-xs font-black text-purple-950">{formatDate(startDate)}</p>
              <p className="text-[11px] font-bold text-purple-700">{startTime} - {endTime}</p>
            </div>
          </div>

          {/* 4. Payment */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-purple-900 text-white border border-purple-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-peach-500/20 text-peach-300 flex items-center justify-center font-bold border border-peach-500/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-peach-300">4. Payment ({paymentMethod})</p>
              <p className="text-sm font-black text-white">{formatCurrency(grandTotal)}</p>
            </div>
          </div>

        </div>

        {/* Main Details & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Overview Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-sm space-y-4">
              <h3 className="text-xl font-extrabold text-purple-950">Overview &amp; Architecture</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{hall.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-peach-100">
                <div className="p-3 rounded-2xl bg-peach-50 border border-peach-200 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Area</p>
                  <p className="text-sm font-black text-purple-950">{hall.specs?.areaSqFt || 5500} sq ft</p>
                </div>
                <div className="p-3 rounded-2xl bg-peach-50 border border-peach-200 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Guest Capacity</p>
                  <p className="text-sm font-black text-purple-950">{hall.capacity} People</p>
                </div>
                <div className="p-3 rounded-2xl bg-peach-50 border border-peach-200 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Parking Capacity</p>
                  <p className="text-sm font-black text-purple-950">{hall.specs?.parkingCapacity || 150} Cars</p>
                </div>
                <div className="p-3 rounded-2xl bg-peach-50 border border-peach-200 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Stage Dimensions</p>
                  <p className="text-sm font-black text-purple-950">{hall.specs?.stageDimensions || '30ft x 15ft'}</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <HallAmenities amenities={hall.amenities} />
          </div>

          {/* Right Interactive Booking Card: Name | Capacity | Date & Time | Payment */}
          <div id="quick-booking-card" className="space-y-6">
            <form onSubmit={handleQuickBookAndPay} className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-800 shadow-xl space-y-5">
              
              <div className="border-b border-purple-800/80 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-peach-300 font-bold">Instant Reservation</span>
                <h3 className="text-xl font-extrabold text-white">{hall.name}</h3>
              </div>

              {/* 1. Name Input */}
              <div>
                <label className="block text-xs font-bold text-peach-200 mb-1 flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-peach-400" />
                  <span>Organizer / Client Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-900/90 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-sm font-medium"
                />
              </div>

              {/* 2. Capacity Input */}
              <div>
                <label className="block text-xs font-bold text-peach-200 mb-1 flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-peach-400" />
                  <span>Attending Guest Capacity</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={hall.capacity}
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-900/90 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-sm font-bold"
                />
              </div>

              {/* Duration / Package Selection */}
              <div>
                <label className="block text-xs font-bold text-peach-200 mb-1.5 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-peach-400" />
                  <span>Select Booking Duration</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { label: '6 Hours', key: '6 Hours' },
                    { label: 'Half Day', key: 'Half Day' },
                    { label: '1 Day', key: '1 Day' },
                    { label: '2 Days', key: '2 Days' },
                    { label: '3 Days', key: '3 Days' },
                  ].map((pkg) => (
                    <button
                      key={pkg.key}
                      type="button"
                      onClick={() => handleDurationPackageChange(pkg.key)}
                      className={`py-2 px-1 rounded-xl text-[11px] font-extrabold border transition-all text-center ${
                        durationPackage === pkg.key
                          ? 'bg-peach-500 text-purple-950 border-peach-400 shadow-md scale-105 font-black'
                          : 'bg-purple-900/60 text-purple-200 border-purple-700 hover:bg-purple-800 hover:text-white'
                      }`}
                    >
                      {pkg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Event Date Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-peach-200 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-peach-400" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => {
                      const newStart = e.target.value;
                      setStartDate(newStart);
                      handleDurationPackageChange(durationPackage, newStart);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/90 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-peach-200 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-peach-400" />
                    <span>End Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/90 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-xs font-medium"
                  />
                </div>
              </div>

              {/* 4. Event Time Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-peach-200 mb-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-peach-400" />
                    <span>Start Time</span>
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/90 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-xs font-medium"
                  >
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-peach-200 mb-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-peach-400" />
                    <span>End Time</span>
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/90 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-xs font-medium"
                  >
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                    <option value="11:59 PM">11:59 PM</option>
                  </select>
                </div>
              </div>

              {/* 5. Payment Method Selector (UPI / Credit Card / Cash on Venue) */}
              <div>
                <label className="block text-xs font-bold text-peach-200 mb-2 flex items-center space-x-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-peach-400" />
                  <span>Payment Method</span>
                </label>
                <div className="grid grid-cols-3 gap-2">

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit Card')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'Credit Card'
                        ? 'bg-peach-500 text-purple-950 border-peach-400 shadow-md font-extrabold'
                        : 'bg-purple-900/60 text-purple-200 border-purple-700 hover:bg-purple-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Net Banking')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'Net Banking'
                        ? 'bg-peach-500 text-purple-950 border-peach-400 shadow-md font-extrabold'
                        : 'bg-purple-900/60 text-purple-200 border-purple-700 hover:bg-purple-800'
                    }`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-peach-500 text-purple-950 border-peach-400 shadow-md font-extrabold'
                        : 'bg-purple-900/60 text-purple-200 border-purple-700 hover:bg-purple-800'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI</span>
                  </button>
                </div>
              </div>

              {/* 6. Payment Calculation & Breakdown */}
              <div className="bg-purple-900/80 rounded-2xl p-4 border border-purple-700 space-y-2 text-xs">
                <div className="flex justify-between text-purple-200">
                  <span>Venue Rate ({durationPackage} package)</span>
                  <span className="font-bold text-white">{formatCurrency(baseRate)}</span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span>GST Tax &amp; Service Fee (18%)</span>
                  <span className="font-bold text-white">{formatCurrency(gstTax)}</span>
                </div>
                <div className="pt-2 border-t border-purple-700 flex justify-between items-center">
                  <span className="text-peach-300 font-extrabold text-xs">Total ({paymentMethod})</span>
                  <span className="text-2xl font-black text-white">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <Button type="submit" variant="accent" fullWidth size="lg" icon={CreditCard}>
                Proceed to Pay ({formatCurrency(grandTotal)})
              </Button>

              <div className="flex items-center space-x-2 text-[11px] text-purple-300 text-center justify-center pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Confirmation &amp; 100% Refund Guarantee</span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </UserLayout>
  );
};

export default HallDetails;
