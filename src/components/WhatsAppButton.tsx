import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/919947584947?text=Hi%20Vilstay%20Team,%20I'm%20interested%20in%20booking%20a%20stay."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30"></span>
      <MessageCircle className="h-7 w-7 relative z-10" />
      <span className="sr-only">Contact us on WhatsApp</span>
    </motion.a>
  );
};
