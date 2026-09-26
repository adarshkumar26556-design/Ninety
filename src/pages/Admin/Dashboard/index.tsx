import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Star, Pencil, Trash2, PlusCircle, ExternalLink, Activity, ChevronRight } from 'lucide-react';
import type { Property } from '../../../types';
import { MOCK_PROPERTIES } from '../../../data/properties';
import { propertyApi } from '../../../services/propertyApi';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export const AdminDashboardPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await propertyApi.adminGetProperties();
        setProperties(res.data);
      } catch {
        setProperties(MOCK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = {
    total: properties.length,
    vilstay: properties.filter(p => p.brand === 'Vilstay').length,
    go: properties.filter(p => p.brand === 'Vilstay Go').length,
    venue: properties.filter(p => p.brand === 'Vilstay Venue').length,
    active: properties.filter(p => p.status === 'active').length,
    featured: properties.filter(p => p.featured).length,
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    try {
      await propertyApi.deleteProperty(id);
      setProperties(prev => prev.filter(p => p._id !== id));
      toast.success('Property deleted');
    } catch {
      setProperties(prev => prev.filter(p => p._id !== id));
      toast.success('Property removed (demo mode)');
    }
  };

  const statCards = [
    { label: 'Total Properties', value: stats.total, color: 'bg-stone-900', icon: Building2 },
    { label: 'Vilstay Resorts', value: stats.vilstay, color: 'bg-brand-600', icon: Star },
    { label: 'Vilstay Go', value: stats.go, color: 'bg-blue-600', icon: TrendingUp },
    { label: 'Vilstay Venue', value: stats.venue, color: 'bg-purple-600', icon: Star },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-display">Dashboard Overview</h1>
          <p className="text-stone-500 font-medium mt-1">Manage your properties and bookings</p>
        </div>
        <Link to="/admin/properties/new" className="btn-primary gap-2">
          <PlusCircle size={18} /> Add New Property
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-stone-900 mb-2 font-display">{loading ? '—' : stat.value}</div>
            <div className="text-stone-500 font-semibold text-sm uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Additional stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-50 rounded-3xl p-6 flex items-center gap-6 border border-brand-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Activity size={24} className="text-brand-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-900 font-display">{loading ? '—' : stats.active}</div>
              <div className="text-brand-700 font-semibold text-sm uppercase tracking-wider">Active Listings</div>
            </div>
          </div>
          <div className="bg-gold-50 rounded-3xl p-6 flex items-center gap-6 border border-gold-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Star size={24} className="text-gold-500 fill-gold-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gold-900 font-display">{loading ? '—' : stats.featured}</div>
              <div className="text-gold-700 font-semibold text-sm uppercase tracking-wider">Featured Stays</div>
            </div>
          </div>
        </div>

        {/* Recent Properties Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
            <h2 className="font-bold text-stone-900 text-lg">Recently Added</h2>
            <Link to="/admin/properties" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors text-sm flex items-center gap-1">
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="p-12 text-center text-stone-400 font-medium">Loading properties...</div>
            ) : properties.length === 0 ? (
              <div className="p-12 text-center text-stone-500 font-medium">No properties found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-stone-50/50 sticky top-0">
                  <tr>
                    <th className="text-left px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Property</th>
                    <th className="text-left px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="text-right px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {properties.slice(0, 5).map((p) => (
                    <tr key={p._id} className="hover:bg-stone-50/80 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          {p.images[0] ? (
                            <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-stone-100 flex-shrink-0" />
                          )}
                          <div>
                            <div className="font-bold text-stone-900 mb-1">{p.name}</div>
                            <div className="text-stone-500 text-xs font-medium">{p.location.destination}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 hidden sm:table-cell">
                        <span className={cn(
                          'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                          p.status === 'active' ? 'bg-green-100 text-green-700' :
                          p.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-stone-100 text-stone-600'
                        )}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 justify-end">
                          <Link
                            to={`/stays/${p.slug}`}
                            target="_blank"
                            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <Link
                            to={`/admin/properties/${p._id}/edit`}
                            className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                            title="Edit Property"
                          >
                            <Pencil size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id, p.name)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
