import React, { useState } from 'react';
import { validateBookingForm } from '../../utils/validation';
import Button from '../common/Button';
import { Calendar, Users, PartyPopper, User, Mail, Phone, FileText, Clock, CreditCard, Landmark, QrCode } from 'lucide-react';

const BookingForm = ({ hall, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    hallId: hall?.id || '',
    durationPackage: initialData.durationPackage || '1 Day',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    startTime: initialData.startTime || '09:00 AM',
    endTime: initialData.endTime || '10:00 PM',
    paymentMethod: initialData.paymentMethod || 'Credit Card',
    guestCount: initialData.guestCount || 200,
    eventType: initialData.eventType || 'Wedding Reception',
    contactName: initialData.contactName || '',
    contactEmail: initialData.contactEmail || '',
    contactPhone: initialData.contactPhone || '',
    specialNotes: initialData.specialNotes || ''
  });

  const [errors, setErrors] = useState({});

  const addDaysToDateStr = (dateStr, daysToAdd) => {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    const d = new Date(dateStr);
    d.setDate(d.getDate() + daysToAdd);
    return d.toISOString().split('T')[0];
  };

  const handleDurationSelect = (pkg) => {
    const start = formData.startDate || new Date().toISOString().split('T')[0];
    let end = start;
    let sTime = '09:00 AM';
    let eTime = '10:00 PM';

    if (pkg === '6 Hours') {
      end = start;
      sTime = '09:00 AM';
      eTime = '03:00 PM';
    } else if (pkg === 'Half Day') {
      end = start;
      sTime = '09:00 AM';
      eTime = '03:00 PM';
    } else if (pkg === '1 Day') {
      end = start;
      sTime = '09:00 AM';
      eTime = '10:00 PM';
    } else if (pkg === '2 Days') {
      end = addDaysToDateStr(start, 1);
      sTime = '09:00 AM';
      eTime = '10:00 PM';
    } else if (pkg === '3 Days') {
      end = addDaysToDateStr(start, 2);
      sTime = '09:00 AM';
      eTime = '10:00 PM';
    }

    setFormData(prev => ({
      ...prev,
      durationPackage: pkg,
      startDate: start,
      endDate: end,
      startTime: sTime,
      endTime: eTime
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-xl space-y-6">
      <div className="border-b border-peach-100 pb-4">
        <h3 className="text-xl font-extrabold text-purple-950">Event &amp; Reservation Details</h3>
        <p className="text-xs text-slate-500">Fill out your preferred event dates, time slot, and payment option for {hall?.name || 'Elite Hall'}</p>
      </div>

      {/* Duration Package selector */}
      <div>
        <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <Clock className="w-4 h-4 text-purple-600" />
          <span>Select Booking Duration / Package</span>
        </label>
        <div className="grid grid-cols-5 gap-2">
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
              onClick={() => handleDurationSelect(pkg.key)}
              className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all text-center ${
                formData.durationPackage === pkg.key
                  ? 'bg-purple-950 text-peach-300 border-purple-900 shadow-md font-black'
                  : 'bg-peach-50/60 text-purple-950 border-peach-200 hover:bg-peach-100'
              }`}
            >
              {pkg.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Start Date */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Event Start Date</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.startDate ? 'border-rose-500' : 'border-peach-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/30 text-purple-950 font-medium`}
          />
          {errors.startDate && <p className="text-xs text-rose-500 mt-1">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Event End Date</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            min={formData.startDate || new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.endDate ? 'border-rose-500' : 'border-peach-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/30 text-purple-950 font-medium`}
          />
          {errors.endDate && <p className="text-xs text-rose-500 mt-1">{errors.endDate}</p>}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>Start Time</span>
          </label>
          <select
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/30 text-purple-950 font-semibold"
          >
            <option value="06:00 AM">06:00 AM</option>
            <option value="07:00 AM">07:00 AM</option>
            <option value="08:00 AM">08:00 AM</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
            <option value="08:00 PM">08:00 PM</option>
            <option value="09:00 PM">09:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
            <option value="11:00 PM">11:00 PM</option>
          </select>
        </div>

        {/* End Time */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>End Time</span>
          </label>
          <select
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/30 text-purple-950 font-semibold"
          >
            <option value="06:00 AM">06:00 AM</option>
            <option value="07:00 AM">07:00 AM</option>
            <option value="08:00 AM">08:00 AM</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
            <option value="08:00 PM">08:00 PM</option>
            <option value="09:00 PM">09:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
            <option value="11:00 PM">11:00 PM</option>
            <option value="11:59 PM">11:59 PM</option>
          </select>
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-peach-500" />
            <span>Estimated Guest Count</span>
          </label>
          <input
            type="number"
            name="guestCount"
            max={hall?.capacity || 2000}
            min={1}
            value={formData.guestCount}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.guestCount ? 'border-rose-500' : 'border-peach-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/30 text-purple-950 font-semibold`}
          />
          {errors.guestCount && <p className="text-xs text-rose-500 mt-1">{errors.guestCount}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <PartyPopper className="w-4 h-4 text-peach-500" />
            <span>Type of Event</span>
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/30 text-purple-950 font-semibold"
          >
            <option value="Wedding Reception">Wedding Reception</option>
            <option value="Corporate Conference">Corporate Conference</option>
            <option value="Birthday Gala">Birthday Gala</option>
            <option value="Exhibition / Expo">Exhibition / Expo</option>
            <option value="Social Gathering">Social Gathering</option>
          </select>
        </div>

        {/* Payment Method Selector */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <CreditCard className="w-4 h-4 text-purple-600" />
            <span>Payment Method</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Credit Card' }))}
              className={`p-3 rounded-2xl border text-xs font-extrabold flex items-center justify-center space-x-2 transition-all ${
                formData.paymentMethod === 'Credit Card'
                  ? 'bg-purple-950 text-peach-300 border-purple-900 shadow-md'
                  : 'bg-peach-50/60 text-purple-950 border-peach-200 hover:bg-peach-100'
              }`}
            >
              <CreditCard className="w-4 h-4 text-peach-400" />
              <span>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Net Banking' }))}
              className={`p-3 rounded-2xl border text-xs font-extrabold flex items-center justify-center space-x-2 transition-all ${
                formData.paymentMethod === 'Net Banking'
                  ? 'bg-purple-950 text-peach-300 border-purple-900 shadow-md'
                  : 'bg-peach-50/60 text-purple-950 border-peach-200 hover:bg-peach-100'
              }`}
            >
              <Landmark className="w-4 h-4 text-peach-400" />
              <span>Net Banking</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'UPI' }))}
              className={`p-3 rounded-2xl border text-xs font-extrabold flex items-center justify-center space-x-2 transition-all ${
                formData.paymentMethod === 'UPI'
                  ? 'bg-purple-950 text-peach-300 border-purple-900 shadow-md'
                  : 'bg-peach-50/60 text-purple-950 border-peach-200 hover:bg-peach-100'
              }`}
            >
              <QrCode className="w-4 h-4 text-peach-400" />
              <span>UPI</span>
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-peach-100 pt-6">
        <h4 className="text-sm font-extrabold text-purple-950 mb-4">Contact &amp; Organizer Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-purple-500" />
              <input
                type="text"
                name="contactName"
                placeholder="Organizer Name"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>
            {errors.contactName && <p className="text-xs text-rose-500 mt-1">{errors.contactName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-purple-500" />
              <input
                type="email"
                name="contactEmail"
                placeholder="email@example.com"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>
            {errors.contactEmail && <p className="text-xs text-rose-500 mt-1">{errors.contactEmail}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-purple-500" />
              <input
                type="text"
                name="contactPhone"
                placeholder="+91 98765 43210"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>
            {errors.contactPhone && <p className="text-xs text-rose-500 mt-1">{errors.contactPhone}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Special Requirements &amp; Lighting Notes</label>
        <textarea
          name="specialNotes"
          rows={3}
          placeholder="Mention catering needs, stage flower setup, ambient purple lighting requests, generator backup, etc."
          value={formData.specialNotes}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <Button type="submit" variant="primary" fullWidth size="lg">
        Proceed to Review &amp; Payment
      </Button>
    </form>
  );
};

export default BookingForm;
