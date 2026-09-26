import React from 'react';
import { Hero } from '../../components/Hero';
import { BrandSection } from '../../components/BrandSection';
import { PropertyCard } from '../../components/PropertyCard';
import { useProperties } from '../../hooks/useProperties';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const destinations = [
  { name: 'Wayanad', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80' },
  { name: 'Alappuzha', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=80' },
  { name: 'Munnar', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80' }
];

export const HomePage: React.FC = () => {
  const { properties, loading } = useProperties({});
  const featured = properties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="bg-stone-50">
      <Hero />
      
      {/* Brand Marquee */}
      <div className="bg-stone-900 border-y border-stone-800 py-6 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee items-center opacity-50">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-xl font-display font-bold text-white tracking-widest uppercase">Vilstay Resorts</span>
              <span className="text-stone-700 text-xl">•</span>
              <span className="text-xl font-display font-bold text-white tracking-widest uppercase">Vilstay Go</span>
              <span className="text-stone-700 text-xl">•</span>
              <span className="text-xl font-display font-bold text-white tracking-widest uppercase">Vilstay Venue</span>
              <span className="text-stone-700 text-xl">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <BrandSection />

      {/* Featured Properties */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-mesh opacity-5 pointer-events-none" />
        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title mb-4"
              >
                Featured <span className="italic text-brand-700">Stays</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-stone-500 text-lg"
              >
                Handpicked properties offering extraordinary experiences.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/stays" className="btn-secondary group">
                View All Stays
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-stone-100 rounded-2xl h-[450px]" />
              ))
            ) : (
              featured.map((p, i) => (
                <PropertyCard key={p._id} property={p} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-padding bg-stone-950 text-white overflow-hidden">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-white mb-6">Popular <span className="italic text-brand-400">Destinations</span></h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">Explore Kerala's most enchanting locations through our curated properties.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-brand-400 mb-2 opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <MapPin size={18} />
                    <span className="font-semibold tracking-wider uppercase text-sm">Explore</span>
                  </div>
                  <h3 className="font-display text-4xl font-bold text-white mb-2">{dest.name}</h3>
                  <div className="h-0.5 w-0 bg-brand-500 transition-all duration-500 group-hover:w-12" />
                </div>
                <Link to={`/stays?destination=${dest.name}`} className="absolute inset-0 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
