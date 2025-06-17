import React from 'react'
import NeuralNetworkBackground from '@/components/NeuralBackground';

import Header from './components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import CursorConnector from './components/CursorConnector';
import NetworkCanvas from './components/NetworkCanvas';
import NodeConnections from './components/NodeConnections';
import NodeConnections1 from './components/NodeConnection1';
import NodeConnections4 from './components/NodeConnections4';
import RadiantGridBackground from './components/RadiantGridBackground';



const Dashboard = () => {
  return (
    <div>
      {/* <NeuralNetworkBackground /> */}
      {/* <CursorConnector /> */}
      {/* <NetworkCanvas /> */}
      {/* <NodeConnections /> */}
      {/* <NodeConnections1 /> */}
      {/* <NodeConnections4 /> */}
      <RadiantGridBackground />
      <Header />
        <Outlet />
      <Footer/>
      <Toaster />

    </div>
  )
}

export default Dashboard