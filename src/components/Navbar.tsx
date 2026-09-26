import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navClass = cn(
    'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out py-4',
    scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : (isHome ? 'bg-transparent' : 'bg-white shadow-sm')
  );

  const textClass = cn(
    'font-medium transition-colors duration-300 text-sm tracking-wide uppercase',
    (!scrolled && isHome) ? 'text-white hover:text-white/80' : 'text-stone-600 hover:text-brand-600'
  );

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-50">
            <div className={cn(
              "font-display text-2xl font-bold tracking-widest transition-colors duration-300",
              (!scrolled && isHome) ? "text-white" : "text-stone-900"
            )}>
              VILSTAY
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={textClass}>Home</Link>
            
            {/* Brands Dropdown */}
            <div className="relative group">
              <button className={cn(textClass, 'flex items-center gap-1')}>
                Brands <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-white rounded-2xl shadow-premium border border-stone-100 p-2 w-64 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                  <Link to="/stays?brand=Vilstay" className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-50 transition-colors group/item">
                    <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 font-display font-bold text-xl group-hover/item:scale-110 transition-transform">V</div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">Vilstay Resorts</div>
                      <div className="text-xs text-stone-500">Premium nature stays</div>
                    </div>
                  </Link>
                  <Link to="/stays?brand=Vilstay Go" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group/item">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-display font-bold text-xl group-hover/item:scale-110 transition-transform">G</div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">Vilstay Go</div>
                      <div className="text-xs text-stone-500">Comfortable city hotels</div>
                    </div>
                  </Link>
                  <Link to="/stays?brand=Vilstay Venue" className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group/item">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-display font-bold text-xl group-hover/item:scale-110 transition-transform">V</div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">Vilstay Venue</div>
                      <div className="text-xs text-stone-500">Weddings & events</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/stays" className={textClass}>All Stays</Link>
            
            <Link 
              to="/stays" 
              className={cn(
                "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5",
                (!scrolled && isHome) 
                  ? "bg-white text-stone-900 hover:bg-stone-100" 
                  : "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-glow"
              )}
            >
              Explore Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2"
          >
            {mobileMenuOpen ? (
              <X size={24} className={(!scrolled && isHome && !mobileMenuOpen) ? "text-white" : "text-stone-900"} />
            ) : (
              <Menu size={24} className={(!scrolled && isHome) ? "text-white" : "text-stone-900"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <Link to="/" className="text-2xl font-display text-stone-900 border-b border-stone-100 pb-4">Home</Link>
              
              <div className="space-y-4">
                <p className="text-sm font-bold tracking-wider text-stone-400 uppercase">Our Brands</p>
                <Link to="/stays?brand=Vilstay" className="block text-xl font-display text-stone-800">Vilstay Resorts</Link>
                <Link to="/stays?brand=Vilstay Go" className="block text-xl font-display text-stone-800">Vilstay Go</Link>
                <Link to="/stays?brand=Vilstay Venue" className="block text-xl font-display text-stone-800">Vilstay Venue</Link>
              </div>

              <Link to="/stays" className="text-2xl font-display text-stone-900 border-t border-stone-100 pt-4">All Properties</Link>
              
              <Link to="/stays" className="btn-primary w-full mt-4 text-lg py-4">Explore Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
