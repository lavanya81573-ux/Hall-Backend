import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import HallTable from '../../../components/admin/HallTable';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import { useBookingContext } from '../../../context/BookingContext';
import Button from '../../../components/common/Button';
import { Plus, Building2 } from 'lucide-react';

const HallList = () => {
  const { halls, deleteHall } = useBookingContext();
  const navigate = useNavigate();
  const [selectedHallId, setSelectedHallId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedHallId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedHallId) {
      deleteHall(selectedHallId);
    }
    setConfirmOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-purple-950">Elite Hall Management</h1>
            <p className="text-xs text-slate-500">Manage venue details, capacities, daily rates, and status</p>
          </div>
          <Button variant="accent" icon={Plus} onClick={() => navigate('/admin/halls/add')}>
            Add New Elite Hall
          </Button>
        </div>

        <HallTable
          halls={halls}
          onEdit={(hall) => navigate(`/admin/halls/edit/${hall.id}`)}
          onDelete={handleDeleteClick}
        />

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Hall Venue"
          message="Are you sure you want to remove this Elite Hall venue? Active bookings associated with it will remain intact."
        />
      </div>
    </AdminLayout>
  );
};

export default HallList;
