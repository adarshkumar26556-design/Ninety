import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Bed, Wifi, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from '@/types';
import { formatPrice, generateWhatsAppMessage, getBrandTagClass } from '@/utils';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  const destination = `${property.location.destination}, ${property.location.state}`;
  const whatsappUrl = generateWhatsAppMessage(
    property.name,
    destination,
    undefined,
    property.whatsappNumber
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Image Container */}
      <Link to={`/stays/${property.slug}`} className="relative aspect-[4/3] block overflow-hidden">
        {property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
            No image
          </div>
        )}
        
        {/* Gradients & Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-40" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm", getBrandTagClass(property.brand))}>
            {property.brand}
          </span>
          {property.featured && (
            <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Link to={`/stays/${property.slug}`} className="hover:text-brand-600 transition-colors">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-stone-900 leading-tight line-clamp-1">
              {property.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg shrink-0">
            <Star size={14} className="text-gold-500 fill-gold-500" />
            <span className="text-sm font-semibold text-stone-700">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-4">
          <MapPin size={16} className="text-brand-500" />
          <span className="truncate">{destination}</span>
        </div>

        {/* Key Features */}
        <div className="flex flex-wrap gap-3 text-stone-500 text-xs mb-5">
          <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
            <Users size={14} /> Up to {property.guests}
          </div>
          <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
            <Bed size={14} /> {property.roomsCount} Rooms
          </div>
          {property.amenities.includes('Wi-Fi') && (
            <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
              <Wifi size={14} /> Wi-Fi
            </div>
          )}
        </div>

        <div className="mt-auto pt-5 border-t border-stone-100 flex items-center justify-between gap-4">
          <div>
            <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-0.5">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                {formatPrice(property.startingPrice)}
              </span>
              <span className="text-stone-400 text-sm">/ night</span>
            </div>
          </div>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-12 w-12 sm:w-auto sm:px-6 items-center justify-center gap-2 bg-[#25D366] text-white rounded-full font-semibold transition-all hover:bg-[#1ebe5b] hover:shadow-lg hover:-translate-y-0.5"
            title="Book via WhatsApp"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Book</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
