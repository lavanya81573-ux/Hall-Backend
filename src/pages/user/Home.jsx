import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import HallCard from '../../components/hall/HallCard';
import HallCategoryCard from '../../components/hall/HallCategoryCard';
import { useHalls } from '../../hooks/useHalls';
import Button from '../../components/common/Button';
import { HALL_CATEGORIES } from '../../utils/constants';
import { Sparkles, Shield, Star, ArrowRight, Award, Clock, Layers } from 'lucide-react';

const Home = () => {
  const { halls } = useHalls();
  const featuredHalls = halls.slice(0, 3);

  return (
    <UserLayout>
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-peach-100 via-peach-50 to-[#FFF9F5] pt-12 pb-20 border-b border-peach-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-900/10 text-purple-900 border border-purple-200 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-peach-500" />
                <span>Premier Banquet &amp; Convention Spaces</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-purple-950 leading-tight tracking-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-peach-500 font-serif italic">Elite Hall</span>
              </h1>

              <p className="text-base sm:text-lg text-purple-900/80 leading-relaxed max-w-xl">
                Host marriages, baby showers, corporate summits, birthday galas, and milestone receptions at Elite Hall. Managed with excellence by our dedicated venue team.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/halls">
                  <Button variant="primary" size="lg" icon={ArrowRight}>
                    Explore All 12 Hall Categories
                  </Button>
                </Link>
                <Link to="/my-bookings">
                  <Button variant="secondary" size="lg">
                    Check My Bookings
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image / Banner Showcase */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-peach-300">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
                  alt="Elite Hall Marriage Hall"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-bold text-peach-300 uppercase tracking-widest">Featured Hall Category</span>
                    <h3 className="text-2xl font-black">Elite Hall - Marriage Hall</h3>
                    <p className="text-xs text-purple-100">1,500 Guest Capacity • Royal Mandap Setup • AC Banquet</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12 Hall Categories Grid Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-peach-100 text-purple-900 border border-peach-300 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-peach-500" />
            <span>Versatile Event Spaces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-purple-950">
            Explore Our 12 Hall Categories
          </h2>
          <p className="text-sm text-purple-900/80">
            Find the perfect venue tailored specifically for your event type — from weddings and baby showers to corporate conferences and workshops.
          </p>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {HALL_CATEGORIES.map((category) => (
            <HallCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Elite Hall Suites Section */}
      <section className="py-16 bg-peach-50/50 border-t border-peach-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">Our Signature Offerings</span>
              <h2 className="text-3xl font-extrabold text-purple-950">Featured Elite Hall Suites</h2>
            </div>
            <Link to="/halls">
              <Button variant="ghost" icon={ArrowRight}>
                View All Venues
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Elite Hall Section */}
      <section className="py-16 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 text-white border-y border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-peach-300 block mb-2">Unmatched Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-black">Why Book Elite Hall?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-purple-900/50 border border-purple-800 space-y-4 text-center hover:bg-purple-900/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-peach-500/20 text-peach-300 flex items-center justify-center mx-auto border border-peach-500/30">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Custom Event Layouts</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Acoustics, ambient purple stage lighting, custom flower decorations, and tailored catering counters.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-purple-900/50 border border-purple-800 space-y-4 text-center hover:bg-purple-900/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-peach-500/20 text-peach-300 flex items-center justify-center mx-auto border border-peach-500/30">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Instant Online Booking</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Real-time availability checks across all 12 categories, transparent rates, and instant booking confirmation.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-purple-900/50 border border-purple-800 space-y-4 text-center hover:bg-purple-900/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-peach-500/20 text-peach-300 flex items-center justify-center mx-auto border border-peach-500/30">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Managed by Elite Team</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Dedicated event concierge supervised by our expert venue team ensuring smooth execution for every ceremony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-peach-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-black">Plan Your Special Event Today</h2>
            <p className="text-sm text-peach-100">Reserve any of our 12 specialized Elite Hall categories now.</p>
          </div>
          <Link to="/halls">
            <Button variant="white" size="lg" className="whitespace-nowrap">
              Explore All Categories
            </Button>
          </Link>
        </div>
      </section>
    </UserLayout>
  );
};

export default Home;
