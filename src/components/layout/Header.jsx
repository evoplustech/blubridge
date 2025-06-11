import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <span className="text-2xl font-bold text-black"><img src='images/logo.png' /></span>
        </div>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/">Home</Link>
          <Link  to="/Careers">Careers</Link>
          <Link to="/Partner">Partner</Link>
        </div>
        <div className="flex items-center space-x-3">
        <Link to="/Contact" className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2 inline-block rounded-lg ">
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;