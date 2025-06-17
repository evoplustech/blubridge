import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 z-20 px-4 sm:px-6 py-4 w-full"
        style={{ backgroundColor: '#efede5', borderBottom: '0.5px solid #e6e3d8' }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-black font-medium hover:text-gray-700">Home</Link>
            <Link to="/Careers" className="text-black font-medium hover:text-gray-700">Careers</Link>
            <Link to="/Partner" className="text-black font-medium hover:text-gray-700">Partner</Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/Contact" className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-lg">
              Contact
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-black">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-[#efede5] border-t border-[#e6e3d8] z-10 md:hidden shadow-sm"
            >
              <div className="flex flex-col px-4 py-4 space-y-4">
                <Link to="/" onClick={toggleMobileMenu} className="text-black font-medium">Home</Link>
                <Link to="/Careers" onClick={toggleMobileMenu} className="text-black font-medium">Careers</Link>
                <Link to="/Partner" onClick={toggleMobileMenu} className="text-black font-medium">Partner</Link>
                <Link to="/Contact" onClick={toggleMobileMenu} className="bg-black text-white py-2 px-4 rounded-lg text-center">
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Push content down to not go under header */}
      <div className="h-20 md:h-24" />
    </>
  );
};

export default Header;
