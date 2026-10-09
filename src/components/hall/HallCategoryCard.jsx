import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { Users, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import Button from '../common/Button';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800';

const HallCategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-peach-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
      
      {/* Category Image Section */}
      <div className="relative h-56 overflow-hidden bg-purple-950">
        <img
          src={category.image}
          alt={category.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent"></div>

        {/* Tag Badge */}
        <div className="absolute top-3 left-3 bg-purple-900/85 backdrop-blur-md text-peach-200 text-[11px] font-bold px-3 py-1 rounded-full border border-purple-700/60 flex items-center space-x-1 shadow-md">
          <Tag className="w-3 h-3 text-peach-400" />
          <span>{category.tag}</span>
        </div>

        {/* Capacity Floating Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-purple-950 text-xs font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
          <Users className="w-3.5 h-3.5 text-purple-700" />
          <span>{category.capacity}</span>
        </div>
      </div>

      {/* Hall Name & Content Section (Clearly visible below image) */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-peach-50/40">
        <div>
          {/* Hall Name clearly visible below image */}
          <h3 className="text-xl font-black text-purple-950 mb-2 group-hover:text-purple-700 transition-colors">
            Elite Hall - {category.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {category.description}
          </p>

          {/* Pricing Info */}
          <div className="flex items-center justify-between py-2.5 px-3.5 bg-peach-100/70 rounded-2xl border border-peach-200 text-xs font-bold text-purple-950 mb-5">
            <span className="text-slate-500 font-semibold">Starting Rate</span>
            <span className="text-base font-black text-purple-950">{formatCurrency(category.priceStarting)} / day</span>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/halls?category=${encodeURIComponent(category.title)}`}>
          <Button variant="primary" fullWidth size="md" icon={ArrowRight}>
            Explore {category.title}
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default HallCategoryCard;
