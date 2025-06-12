import React from 'react'
import NeuralNetworkBackground from '@/components/NeuralBackground';

import Header from './components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import CursorConnector from './components/CursorConnector';
import NetworkCanvas from './components/NetworkCanvas';



const Dashboard = () => {
  return (
    <div>
      {/* <NeuralNetworkBackground /> */}
      {/* <CursorConnector /> */}
      <NetworkCanvas />
      <Header />
        <Outlet />
      <Footer/>
      <Toaster />

    </div>
  )
}

export default Dashboard