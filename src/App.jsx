import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import NeuralNetworkBackground from '@/components/NeuralBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
import CareerPage from './pages/CareerPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import ContactUsPage from './pages/ContactUsPage';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden ">
      <Routes>
       <Route path="/" element={<Dashboard/>}>
          {/* Default child route for /dashboard (e.g., a welcome page) */}
          <Route index element={<HomePage />} />
          <Route path="/Careers" element={<CareerPage />} />
          <Route path="/Partner" element={<PartnerPage />} />
          {/* <Route path="/Contact" element={<ContactPage />} /> */}
          <Route path="/Contact" element={<ContactUsPage />} />

        </Route>
        </Routes>
      {/* <NeuralNetworkBackground />
      <Header />
      <HomePage />
      <Footer />
      <Toaster /> */}
    </div>
  );
}

export default App;