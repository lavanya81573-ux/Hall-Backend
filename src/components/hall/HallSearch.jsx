import React from 'react';
import { Search, Filter, Users, DollarSign, Layers } from 'lucide-react';
import { HALL_CATEGORIES } from '../../utils/constants';

const HallSearch = ({
  search,
  setSearch,
  maxPrice,
  setMaxPrice,
  minCapacity,
  setMinCapacity,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Search Keyword */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3 text-purple-500" />
            <input
              type="text"
              placeholder="Hall name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/40 text-purple-950 font-medium"
            />
          </div>
        </div>

        {/* Category Dropdown (12 Categories) */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2">
            Hall Category
          </label>
          <div className="relative">
            <Layers className="w-5 h-5 absolute left-3.5 top-3 text-purple-500" />
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory && setSelectedCategory(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/40 text-purple-950 font-semibold"
            >
              <option value="">All 12 Categories</option>
              {HALL_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Min Capacity */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2">
            Min Capacity
          </label>
          <div className="relative">
            <Users className="w-5 h-5 absolute left-3.5 top-3 text-purple-500" />
            <select
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/40 text-purple-950 font-semibold"
            >
              <option value={0}>Any Capacity</option>
              <option value={200}>200+ Guests</option>
              <option value={500}>500+ Guests</option>
              <option value={800}>800+ Guests</option>
            </select>
          </div>
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-2">
            Max Rate / Day
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3.5 top-3 text-peach-500" />
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-peach-50/40 text-purple-950 font-semibold"
            >
              <option value={100000}>All Prices</option>
              <option value={18000}>Up to ₹18,000</option>
              <option value={25000}>Up to ₹25,000</option>
              <option value={35000}>Up to ₹35,000</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HallSearch;
