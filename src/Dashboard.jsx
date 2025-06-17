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
import NodeConnection2 from './components/NodeConnection2';



const Dashboard = () => {
  return (
    <div>
      {/* <NeuralNetworkBackground /> */}
      {/* <CursorConnector /> */}
      {/* <NetworkCanvas /> */}
      {/* <NodeConnections /> */}
      <NodeConnections1 />
      {/* <NodeConnection2 /> */}
      <Header />
        <Outlet />
      <Footer/>
      <Toaster />

    </div>
  )
}

export default Dashboard