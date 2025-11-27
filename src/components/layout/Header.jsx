import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
// (other imports...)

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCareersDropdownOpen, setIsCareersDropdownOpen] = useState(false);
  const careersDropdownTimeout = useRef(null);

  const handleCareersMouseEnter = () => {
    clearTimeout(careersDropdownTimeout.current);
    setIsCareersDropdownOpen(true);
  };

  const handleCareersMouseLeave = () => {
    careersDropdownTimeout.current = setTimeout(() => {
      setIsCareersDropdownOpen(false);
    }, 200); // Delay in milliseconds
  };

  return (
    <>
      {/* Header + Nav */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 z-20 px-4 sm:px-6 py-4 w-full"
        style={{ backgroundColor: '#efede5', borderBottom: '0.5px solid #e6e3d8' }}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-black font-medium hover:text-gray-700">HOME</Link>
             <Link to="/Research" className="text-black font-medium hover:text-gray-700">RESEARCH</Link>
            {/* Careers with hover-controlled dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCareersMouseEnter}
              onMouseLeave={handleCareersMouseLeave}
            >
              <Link
                to="/Careers"
                className="text-black font-medium hover:text-gray-700 flex items-center"
              >
                CAREERS
                {/* <ChevronDown className="ml-1 w-4 h-4" /> */}
              </Link>

              {/* {isCareersDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
                  onMouseEnter={handleCareersMouseEnter}
                  onMouseLeave={handleCareersMouseLeave}
                >
                  <Link
                    to="/Careers/Openings"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Before Apply
                  </Link>
                  
                </div>
              )} */}
            </div>

            <Link to="/join-our-team" className="text-black font-medium hover:text-gray-700">JOIN OUR TEAM</Link>
            <Link to="/Contact" className="text-black font-medium hover:text-gray-700">CONTACT</Link>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-[#efede5] border-t border-[#e6e3d8] z-10 md:hidden shadow-sm"
            >
              <div className="flex flex-col px-4 py-4 space-y-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-black font-medium">HOME</Link>
                <Link to="/Research" onClick={() => setIsMobileMenuOpen(false)} className="text-black font-medium">RESEARCH</Link>
                <Link to="/Careers" onClick={() => setIsMobileMenuOpen(false)} className="text-black font-medium">CAREERS</Link>
                <Link to="/join-our-team" onClick={() => setIsMobileMenuOpen(false)} className="text-black font-medium">JOIN OUR TEAM</Link>
                <Link to="/Contact" onClick={() => setIsMobileMenuOpen(false)} className="text-black font-medium">CONTACT</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-20 md:h-24" />
    </>
  );
};

export default Header;
