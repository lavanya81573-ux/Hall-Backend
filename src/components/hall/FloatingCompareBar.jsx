import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import { useHalls } from '../../hooks/useHalls';
import { ArrowRight, X, Scale, Layers } from 'lucide-react';

const FloatingCompareBar = () => {
  const { selectedHallIds, removeHallFromCompare, clearCompare } = useCompare();
  const { getHallById } = useHalls();
  const location = useLocation();

  // Hide on compare page itself or if no halls selected
  if (selectedHallIds.length === 0 || location.pathname === '/compare') {
    return null;
  }

  const selectedHalls = selectedHallIds.map(id => getHallById(id)).filter(Boolean);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-in slide-in-from-bottom duration-300">
      <div className="bg-purple-950/95 backdrop-blur-md text-white rounded-3xl p-4 sm:p-5 border border-purple-800 shadow-2xl flex items-center justify-between gap-4">
        
        {/* Left Status & Previews */}
        <div className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto py-1">
          <div className="flex items-center space-x-2 shrink-0 border-r border-purple-800 pr-3">
            <div className="w-9 h-9 rounded-xl bg-peach-500/20 text-peach-300 flex items-center justify-center border border-peach-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-white">Compare Halls</p>
              <p className="text-[10px] text-peach-300">{selectedHallIds.length}/4 Selected</p>
            </div>
          </div>

          {/* Chips */}
          <div className="flex items-center space-x-2">
            {selectedHalls.map((hall) => (
              <div
                key={hall.id}
                className="flex items-center space-x-2 bg-purple-900 px-3 py-1.5 rounded-xl border border-purple-700 text-xs font-semibold shrink-0"
              >
                <img src={hall.image} alt={hall.name} className="w-6 h-6 rounded-md object-cover" />
                <span className="truncate max-w-[120px] text-white">{hall.name}</span>
                <button
                  onClick={() => removeHallFromCompare(hall.id)}
                  className="text-purple-300 hover:text-white p-0.5 rounded-md hover:bg-purple-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-purple-300 hover:text-white px-2 py-1 underline font-semibold"
          >
            Clear All
          </button>
          <Link to="/compare">
            <button className="px-4 py-2 rounded-xl bg-peach-500 text-purple-950 font-black text-xs hover:bg-peach-400 shadow-md transition-all flex items-center space-x-1">
              <span>Compare Side-by-Side</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FloatingCompareBar;
