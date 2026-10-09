import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { MapPin, Users, Star, ArrowRight, ShieldCheck, Scale, Check } from 'lucide-react';
import Button from '../common/Button';
import { useCompare } from '../../context/CompareContext';

const HallCard = ({ hall }) => {
  const { selectedHallIds, toggleCompareHall } = useCompare();
  const isCompared = selectedHallIds.includes(hall.id);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-peach-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden bg-purple-950">
        <img
          src={hall.image}
          alt={hall.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent"></div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-purple-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-purple-700/60 flex items-center space-x-1.5 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-peach-400" />
          <span>Elite Hall Signature</span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-purple-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{hall.rating || 4.9}</span>
          <span className="text-slate-400 font-normal">({hall.reviewsCount || 100})</span>
        </div>

        {/* Price Floating Tag */}
        <div className="absolute bottom-4 left-4 text-white">
          <span className="text-xs text-peach-300 font-semibold block uppercase tracking-wider">Per Day Rate</span>
          <span className="text-2xl font-black drop-shadow-sm">{formatCurrency(hall.pricePerDay)}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-peach-50/40">
        <div>
          <h3 className="text-xl font-extrabold text-purple-950 mb-2 group-hover:text-purple-700 transition-colors">
            {hall.name}
          </h3>

          <div className="flex items-center space-x-2 text-xs text-slate-600 mb-3">
            <MapPin className="w-4 h-4 text-peach-500 shrink-0" />
            <span className="truncate font-medium">{hall.location}</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {hall.description}
          </p>

          {/* Quick Specs */}
          <div className="flex items-center gap-4 py-3 px-3 bg-peach-100/70 rounded-2xl border border-peach-200 text-xs font-bold text-purple-900 mb-5">
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-purple-700" />
              <span>Up to {hall.capacity} Guests</span>
            </div>
            <div className="text-peach-300">•</div>
            <div className="text-slate-600 font-semibold">AC Banquet</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-2">
          <button
            type="button"
            onClick={() => toggleCompareHall(hall.id)}
            className={`p-2.5 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${
              isCompared
                ? 'bg-purple-900 text-peach-300 border-purple-800 shadow-sm'
                : 'bg-peach-50 text-purple-950 border-peach-300 hover:bg-peach-100'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            {isCompared ? <Check className="w-4 h-4 text-peach-400" /> : <Scale className="w-4 h-4" />}
          </button>

          <Link to={`/halls/${hall.id}`} className="flex-1">
            <Button variant="primary" fullWidth size="md" icon={ArrowRight}>
              Explore &amp; Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HallCard;
