import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import Button from '../../../components/common/Button';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const CancellationPolicy = () => {
  const { cancellationPolicy, setCancellationPolicy } = useBookingContext();
  const [formData, setFormData] = useState({ ...cancellationPolicy });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCancellationPolicy(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Cancellation &amp; Refund Policy</h1>
          <p className="text-xs text-slate-500">Configure cutoff timelines and terms for refund eligibility</p>
        </div>

        {saved && (
          <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-2 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Policy terms saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-peach-200 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Refund Cutoff (Days)
              </label>
              <input
                type="number"
                value={formData.fullRefundDays}
                onChange={(e) => setFormData({ ...formData, fullRefundDays: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-peach-300 text-sm font-bold text-purple-950"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Partial Refund Percentage (%)
              </label>
              <input
                type="number"
                value={formData.partialRefundPercent}
                onChange={(e) => setFormData({ ...formData, partialRefundPercent: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-peach-300 text-sm font-bold text-purple-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Public Policy Terms &amp; Conditions Statement
            </label>
            <textarea
              rows={4}
              value={formData.policyTerms}
              onChange={(e) => setFormData({ ...formData, policyTerms: e.target.value })}
              className="w-full p-3 rounded-xl border border-peach-300 text-sm text-purple-950"
            />
          </div>

          <Button type="submit" variant="primary" size="md">
            Save Policy Terms
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CancellationPolicy;
