import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { propertyApi } from '../../../services/propertyApi';
import type { Property, PropertyBrand, PropertyType, PropertyStatus } from '../../../types';
import { MOCK_PROPERTIES, AMENITIES_LIST } from '../../../data/properties';
import { cn } from '@/lib/utils';

const BRANDS: PropertyBrand[] = ['Vilstay', 'Vilstay Go', 'Vilstay Venue'];
const TYPES: PropertyType[] = ['Resort', 'Villa', 'Hotel', 'Boutique Stay', 'Homestay', 'Wedding Venue', 'Event Space'];

export const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Property>>({});
  const [activeTab, setActiveTab] = useState('basic');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await propertyApi.adminGetProperties();
        const found = res.data.find(p => p._id === id);
        if (found) { setProperty(found); setForm(found); }
      } catch {
        const found = MOCK_PROPERTIES.find(p => p._id === id);
        if (found) { setProperty(found); setForm(found); }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const update = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const updateLocation = (key: string, value: string) => {
    setForm(prev => ({ ...prev, location: { ...(prev.location as any), [key]: value } }));
  };

  const toggleAmenity = (amenity: string) => {
    const current = form.amenities || [];
    const next = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    update('amenities', next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      toast.success('Property updated! (Demo Mode)');
      navigate('/admin/properties');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'location', label: 'Location' },
    { id: 'media', label: 'Media' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'settings', label: 'Settings' }
  ];

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!property) return <div className="text-center py-20 text-stone-500 font-medium">Property not found.</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/properties')} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-stone-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-display">Edit Property</h1>
          <p className="text-brand-600 font-bold uppercase tracking-widest text-xs mt-1">{property.name}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={cn(
              'px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap',
              activeTab === t.id
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-500 hover:bg-stone-100'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {activeTab === 'basic' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Basic Information</h2>
            <div>
              <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Property Name *</label>
              <input value={form.name || ''} onChange={e => update('name', e.target.value)} required className="admin-input" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Brand *</label>
                <select value={form.brand || ''} onChange={e => update('brand', e.target.value as PropertyBrand)} className="admin-input font-medium">
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Property Type *</label>
                <select value={form.propertyType || ''} onChange={e => update('propertyType', e.target.value as PropertyType)} className="admin-input font-medium">
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Short Description</label>
              <textarea value={form.shortDescription || ''} onChange={e => update('shortDescription', e.target.value)} rows={2} className="admin-input resize-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Full Description</label>
              <textarea value={form.description || ''} onChange={e => update('description', e.target.value)} rows={6} className="admin-input resize-none" />
            </div>
          </motion.div>
        )}

        {activeTab === 'location' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Destination *</label>
                <input value={form.location?.destination || ''} onChange={e => updateLocation('destination', e.target.value)} required className="admin-input" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">City</label>
                <input value={form.location?.city || ''} onChange={e => updateLocation('city', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">State</label>
                <input value={form.location?.state || ''} onChange={e => updateLocation('state', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Country</label>
                <input value={form.location?.country || ''} onChange={e => updateLocation('country', e.target.value)} className="admin-input" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Google Maps URL</label>
              <input value={form.googleMapsUrl || ''} onChange={e => update('googleMapsUrl', e.target.value)} className="admin-input" />
            </div>
          </motion.div>
        )}

        {activeTab === 'media' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Property Images</h2>
            <div className="flex gap-4">
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if(imageUrl) { update('images', [...(form.images || []), imageUrl]); setImageUrl(''); } } }}
                placeholder="Paste image URL here..."
                className="admin-input flex-1"
              />
              <button
                type="button"
                onClick={() => { if(imageUrl) { update('images', [...(form.images || []), imageUrl]); setImageUrl(''); } }}
                className="btn-primary px-8"
              >
                Add Image
              </button>
            </div>
            
            {(form.images || []).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {(form.images || []).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => update('images', (form.images || []).filter((_, idx) => idx !== i))} className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center mt-8">
                <ImageIcon size={48} className="mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500 font-medium">No images added yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'amenities' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {AMENITIES_LIST.map(amenity => {
                const selected = (form.amenities || []).includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={cn(
                      'px-4 py-3 rounded-2xl text-sm font-semibold border-2 transition-all flex items-center gap-3',
                      selected ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-stone-100 text-stone-600 hover:border-stone-200 hover:bg-stone-50'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors', selected ? 'border-brand-500 bg-brand-500' : 'border-stone-300')}>
                      {selected && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    {amenity}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Pricing & Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Starting Price (₹)</label>
                <input type="number" value={form.startingPrice || ''} onChange={e => update('startingPrice', Number(e.target.value))} className="admin-input" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">WhatsApp Number</label>
                <input value={form.whatsappNumber || ''} onChange={e => update('whatsappNumber', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Visibility Status</label>
                <select value={form.status || 'active'} onChange={e => update('status', e.target.value as PropertyStatus)} className="admin-input font-medium">
                  <option value="active">Active (Visible)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-center gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => update('featured', !form.featured)}
                  className={cn(
                    'w-12 h-6 rounded-full p-1 transition-colors relative',
                    form.featured ? 'bg-brand-500' : 'bg-stone-200'
                  )}
                >
                  <div className={cn('w-4 h-4 bg-white rounded-full transition-transform', form.featured ? 'translate-x-6' : 'translate-x-0')} />
                </button>
                <span className="font-bold text-stone-700">Feature on Homepage</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end gap-4 pt-4 border-t border-stone-200">
          <button type="button" onClick={() => navigate('/admin/properties')} className="btn-secondary px-8">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary px-8">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
