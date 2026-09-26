import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const brands = [
  {
    name: 'Vilstay Resorts',
    tag: 'Vilstay',
    desc: 'Premium nature stays, heritage resorts & lakefront villas.',
    color: 'bg-brand-600',
    lightColor: 'bg-brand-50',
    textColor: 'text-brand-600',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
    letter: 'V'
  },
  {
    name: 'Vilstay Go',
    tag: 'Vilstay Go',
    desc: 'Comfortable city hotels and boutique business stays.',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    letter: 'G'
  },
  {
    name: 'Vilstay Venue',
    tag: 'Vilstay Venue',
    desc: 'Breathtaking locations for weddings and corporate events.',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
    letter: 'V'
  }
];

export const BrandSection: React.FC = () => {
  return (
    <section className="section-padding bg-stone-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-6"
          >
            One House, <span className="italic text-brand-700">Three Experiences</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Whether you're seeking a serene nature retreat, a comfortable city stay, or the perfect venue for your next big event, Vilstay has a destination designed for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link 
                to={`/stays?brand=${brand.tag}`}
                className="group block h-full bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={brand.img} 
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className={cn("absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center font-display text-2xl font-bold text-white shadow-lg", brand.color)}>
                    {brand.letter}
                  </div>
                </div>
                
                <div className="p-8 text-center flex flex-col items-center">
                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-stone-500 mb-8 flex-grow">
                    {brand.desc}
                  </p>
                  
                  <div className={cn(
                    "inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300",
                    brand.lightColor, brand.textColor,
                    "group-hover:bg-stone-900 group-hover:text-white"
                  )}>
                    Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
