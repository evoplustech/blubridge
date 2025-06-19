
import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer relative z-10 px-2 sm:px-3 py-4 sm:py-6 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto">
        
        <div className=" border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BluBridge AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
