import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import NeuralNetworkBackground from '@/components/NeuralBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import CareerPage from './pages/CareerPage';
import { Routes } from 'react-router-dom';
import { Route } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <NeuralNetworkBackground />
      <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Careers" element={<CareerPage />} />
        </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;