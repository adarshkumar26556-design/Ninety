import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 pt-20 pb-10 text-stone-300">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <div className="font-display text-2xl font-bold text-white tracking-widest">
                VILSTAY
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              Curated premium stays across Kerala. From heritage resorts and lakefront villas to boutique hotels and event spaces.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 px-4 flex items-center justify-center rounded-full bg-stone-900 hover:bg-brand-600 hover:text-white transition-colors text-sm font-semibold">
                Instagram
              </a>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Our Brands</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/stays?brand=Vilstay" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 group-hover:scale-150 transition-transform" />
                  Vilstay Resorts
                </Link>
              </li>
              <li>
                <Link to="/stays?brand=Vilstay Go" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                  Vilstay Go
                </Link>
              </li>
              <li>
                <Link to="/stays?brand=Vilstay Venue" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" />
                  Vilstay Venue
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/stays" className="hover:text-white transition-colors">All Properties</Link></li>
              <li><Link to="/stays?destination=Wayanad" className="hover:text-white transition-colors">Stays in Wayanad</Link></li>
              <li><Link to="/stays?destination=Alappuzha" className="hover:text-white transition-colors">Stays in Alappuzha</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 shrink-0 mt-0.5" />
                <span>Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-500 shrink-0" />
                <a href="tel:+919947584947" className="hover:text-white transition-colors">+91 99475 84947</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500 shrink-0" />
                <a href="mailto:vilstaygo@gmail.com" className="hover:text-white transition-colors">vilstaygo@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Vilstay. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
