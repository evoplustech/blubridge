import React from 'react'
import NeuralNetworkBackground from '@/components/NeuralBackground';
import Header from './components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';



const Dashboard = () => {
  return (
    <div>
      <NeuralNetworkBackground />
      <Header />
        <Outlet />
      <Footer/>
      <Toaster />

    </div>
  )
}

export default Dashboard