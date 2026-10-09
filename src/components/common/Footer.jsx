import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-950 via-purple-900 to-slate-900 text-white border-t-4 border-peach-500 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-800/60">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-peach-500 to-amber-400 flex items-center justify-center text-purple-950 font-bold shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Elite<span className="text-peach-400 font-serif italic ml-1">Hall</span>
              </span>
            </Link>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              Experience grand celebrations, royal weddings, and world-class corporate summits at Elite Hall. Elegance and luxury in every detail.
            </p>
            <div className="flex items-center space-x-2 text-xs font-medium text-peach-300 bg-purple-900/60 px-3 py-1.5 rounded-full w-fit border border-purple-700/50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Managed by Elite Hall Team</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-peach-300 mb-4 tracking-wide uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-purple-200/80">
              <li>
                <Link to="/" className="hover:text-peach-300 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/halls" className="hover:text-peach-300 transition-colors">Elite Hall Venues</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-peach-300 transition-colors">Manage Bookings</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-peach-300 transition-colors">User Profile</Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-peach-300 transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Venues */}
          <div>
            <h4 className="text-base font-bold text-peach-300 mb-4 tracking-wide uppercase text-xs">Elite Hall Locations</h4>
            <ul className="space-y-2.5 text-sm text-purple-200/80">
              <li>Elite Hall - Grand Ballroom</li>
              <li>Elite Hall - Executive Suite</li>
              <li>Elite Hall - Royal Garden Pavilion</li>
              <li>Elite Hall - Diamond Banquet</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-sm text-purple-200/80">
            <h4 className="text-base font-bold text-peach-300 mb-4 tracking-wide uppercase text-xs">Contact Us</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-peach-400 shrink-0 mt-0.5" />
              <span>Tower A, Elite Hall Square, Central Avenue, Metro City</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-peach-400 shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-peach-400 shrink-0" />
              <span>contact@elitehall.com</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-purple-300/60">
          <p>© {new Date().getFullYear()} Elite Hall Booking System. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 md:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-peach-400 fill-peach-400 inline" />
            <span>for Elite Hall</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
