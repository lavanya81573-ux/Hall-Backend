import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import Button from '../../../components/common/Button';
import { Plus } from 'lucide-react';

const PricingRules = () => {
  const { pricingRules } = useBookingContext();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-purple-950">Dynamic Pricing Rules</h1>
            <p className="text-xs text-slate-500">Configure seasonal surges, weekend discounts, and early bird rules</p>
          </div>
          <Button variant="accent" icon={Plus}>Add Pricing Rule</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingRules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-bold text-peach-600 bg-peach-100 px-2.5 py-1 rounded-full border border-peach-300">
                {rule.status}
              </span>
              <h3 className="text-lg font-extrabold text-purple-950">{rule.name}</h3>
              <p className="text-2xl font-black text-purple-950">{rule.discountOrSurge}</p>
              <p className="text-xs text-slate-500">Applies to: {rule.appliesTo}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PricingRules;
