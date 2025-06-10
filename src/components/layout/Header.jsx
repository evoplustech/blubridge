import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 px-4 sm:px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-black">BluBridge</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#" className="text-gray-700 hover:text-black transition-colors font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-black transition-colors font-medium">Careers</a>
          <a href="#" className="text-gray-700 hover:text-black transition-colors font-medium">Partner</a>
          
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6">
            Contact
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;