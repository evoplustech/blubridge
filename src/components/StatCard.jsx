
import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ number, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <div className="text-4xl font-bold text-black mb-1">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </motion.div>
);

export default StatCard;
