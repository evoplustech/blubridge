
import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 px-4 sm:px-6 py-10 sm:py-12 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white">BluBridge AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering businesses with intelligent data solutions.
            </p>
          </div>
          <div>
            <span className="font-semibold text-white mb-3 sm:mb-4 block">Platform</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Machine Learning</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Data Analytics</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">AI Models</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">APIs</p>
            </div>
          </div>
          <div>
            <span className="font-semibold text-white mb-3 sm:mb-4 block">Solutions</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Enterprise</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Startups</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Healthcare</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Finance</p>
            </div>
          </div>
          <div>
            <span className="font-semibold text-white mb-3 sm:mb-4 block">Company</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">About Us</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Careers</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Blog</p>
              <p className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Contact</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BluBridge AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
