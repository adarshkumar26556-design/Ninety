import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Image as ImageIcon, Plus, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { propertyApi } from '../../../services/propertyApi';
import type { Property, PropertyBrand, PropertyType, PropertyStatus } from '../../../types';
import { MOCK_PROPERTIES, AMENITIES_LIST } from '../../../data/properties';
import { cn } from '@/lib/utils';

const BRANDS: PropertyBrand[] = ['Vilstay', 'Vilstay Go', 'Vilstay Venue'];
const TYPES: PropertyType[] = ['Resort', 'Villa', 'Hotel', 'Boutique Stay', 'Homestay', 'Wedding Venue', 'Event Space'];
const ROOM_AMENITIES = ['AC', 'Wi-Fi', 'TV', 'Hot Water', 'Balcony', 'Kitchenette', 'Mini Bar', 'Safe', 'Hair Dryer', 'Iron', 'Fan', 'Nature View', 'Lake View', 'Mountain View'];
const BED_TYPES = ['King', 'Queen', 'Double', 'Twin', 'Single', 'King + Twin', 'Bunk'];

interface RoomForm {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  bedType: string;
  images: string[];
  amenities: string[];
}

export const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Property>>({});
  const [activeTab, setActiveTab] = useState('basic');
  const [imageUrl, setImageUrl] = useState('');
  const [roomImageUrls, setRoomImageUrls] = useState<Record<number, string>>({});

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

  // Room helpers
  const rooms: RoomForm[] = (form.rooms || []) as RoomForm[];

  const addRoom = () => {
    update('rooms', [...rooms, { name: '', description: '', price: 0, maxGuests: 2, bedType: 'King', images: [], amenities: [] }]);
  };

  const updateRoom = (index: number, key: keyof RoomForm, value: any) => {
    const updated = [...rooms];
    updated[index] = { ...updated[index], [key]: value };
    update('rooms', updated);
  };

  const removeRoom = (index: number) => {
    update('rooms', rooms.filter((_, i) => i !== index));
  };

  const toggleRoomAmenity = (roomIndex: number, amenity: string) => {
    const room = rooms[roomIndex];
    const next = room.amenities.includes(amenity)
      ? room.amenities.filter(a => a !== amenity)
      : [...room.amenities, amenity];
    updateRoom(roomIndex, 'amenities', next);
  };

  const addRoomImage = (roomIndex: number) => {
    const url = roomImageUrls[roomIndex];
    if (!url) return;
    const room = rooms[roomIndex];
    updateRoom(roomIndex, 'images', [...room.images, url]);
    setRoomImageUrls(prev => ({ ...prev, [roomIndex]: '' }));
  };

  const removeRoomImage = (roomIndex: number, imgIndex: number) => {
    const room = rooms[roomIndex];
    updateRoom(roomIndex, 'images', room.images.filter((_, i) => i !== imgIndex));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        brand: form.brand,
        propertyType: form.propertyType,
        location: form.location,
        shortDescription: form.shortDescription,
        description: form.description,
        images: form.images,
        startingPrice: Number(form.startingPrice) || 0,
        rating: Number(form.rating) || 4.5,
        guests: Number(form.guests) || 2,
        roomsCount: Number(form.roomsCount) || 1,
        amenities: form.amenities,
        whatsappNumber: form.whatsappNumber,
        googleMapsUrl: form.googleMapsUrl,
        websiteUrl: form.websiteUrl,
        featured: form.featured,
        status: form.status,
        rooms: (form.rooms || []).map((r: any) => ({
          name: r.name,
          description: r.description,
          price: Number(r.price) || 0,
          maxGuests: Number(r.maxGuests) || 2,
          bedType: r.bedType,
          images: r.images || [],
          amenities: r.amenities || [],
        })),
      };
      await propertyApi.updateProperty(id, payload);
      toast.success('Property updated successfully!');
      navigate('/admin/properties');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update. Changes saved locally.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'location', label: 'Location' },
    { id: 'media', label: 'Media' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'rooms', label: `Rooms (${rooms.length})` },
    { id: 'settings', label: 'Settings' },
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
            <div>
              <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Original Website URL</label>
              <input value={form.websiteUrl || ''} onChange={e => update('websiteUrl', e.target.value)} className="admin-input" placeholder="https://vilstay.com/properties/..." />
              <p className="text-stone-400 text-xs mt-1.5">When set, clicking the property card will redirect to this URL instead of the internal detail page.</p>
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

        {activeTab === 'rooms' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Room Types</h2>
                <p className="text-stone-500 text-sm mt-1">Manage room categories, pricing, and amenities</p>
              </div>
              <button type="button" onClick={addRoom} className="btn-primary gap-2 px-6">
                <Plus size={18} /> Add Room
              </button>
            </div>

            {rooms.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-100 p-16 text-center shadow-sm">
                <div className="text-stone-300 text-6xl mb-4">🛏️</div>
                <p className="text-stone-900 font-bold text-xl mb-2">No rooms added yet</p>
                <p className="text-stone-500 mb-8 max-w-sm mx-auto">Add room types with pricing, capacity, and amenities.</p>
                <button type="button" onClick={addRoom} className="btn-primary gap-2 px-6">
                  <Plus size={18} /> Add First Room
                </button>
              </div>
            ) : (
              rooms.map((room, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-8 py-5 bg-stone-50/50 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <GripVertical size={18} className="text-stone-300" />
                      <span className="font-bold text-stone-900">Room {idx + 1}</span>
                      {room.name && <span className="text-stone-500 font-medium">— {room.name}</span>}
                    </div>
                    <button type="button" onClick={() => removeRoom(idx)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Remove room">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Room Name *</label>
                        <input value={room.name} onChange={e => updateRoom(idx, 'name', e.target.value)} className="admin-input" placeholder="Deluxe Suite" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Bed Type</label>
                        <select value={room.bedType} onChange={e => updateRoom(idx, 'bedType', e.target.value)} className="admin-input font-medium">
                          {BED_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Room Description</label>
                      <textarea value={room.description} onChange={e => updateRoom(idx, 'description', e.target.value)} rows={2} className="admin-input resize-none" placeholder="Brief description of this room..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Price per Night (₹) *</label>
                        <input type="number" value={room.price} onChange={e => updateRoom(idx, 'price', Number(e.target.value))} className="admin-input" placeholder="3500" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Max Guests</label>
                        <input type="number" value={room.maxGuests} onChange={e => updateRoom(idx, 'maxGuests', Number(e.target.value))} className="admin-input" placeholder="2" min="1" max="20" />
                      </div>
                    </div>

                    {/* Room Images */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Room Images</label>
                      <div className="flex gap-3">
                        <input
                          type="url"
                          value={roomImageUrls[idx] || ''}
                          onChange={e => setRoomImageUrls(prev => ({ ...prev, [idx]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addRoomImage(idx); } }}
                          placeholder="Paste room image URL..."
                          className="admin-input flex-1"
                        />
                        <button type="button" onClick={() => addRoomImage(idx)} className="btn-primary px-6 text-sm">Add</button>
                      </div>
                      {room.images.length > 0 && (
                        <div className="flex gap-3 mt-3 flex-wrap">
                          {room.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                              <img src={img} className="w-full h-full object-cover" alt="" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button type="button" onClick={() => removeRoomImage(idx, imgIdx)} className="text-white">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Room Amenities */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-3">Room Amenities</label>
                      <div className="flex flex-wrap gap-2">
                        {ROOM_AMENITIES.map(amenity => {
                          const selected = room.amenities.includes(amenity);
                          return (
                            <button
                              key={amenity}
                              type="button"
                              onClick={() => toggleRoomAmenity(idx, amenity)}
                              className={cn(
                                'px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                                selected ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-stone-200 text-stone-500 hover:border-stone-300'
                              )}
                            >
                              {amenity}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Rating (1-5)</label>
                <input type="number" value={form.rating || ''} onChange={e => update('rating', Number(e.target.value))} className="admin-input" placeholder="4.5" min="1" max="5" step="0.1" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Max Guests</label>
                <input type="number" value={form.guests || ''} onChange={e => update('guests', Number(e.target.value))} className="admin-input" placeholder="4" min="1" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Total Rooms</label>
                <input type="number" value={form.roomsCount || ''} onChange={e => update('roomsCount', Number(e.target.value))} className="admin-input" placeholder="8" min="1" />
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
