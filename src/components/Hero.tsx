import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-stone-900">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://d2gx18f76jq9dw.cloudfront.net/61524/01KM0628YEEFKSK8TS7D02CYQ2.png"
          alt="Premium Vilstay Resort in Kerala"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay for text legibility */}
        <div className="absolute inset-0 bg-hero-gradient" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-sm font-semibold tracking-[0.3em] text-white/80 uppercase"
        >
          Welcome to Kerala
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6 max-w-4xl font-display text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Curated Stays for the{' '}
          <span className="italic text-white/90">Soul</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-10 max-w-xl text-lg font-light text-white/80 md:text-xl"
        >
          Discover handpicked heritage resorts, lakefront villas, and boutique properties across God's Own Country.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/stays"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-stone-900 transition-transform hover:scale-105"
          >
            <span className="relative z-10">Explore Properties</span>
            <div className="absolute inset-0 -z-0 h-full w-full scale-x-0 bg-stone-100 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
};
