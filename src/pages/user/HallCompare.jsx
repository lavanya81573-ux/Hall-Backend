import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { useHalls } from '../../hooks/useHalls';
import { useCompare } from '../../context/CompareContext';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Scale,
  Users,
  DollarSign,
  Star,
  MapPin,
  Car,
  Wind,
  Utensils,
  Palette,
  Check,
  X,
  Plus,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2
} from 'lucide-react';

const HallCompare = () => {
  const { halls, getHallById } = useHalls();
  const { selectedHallIds, removeHallFromCompare, toggleCompareHall, clearCompare } = useCompare();
  const navigate = useNavigate();

  // If user hasn't selected 4 halls, let them pick from dropdown or pre-fill default halls
  const comparisonHalls = selectedHallIds.length > 0
    ? selectedHallIds.map(id => getHallById(id)).filter(Boolean)
    : halls.slice(0, 3); // Default to first 3 halls for immediate demo display

  const handleAddHallSelect = (e) => {
    const hallId = e.target.value;
    if (hallId) {
      toggleCompareHall(hallId);
      e.target.value = '';
    }
  };

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-peach-200 pb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-peach-100 text-purple-900 border border-peach-300 text-xs font-bold mb-2">
              <Scale className="w-3.5 h-3.5 text-peach-500" />
              <span>Side-by-Side Comparison Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-purple-950">
              Compare Elite Hall Venues
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare capacity, rates, parking, catering options, decor, and total cost estimates for up to 4 halls.
            </p>
          </div>

          {/* Quick Selector Dropdown */}
          <div className="flex items-center space-x-3">
            <select
              onChange={handleAddHallSelect}
              defaultValue=""
              className="px-3.5 py-2.5 rounded-xl border border-peach-300 bg-white text-xs font-bold text-purple-950 focus:ring-2 focus:ring-purple-600 shadow-sm"
            >
              <option value="" disabled>+ Add Hall to Compare</option>
              {halls.map(h => (
                <option key={h.id} value={h.id} disabled={selectedHallIds.includes(h.id)}>
                  {h.name} ({formatCurrency(h.pricePerDay)})
                </option>
              ))}
            </select>

            {selectedHallIds.length > 0 && (
              <Button variant="secondary" size="md" onClick={clearCompare}>
                Reset Selection
              </Button>
            )}
          </div>
        </div>

        {/* Main Comparison Table Card */}
        {comparisonHalls.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-3xl border border-peach-200 shadow-xl">
            <table className="w-full text-left border-collapse min-w-[800px]">
              
              {/* Table Header: Hall Cards */}
              <thead>
                <tr className="border-b border-peach-200 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 text-white">
                  <th className="p-6 w-56 font-black text-sm uppercase tracking-wider text-peach-300 align-top">
                    <div className="space-y-2">
                      <Scale className="w-8 h-8 text-peach-400" />
                      <span>Comparing {comparisonHalls.length} Venues</span>
                    </div>
                  </th>

                  {comparisonHalls.map((hall) => (
                    <th key={hall.id} className="p-6 w-72 align-top relative border-l border-purple-800">
                      {selectedHallIds.includes(hall.id) && (
                        <button
                          onClick={() => removeHallFromCompare(hall.id)}
                          className="absolute top-4 right-4 p-1 rounded-full bg-purple-900 text-purple-200 hover:text-white hover:bg-purple-800"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      <div className="space-y-3">
                        <img
                          src={hall.image}
                          alt={hall.name}
                          className="w-full h-36 rounded-2xl object-cover border border-purple-700 shadow-md"
                        />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-peach-300">{hall.category}</span>
                          <h3 className="text-base font-extrabold text-white line-clamp-1">{hall.name}</h3>
                          <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{hall.rating || 4.9}</span>
                            <span className="text-purple-300 text-[10px] font-normal">({hall.reviewsCount || 85} reviews)</span>
                          </div>
                        </div>

                        <button
                          onClick={() => navigate(`/halls/${hall.id}`)}
                          className="w-full py-2 px-3 rounded-xl bg-peach-500 text-purple-950 font-black text-xs hover:bg-peach-400 shadow-md transition-all flex items-center justify-center space-x-1"
                        >
                          <span>Book Venue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body: Side-by-Side Specs */}
              <tbody className="divide-y divide-peach-100 text-xs">
                
                {/* 1. Daily Price Rate */}
                <tr className="bg-peach-50/40">
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Daily Rental Rate</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-black text-purple-950 text-base border-l border-peach-100">
                      {formatCurrency(hall.pricePerDay)}
                    </td>
                  ))}
                </tr>

                {/* 2. Estimated Total Cost (incl 18% GST) */}
                <tr>
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-peach-500" />
                    <span>Est. Total (1 Day + 18% GST)</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-black text-purple-950 border-l border-peach-100">
                      {formatCurrency(Math.round(hall.pricePerDay * 1.18))}
                    </td>
                  ))}
                </tr>

                {/* 3. Guest Capacity */}
                <tr className="bg-peach-50/40">
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-700" />
                    <span>Guest Capacity</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-bold text-slate-800 border-l border-peach-100">
                      Up to {hall.capacity} Attending Guests
                    </td>
                  ))}
                </tr>

                {/* 4. Location */}
                <tr>
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-peach-500" />
                    <span>Location Region</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-semibold text-slate-700 border-l border-peach-100">
                      {hall.location}
                    </td>
                  ))}
                </tr>

                {/* 5. Parking Capacity */}
                <tr className="bg-peach-50/40">
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Car className="w-4 h-4 text-purple-700" />
                    <span>Parking &amp; Valet</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-semibold text-slate-700 border-l border-peach-100">
                      {hall.specs?.parkingCapacity || 150} Cars + VIP Valet
                    </td>
                  ))}
                </tr>

                {/* 6. Air Conditioning (AC) */}
                <tr>
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-cyan-600" />
                    <span>Air Conditioning (AC)</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-bold text-emerald-700 border-l border-peach-100">
                      <span className="inline-flex items-center space-x-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Centralized HVAC AC</span>
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 7. Catering Policy */}
                <tr className="bg-peach-50/40">
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Utensils className="w-4 h-4 text-purple-700" />
                    <span>Catering Arrangement</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-semibold text-slate-700 border-l border-peach-100">
                      In-House Gourmet &amp; External Allowed
                    </td>
                  ))}
                </tr>

                {/* 8. Decoration & Stage */}
                <tr>
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-purple-700" />
                    <span>Stage &amp; Decoration</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 font-semibold text-slate-700 border-l border-peach-100">
                      {hall.specs?.stageDimensions || '30ft x 15ft'} Stage + LED Backdrop
                    </td>
                  ))}
                </tr>

                {/* 9. Amenities */}
                <tr className="bg-peach-50/40">
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-purple-700" />
                    <span>Included Amenities</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 text-slate-700 border-l border-peach-100 space-y-1">
                      {(hall.amenities || ['AC', 'Stage Setup', 'Sound System', 'Generator Backup']).map((am, i) => (
                        <div key={i} className="flex items-center space-x-1.5 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* 10. Real-time Availability */}
                <tr>
                  <td className="p-4 font-extrabold text-purple-950 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Availability Status</span>
                  </td>
                  {comparisonHalls.map((hall) => (
                    <td key={hall.id} className="p-4 border-l border-peach-100">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 inline-flex items-center gap-1">
                        <Check className="w-3 h-3" /> Available for Booking
                      </span>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-peach-200 text-center space-y-4">
            <Scale className="w-12 h-12 text-peach-500 mx-auto" />
            <h3 className="text-xl font-extrabold text-purple-950">No Halls Selected for Comparison</h3>
            <p className="text-xs text-slate-500">Use the dropdown above or browse halls to add up to 4 venues side-by-side.</p>
            <Link to="/halls">
              <Button variant="primary" size="md">Browse Venues List</Button>
            </Link>
          </div>
        )}

      </div>
    </UserLayout>
  );
};

export default HallCompare;
