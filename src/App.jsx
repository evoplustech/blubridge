import React, { useEffect } from 'react';
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
import Lenis from '@studio-freight/lenis';
import JoinOurTeam from './pages/JoinOurTeam';

function App() {

 

  useEffect(() => {
    

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out effect
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // optional cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="/Careers" element={<CareerPage />} />
          <Route path="/join-our-team" element={<JoinOurTeam />} />
          <Route path="/Partner" element={<PartnerPage />} />
          {/* <Route path="/Contact" element={<ContactPage />} /> */}
          <Route path="/Contact" element={<ContactUsPage />} />
        </Route>
      </Routes>

      {/* Optional: Toaster, Background, Header, etc., if you uncomment later */}
      {/* <NeuralNetworkBackground /> */}
      {/* <Header /> */}
      {/* <Footer /> */}
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
