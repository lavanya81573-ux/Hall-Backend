import React from 'react';
import {
  Wifi,
  Wind,
  Tv,
  Car,
  Utensils,
  Music,
  Zap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const amenityIcons = {
  'Central Air Conditioning': Wind,
  'High-Speed Wi-Fi': Wifi,
  'HD Projectors & Sound System': Tv,
  'Smart Conference System': Tv,
  'Valet Parking': Car,
  'In-house Catering': Utensils,
  'DJ Sound System': Music,
  'Full Generator Backup': Zap,
};

const HallAmenities = ({ amenities = [] }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm">
      <h3 className="text-lg font-extrabold text-purple-950 mb-4 flex items-center space-x-2">
        <ShieldCheck className="w-5 h-5 text-peach-500" />
        <span>Premium Amenities &amp; Services</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {amenities.map((item, index) => {
          const IconComp = amenityIcons[item] || CheckCircle2;
          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-peach-50/70 border border-peach-200/70 hover:bg-peach-100/70 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                <IconComp className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-purple-950">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HallAmenities;
