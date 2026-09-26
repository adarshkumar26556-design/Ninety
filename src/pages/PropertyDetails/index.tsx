import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Star, Users, Bed, Wifi, Car, UtensilsCrossed, Waves,
  MessageCircle, ArrowLeft, ChevronLeft, ChevronRight, X, Check,
  Phone, Share2, ArrowRight
} from 'lucide-react';
import { useProperty } from '../../hooks/useProperties';
import { formatPrice, generateWhatsAppMessage, getBrandTagClass } from '../../utils';
import type { Room } from '../../types';
import { cn } from '@/lib/utils';

const amenityIcons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={18} />,
  'Parking': <Car size={18} />,
  'Restaurant': <UtensilsCrossed size={18} />,
  'Swimming Pool': <Waves size={18} />,
};

const RoomCard: React.FC<{ room: Room; propertyName: string; destination: string; whatsappNumber: string }> = ({
  room, propertyName, destination, whatsappNumber
}) => {
  const waUrl = generateWhatsAppMessage(propertyName, destination, room.name, whatsappNumber);
  return (
    <div className="group bg-white rounded-3xl border border-stone-100 overflow-hidden hover:shadow-card transition-all duration-500">
      {room.images[0] && (
        <div className="aspect-[4/3] overflow-hidden relative">
          <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display font-bold text-stone-900 text-2xl mb-2">{room.name}</h3>
        <p className="text-stone-500 text-sm mb-5 leading-relaxed line-clamp-2">{room.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 border border-stone-100">
            <Users size={14} /> Max {room.maxGuests}
          </div>
          <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 border border-stone-100">
            <Bed size={14} /> {room.bedType}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-stone-100">
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Per night</p>
            <span className="font-display font-bold text-stone-900 text-2xl">{formatPrice(room.price)}</span>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-6 text-sm">
            Book
          </a>
        </div>
      </div>
    </div>
  );
};

export const PropertyDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { property, loading, error } = useProperty(slug || '');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !property) {
    return <Navigate to="/stays" replace />;
  }

  const destination = `${property.location.destination}, ${property.location.state}`;
  const whatsappUrl = generateWhatsAppMessage(property.name, destination, undefined, property.whatsappNumber);

  const allImages = property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  ];

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property.name,
        text: property.shortDescription,
        url: window.location.href,
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      {/* Breadcrumb & Actions */}
      <div className="section-container py-4 flex justify-between items-center">
        <Link to="/stays" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-600 font-medium text-sm transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to all stays
        </Link>
        <button onClick={handleShare} className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="section-container mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[50vh] md:h-[60vh] rounded-[2rem] overflow-hidden">
          {/* Main Image */}
          <div
            className="md:col-span-2 md:row-span-2 relative cursor-pointer overflow-hidden group"
            onClick={() => { setGalleryIndex(0); setLightboxOpen(true); }}
          >
            <img
              src={allImages[0]}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Side Images */}
          {allImages.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className={cn(
                "relative cursor-pointer overflow-hidden group hidden md:block",
                i === 3 && "hidden lg:block" // Hide 5th image on md screens
              )}
              onClick={() => { setGalleryIndex(i + 1); setLightboxOpen(true); }}
            >
              <img src={img} alt={`${property.name} - ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {i === 3 && allImages.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm transition-colors group-hover:bg-black/60">
                  <span className="text-white font-display font-bold text-2xl">+{allImages.length - 5}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center backdrop-blur-xl"
          >
            <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
              <X size={32} />
            </button>
            <button
              onClick={() => setGalleryIndex((i) => (i - 1 + allImages.length) % allImages.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={40} />
            </button>
            <motion.img 
              key={galleryIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={allImages[galleryIndex]} 
              alt={property.name} 
              className="max-w-5xl w-full max-h-[85vh] object-contain px-20" 
            />
            <button
              onClick={() => setGalleryIndex((i) => (i + 1) % allImages.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={40} />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 text-white/80 font-medium tracking-widest text-sm">
              {galleryIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="section-container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Property Info */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest", getBrandTagClass(property.brand))}>
                  {property.brand}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-500 font-semibold uppercase tracking-wider text-sm">{property.propertyType}</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                {property.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-stone-600 font-medium">
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-brand-500" />
                  {destination}
                </span>
                <span className="flex items-center gap-2">
                  <Star size={18} className="text-gold-500 fill-gold-500" />
                  <span className="text-stone-900">{property.rating}</span> rating
                </span>
                <span className="flex items-center gap-2">
                  <Users size={18} className="text-stone-400" />
                  Up to {property.guests} guests
                </span>
                <span className="flex items-center gap-2">
                  <Bed size={18} className="text-stone-400" />
                  {property.roomsCount} rooms
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <div className="prose prose-stone prose-lg max-w-none">
              <h2 className="font-display font-bold text-3xl mb-6">The Experience</h2>
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-3xl mb-8">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-4 text-stone-700 font-medium">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 shadow-sm flex items-center justify-center text-brand-600 shrink-0">
                        {amenityIcons[amenity] || <Check size={20} />}
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rooms */}
            {property.rooms.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-3xl mb-8">Available Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.rooms.map((room, i) => (
                    <RoomCard
                      key={i}
                      room={room}
                      propertyName={property.name}
                      destination={destination}
                      whatsappNumber={property.whatsappNumber}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-card mb-6">
                <div className="mb-8">
                  <p className="text-stone-400 text-sm font-semibold uppercase tracking-wider mb-2">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-stone-900 text-4xl font-display">
                      {formatPrice(property.startingPrice)}
                    </span>
                    <span className="text-stone-500 font-medium">/ night</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full py-4 text-lg justify-center shadow-md"
                  >
                    <MessageCircle size={24} />
                    WhatsApp to Book
                  </a>
                  <a
                    href={`tel:${property.whatsappNumber}`}
                    className="btn-secondary w-full py-4 text-lg justify-center bg-stone-50"
                  >
                    <Phone size={20} />
                    Call Property
                  </a>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100">
                  <p className="text-brand-800 text-sm font-medium text-center leading-relaxed">
                    No online payment required. Contact our team directly to check availability and confirm your booking.
                  </p>
                </div>
              </div>

              {/* Map/Location Card */}
              {property.googleMapsUrl && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 shadow-sm group">
                  <div className="aspect-video bg-stone-100 rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center">
                    <MapPin size={40} className="text-stone-300" />
                    <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <a
                    href={property.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-stone-900 font-semibold group-hover:text-brand-600 transition-colors"
                  >
                    View on Google Maps
                    <ArrowRight size={18} className="text-stone-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
