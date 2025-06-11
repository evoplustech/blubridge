import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '60%',
  height: '270px'
};

const center = {
  lat: 13.0280468,
  lng: 80.2655924
};

const GoogleMapEmbed = () => {
  return (<>
    <LoadScript googleMapsApiKey="AIzaSyBuEvucdozegqWJRHQss6yT-1P3R3bOnpo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  </>);
};

export default GoogleMapEmbed;
