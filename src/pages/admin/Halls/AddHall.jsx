import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import Button from '../../../components/common/Button';
import { Building2, ArrowLeft } from 'lucide-react';

const AddHall = () => {
  const navigate = useNavigate();
  const { addHall } = useBookingContext();

  const [formData, setFormData] = useState({
    name: '',
    capacity: 500,
    pricePerDay: 20000,
    pricePerHour: 2500,
    location: '',
    description: '',
    image: '/images/halls/hall-1.jpg',
    status: 'Available'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHall(formData);
    navigate('/admin/halls');
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate('/admin/halls')} className="inline-flex items-center space-x-2 text-xs font-bold text-purple-700 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Halls List</span>
        </button>

        <div className="bg-white rounded-3xl p-8 border border-peach-200 shadow-xl space-y-6">
          <div>
            <h1 className="text-2xl font-black text-purple-950">Add New Elite Hall Venue</h1>
            <p className="text-xs text-slate-500">Hall names will automatically inherit the 'Elite Hall' prefix.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Venue Suite Name (e.g. Grand Ballroom, Executive Suite)
              </label>
              <input
                type="text"
                required
                placeholder="Grand Ballroom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Guest Capacity
                </label>
                <input
                  type="number"
                  required
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Price Per Day (₹)
                </label>
                <input
                  type="number"
                  required
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location Address
              </label>
              <input
                type="text"
                required
                placeholder="Tower A, 5th Floor, Main Avenue"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={3}
                required
                placeholder="Luxury hall with AC, chandeliers, and stage setup..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <Button type="submit" variant="accent" fullWidth size="lg">
              Save New Elite Hall
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddHall;
