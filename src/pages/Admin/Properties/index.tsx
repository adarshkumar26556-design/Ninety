import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, PlusCircle, Pencil, Trash2, ExternalLink, Filter } from 'lucide-react';
import type { Property, PropertyBrand, PropertyStatus } from '../../../types';
import { MOCK_PROPERTIES } from '../../../data/properties';
import { propertyApi } from '../../../services/propertyApi';
import { formatPrice, getBrandTagClass } from '../../../utils';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export const AdminPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState<PropertyBrand | ''>('');
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | ''>('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await propertyApi.adminGetProperties();
        setProperties(res.data);
      } catch {
        setProperties(MOCK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let result = [...properties];
    if (search) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.destination.toLowerCase().includes(search.toLowerCase())
    );
    if (brandFilter) result = result.filter(p => p.brand === brandFilter);
    if (statusFilter) result = result.filter(p => p.status === statusFilter);
    setFiltered(result);
  }, [properties, search, brandFilter, statusFilter]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await propertyApi.deleteProperty(id);
      setProperties(prev => prev.filter(p => p._id !== id));
      toast.success('Property deleted');
    } catch {
      setProperties(prev => prev.filter(p => p._id !== id));
      toast.success('Property removed (demo mode)');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-display">Properties</h1>
          <p className="text-stone-500 font-medium mt-1">Manage your {filtered.length} property listings</p>
        </div>
        <Link to="/admin/properties/new" className="btn-primary gap-2 px-6">
          <PlusCircle size={18} /> Add New Property
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-stone-100 p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search properties by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value as PropertyBrand | '')}
            className="w-full sm:w-auto px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm font-bold uppercase tracking-wider"
          >
            <option value="">All Brands</option>
            <option value="Vilstay">Vilstay</option>
            <option value="Vilstay Go">Vilstay Go</option>
            <option value="Vilstay Venue">Vilstay Venue</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PropertyStatus | '')}
            className="w-full sm:w-auto px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm font-bold uppercase tracking-wider"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="text-stone-500 font-medium">Loading properties...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-stone-300 text-6xl mb-6">🏡</div>
            <p className="text-stone-900 font-bold text-xl mb-2">No properties found</p>
            <p className="text-stone-500 mb-8 max-w-sm mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
            <Link to="/admin/properties/new" className="btn-primary">
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50/50">
                <tr>
                  <th className="text-left px-8 py-5 text-xs font-bold text-stone-500 uppercase tracking-wider">Property Details</th>
                  <th className="text-left px-8 py-5 text-xs font-bold text-stone-500 uppercase tracking-wider hidden lg:table-cell">Location & Price</th>
                  <th className="text-left px-8 py-5 text-xs font-bold text-stone-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-8 py-5 text-xs font-bold text-stone-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-stone-50/80 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        {p.images[0] ? (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                            <Building2 size={24} className="text-stone-300" />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-stone-900 text-base mb-1">{p.name}</div>
                          <div className="flex items-center gap-2">
                            <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest", getBrandTagClass(p.brand))}>
                              {p.brand}
                            </span>
                            {p.featured && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-2 py-0.5 rounded-md">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden lg:table-cell">
                      <div className="font-semibold text-stone-900 mb-1">{formatPrice(p.startingPrice)} <span className="text-stone-400 font-normal text-sm">/ night</span></div>
                      <div className="text-stone-500 text-sm font-medium flex items-center gap-1">
                        <MapPin size={14} className="text-stone-400" />
                        {p.location.destination}, {p.location.state}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider',
                        p.status === 'active' ? 'bg-green-100 text-green-700' :
                        p.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-stone-100 text-stone-600'
                      )}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          to={`/stays/${p.slug}`}
                          target="_blank"
                          className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                          title="View on site"
                        >
                          <ExternalLink size={20} />
                        </Link>
                        <Link
                          to={`/admin/properties/${p._id}/edit`}
                          className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Pencil size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
