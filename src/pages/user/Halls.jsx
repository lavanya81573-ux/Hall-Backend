import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import HallCard from '../../components/hall/HallCard';
import HallSearch from '../../components/hall/HallSearch';
import { useHalls } from '../../hooks/useHalls';
import Pagination from '../../components/common/Pagination';
import { HALL_CATEGORIES } from '../../utils/constants';

const Halls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || '';

  const { halls } = useHalls();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minCapacity, setMinCapacity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter halls logic including 12 categories
  const filteredHalls = halls.filter(hall => {
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch = hall.name.toLowerCase().includes(q) || hall.location.toLowerCase().includes(q) || hall.description.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (selectedCategory) {
      const matchesCat = hall.name.toLowerCase().includes(selectedCategory.toLowerCase()) || hall.category?.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchesCat) return false;
    }

    if (maxPrice && hall.pricePerDay > maxPrice) return false;
    if (minCapacity && hall.capacity < minCapacity) return false;

    return true;
  });

  const pageSize = 6;
  const totalPages = Math.ceil(filteredHalls.length / pageSize) || 1;
  const paginatedHalls = filteredHalls.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCategorySelect = (catTitle) => {
    setSelectedCategory(catTitle);
    setCurrentPage(1);
    if (catTitle) {
      setSearchParams({ category: catTitle });
    } else {
      setSearchParams({});
    }
  };

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">
            Explore 12 Event Categories
          </span>
          <h1 className="text-3xl font-black text-purple-950">Elite Hall Locations &amp; Suites</h1>
          <p className="text-xs sm:text-sm text-purple-900/70 mt-1">
            Browse our specialized venue suites for weddings, receptions, baby showers, corporate events, and celebrations.
          </p>
        </div>

        {/* Category Pill Buttons Horizontal Scroll */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              !selectedCategory
                ? 'bg-purple-900 text-white shadow-md'
                : 'bg-peach-100 text-purple-900 hover:bg-peach-200 border border-peach-300'
            }`}
          >
            All 12 Categories
          </button>
          {HALL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.title)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.title.toLowerCase()
                  ? 'bg-purple-900 text-white shadow-md ring-2 ring-purple-600'
                  : 'bg-peach-100 text-purple-900 hover:bg-peach-200 border border-peach-300'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Search Bar Header */}
        <HallSearch
          search={search}
          setSearch={setSearch}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minCapacity={minCapacity}
          setMinCapacity={setMinCapacity}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategorySelect}
        />

        {/* Halls Grid */}
        {paginatedHalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-peach-200 shadow-sm my-8">
            <h3 className="text-lg font-bold text-purple-950">No Elite Hall Venues Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting another category or adjusting your search filters.</p>
            <button
              onClick={() => handleCategorySelect('')}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-900 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </UserLayout>
  );
};

export default Halls;
