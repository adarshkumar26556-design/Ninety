import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { PropertyCard } from '../../components/PropertyCard';
import { useProperties } from '../../hooks/useProperties';
import type { PropertyBrand, PropertyType, PropertyFilters } from '../../types';
import { cn } from '@/lib/utils';

const BRANDS: PropertyBrand[] = ['Vilstay', 'Vilstay Go', 'Vilstay Venue'];
const TYPES: PropertyType[] = ['Resort', 'Villa', 'Hotel', 'Boutique Stay', 'Homestay', 'Wedding Venue', 'Event Space'];
const DESTINATIONS = ['Wayanad', 'Alappuzha', 'Vythiri', 'Manjeri', 'Kottakkal', 'Narinada', 'Munnar'];

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<PropertyFilters>({
    brand: (searchParams.get('brand') as PropertyBrand) || '',
    destination: searchParams.get('destination') || '',
    propertyType: '',
    search: '',
  });

  const [localSearch, setLocalSearch] = useState('');

  const { properties, loading } = useProperties(filters);

  const handleFilterChange = useCallback(<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = () => {
    setFilters({ brand: '', destination: '', propertyType: '', search: '' });
    setLocalSearch('');
    setSearchParams({});
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('search', localSearch);
  };

  const activeFilterCount = [filters.brand, filters.destination, filters.propertyType, filters.search]
    .filter(Boolean).length;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">Explore</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
              All <span className="italic text-stone-400">Properties</span>
            </h1>
            <p className="text-stone-400 text-lg max-w-xl leading-relaxed">
              Find your perfect escape. From nature resorts to boutique stays across Kerala.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-10 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by name or destination..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-stone-400 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white/15 backdrop-blur-md transition-all text-lg"
              />
            </div>
            <button type="submit" className="btn-primary px-8 py-4 rounded-full text-lg">
              Search
            </button>
          </motion.form>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              'flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all',
              activeFilterCount > 0
                ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                : 'bg-white border-stone-200 text-stone-700 hover:border-brand-300 hover:bg-stone-50'
            )}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold ml-1">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown size={14} className={cn('transition-transform ml-1', filtersOpen && 'rotate-180')} />
          </button>

          {/* Brand Quick Filters */}
          <div className="hidden md:flex gap-3">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => handleFilterChange('brand', filters.brand === brand ? '' : brand)}
                className={cn(
                  'px-5 py-3 rounded-full border text-sm font-semibold transition-all',
                  filters.brand === brand
                    ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                )}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Clear */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X size={16} /> Clear all
            </button>
          )}

          {/* Results count */}
          <div className="ml-auto text-stone-500 text-sm font-medium">
            {loading ? 'Finding stays...' : `${properties.length} properties found`}
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-bold text-stone-900 mb-3 uppercase tracking-wider">Destination</label>
                    <select
                      value={filters.destination}
                      onChange={(e) => handleFilterChange('destination', e.target.value)}
                      className="admin-input bg-stone-50 rounded-xl border-transparent focus:border-brand-500 focus:bg-white"
                    >
                      <option value="">Anywhere</option>
                      {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-bold text-stone-900 mb-3 uppercase tracking-wider">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value as PropertyType)}
                      className="admin-input bg-stone-50 rounded-xl border-transparent focus:border-brand-500 focus:bg-white"
                    >
                      <option value="">Any Type</option>
                      {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Brand (Mobile only) */}
                  <div className="md:hidden">
                    <label className="block text-sm font-bold text-stone-900 mb-3 uppercase tracking-wider">Brand</label>
                    <select
                      value={filters.brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value as PropertyBrand)}
                      className="admin-input bg-stone-50 rounded-xl border-transparent focus:border-brand-500 focus:bg-white"
                    >
                      <option value="">All Brands</option>
                      {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse shadow-sm">
                <div className="aspect-[4/3] bg-stone-200" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-stone-200 rounded-md w-3/4" />
                  <div className="h-4 bg-stone-200 rounded-md w-1/2" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 bg-stone-200 rounded-md w-1/3" />
                    <div className="h-8 bg-stone-200 rounded-md w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-stone-100 shadow-sm">
            <div className="text-stone-300 text-7xl mb-6">🏡</div>
            <h3 className="font-display text-3xl text-stone-900 mb-3">No stays found</h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">We couldn't find any properties matching your criteria. Try adjusting your filters or destination.</p>
            <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p, i) => (
              <PropertyCard key={p._id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
