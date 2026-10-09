import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import RevenueChart from '../../components/admin/RevenueChart';
import BookingTable from '../../components/admin/BookingTable';
import { useBookingContext } from '../../context/BookingContext';
import { ADMIN_NAME } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CalendarCheck,
  DollarSign,
  Users,
  Sparkles,
  TrendingUp,
  Plus
} from 'lucide-react';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const { bookings, halls, updateBookingStatus } = useBookingContext();
  const navigate = useNavigate();

  const totalRevenue = bookings.reduce((sum, b) => (b.paymentStatus === 'Paid' ? sum + b.totalAmount : sum), 0);
  const pendingApprovals = bookings.filter(b => b.status === 'Pending').length;

  const chartData = [
    { month: 'May', revenue: 180000, bookings: 7 },
    { month: 'Jun', revenue: 250000, bookings: 10 },
    { month: 'Jul', revenue: 210000, bookings: 8 },
    { month: 'Aug', revenue: 320000, bookings: 12 },
    { month: 'Sep', revenue: 390000, bookings: 15 },
    { month: 'Oct', revenue: 450000, bookings: 18 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Welcome Greeting Banner for Admin Lavanya */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-purple-800">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-peach-500/20 text-peach-300 text-xs font-bold border border-peach-500/30">
              <Sparkles className="w-4 h-4" />
              <span>Admin Management Dashboard</span>
            </div>
            <h1 className="text-3xl font-black">Welcome back, {ADMIN_NAME}! 👋</h1>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl">
              Here is your overall operational overview for Elite Hall venues. Manage reservations, approve pending requests, and track revenue metrics.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button variant="accent" size="sm" icon={Plus} onClick={() => navigate('/admin/halls/add')}>
                Add New Hall
              </Button>
              <Button variant="outline" size="sm" className="text-white border-purple-400 hover:bg-purple-800" onClick={() => navigate('/admin/bookings')}>
                Review Pending ({pendingApprovals})
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString('en-IN')}`}
            change="18.4%"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Active Elite Halls"
            value={halls.length}
            change="3 Venues"
            changeType="positive"
            icon={Building2}
          />
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            change="12%"
            changeType="positive"
            icon={CalendarCheck}
          />
          <StatCard
            title="Pending Approval"
            value={pendingApprovals}
            change="Needs Action"
            changeType="negative"
            icon={Users}
          />
        </div>

        {/* Revenue Growth Chart */}
        <RevenueChart data={chartData} />

        {/* Recent Bookings Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-purple-950">Recent Hall Reservations</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/bookings')}>
              View All Bookings
            </Button>
          </div>

          <BookingTable
            bookings={bookings.slice(0, 5)}
            onApprove={(id) => updateBookingStatus(id, 'Approved')}
            onReject={(id) => updateBookingStatus(id, 'Rejected')}
            onViewDetails={(booking) => navigate(`/admin/bookings/${booking.id}`)}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
