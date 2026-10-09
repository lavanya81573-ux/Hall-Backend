import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Building2 } from 'lucide-react';

const AuthLayout = ({ children, title = "Elite Hall", subtitle = "Create a new account to get started." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2E8F0] via-[#EDE9FE] to-[#FCE7F3] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-peach-400/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Centered Card matching uploaded screenshot design */}
      <div className="relative w-full max-w-md bg-[#ECEFF4]/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/60 space-y-6 my-8">
        
        {/* Top Floating Badge with Plus Icon */}
        <div className="flex justify-center -mt-14 mb-2">
          <Link to="/" className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-800 via-purple-600 to-peach-500 flex items-center justify-center text-white shadow-xl shadow-purple-900/30 hover:scale-105 transition-transform">
            <Plus className="w-8 h-8 stroke-[2.5]" />
          </Link>
        </div>

        {/* Brand Title & Subtitle */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-medium text-[#475569]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Body / Children */}
        <div className="space-y-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
